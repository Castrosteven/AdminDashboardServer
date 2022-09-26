import { extendType, inputObjectType, nonNull, objectType } from "nexus";
import { currentLoggedInUser } from "../controllers";
import { createProject } from "../controllers/Projects";
import { pubsub } from "./Subscriptions";
import { db } from "../context";
export const Project = objectType({
  name: "Project",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.list.field("tasks", {
      type: "Task",
      resolve: async (root, args, ctx) => {
        try {
          return await db.task.findMany({
            where: {
              projectId: root.id,
            },
          });
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

export const ProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("projects", {
      type: "Project",
      resolve: async (root, args, ctx) => {
        try {
          const user = await currentLoggedInUser(ctx);
          if (user) {
            const company = await ctx.db.company.findUnique({
              where: {
                userId: user.id,
              },
            });
            return await ctx.db.project.findMany({
              where: {
                companyId: company!.id,
              },
            });
          }
          throw new Error("NO User");
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

export const CreateProjectInputType = inputObjectType({
  name: "createProjectInput",
  definition(t) {
    t.nonNull.string("name");
  },
});

export const ProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createProject", {
      type: "Project",
      args: {
        data: nonNull("createProjectInput"),
      },
      resolve: async (_root, args, ctx) => {
        try {
          const newCompany = await createProject(ctx, args.data);
          pubsub.publish("PROJECT_CREATED", {});
          return newCompany;
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
