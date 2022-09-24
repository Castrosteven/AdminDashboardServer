import { stringArg, subscriptionType } from "nexus";
import { PubSub } from "graphql-subscriptions";
import { User } from "@prisma/client";
import { db } from "../context";
export const pubsub = new PubSub();

export const ProjectSubscription = subscriptionType({
  definition(t) {
    t.nonNull.list.field("projects", {
      type: "Project",
      subscribe() {
        return pubsub.asyncIterator(["PROJECT_CREATED"]);
      },
      resolve: async (root, args, ctx) => {
        try {
          const user = ctx as unknown as User;
          if (user) {
            const company = await db.company.findUnique({
              where: {
                userId: user.id,
              },
            });
            return await db.project.findMany({
              where: {
                companyId: company!.id,
              },
            });
          }
          throw new Error("No User");
        } catch (error) {
          throw error;
        }
      },
    });
    t.nonNull.list.field("employees", {
      type: "Employee",
      subscribe() {
        return pubsub.asyncIterator(["USER_CREATED"]);
      },
      resolve: async (root, args, ctx) => {
        try {
          const user = ctx as unknown as User;
          if (user) {
            const company = await db.company.findUnique({
              where: {
                userId: user.id,
              },
            });
            return await db.employee.findMany({
              where: {
                companyId: company!.id,
              },
            });
          }
          throw new Error("No User");
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
