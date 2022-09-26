import { extendType, inputObjectType, nonNull, objectType } from "nexus";
import {
  CreateTeam,
  currentLoggedInUser,
  DeleteTeam,
  GetTeam,
} from "../controllers";
import { pubsub } from "./Subscriptions";
export const Team = objectType({
  name: "Team",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
  },
});

export const CreateTeamInputType = inputObjectType({
  name: "createTeamInput",
  definition(t) {
    t.nonNull.string("name");
  },
});

export const TeamMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTeam", {
      type: "Team",
      args: {
        data: nonNull("createTeamInput"),
      },
      resolve: async (_root, args, ctx) => {
        try {
          const newTeam = await CreateTeam(ctx, args.data);
          pubsub.publish("TEAM_CREATED", {});
          return newTeam;
        } catch (error) {
          throw error;
        }
      },
    });
    t.nonNull.field("deleteTeam", {
      type: "Team",
      args: {
        data: nonNull("getTeamInputType"),
      },
      resolve: async (root, args, ctx) => {
        try {
          const user = await currentLoggedInUser(ctx);
          if (user) {
            const deleted = await DeleteTeam(ctx, args.data);
            pubsub.publish("TEAM_CREATED", {});
            return deleted;
          }
          throw new Error("No user");
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

export const GetTeamInputType = inputObjectType({
  name: "getTeamInputType",
  definition(t) {
    t.nonNull.string("id");
  },
});

export const TeamQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("teams", {
      type: "Team",
      resolve: async (root, args, ctx) => {
        try {
          const user = await currentLoggedInUser(ctx);
          if (user) {
            const company = await ctx.db.company.findUnique({
              where: {
                userId: user.id,
              },
            });
            return await ctx.db.team.findMany({
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
    t.nonNull.field("team", {
      type: "Team",
      args: {
        data: nonNull("getTeamInputType"),
      },
      resolve: async (root, args, ctx) => {
        try {
          return await GetTeam(ctx, args.data);
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
