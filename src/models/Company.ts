import { extendType, inputObjectType, nonNull, objectType } from "nexus";
import { GetCompany, UpdateCompany } from "../controllers";

export const Company = objectType({
  name: "Company",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.list.field("projects", {
      type: "Project",
      resolve: async (root, _args, ctx) => {
        try {
          return await ctx.db.project.findMany({
            where: {
              companyId: root.id,
            },
          });
        } catch (error) {
          throw error;
        }
      },
    });
    t.nonNull.list.field("employees", {
      type: "Employee",
      resolve: async (root, _args, ctx) => {
        try {
          return await ctx.db.employee.findMany({
            where: {
              companyId: root.id,
            },
          });
        } catch (error) {
          throw error;
        }
      },
    });
    t.nonNull.list.field("teams", {
      type: "Team",
      resolve: async (root, _args, ctx) => {
        try {
          return await ctx.db.team.findMany({
            where: {
              companyId: root.id,
            },
          });
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

export const UpdateCompanyInput = inputObjectType({
  name: "updateCompanyInputType",
  definition(t) {
    t.nonNull.string("name");
  },
});
export const CompanyMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateCompany", {
      type: "Company",
      args: {
        data: nonNull("updateCompanyInputType"),
      },
      resolve: async (_root, args, ctx) => {
        try {
          return await UpdateCompany(ctx, args.data);
        } catch (error) {
          throw error;
        }
      },
    });
  },
});

export const CompanyQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("myCompany", {
      type: "Company",
      resolve: async (_root, _args, ctx) => {
        try {
          return await GetCompany(ctx);
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
