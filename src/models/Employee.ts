import { extendType, inputObjectType, nonNull, objectType } from "nexus";

import {
  CreateEmployee,
  DeleteEmployee,
  GetEmployee,
} from "../controllers/Employee";
import { currentLoggedInUser } from "../controllers";
import { pubsub } from "./Subscriptions";

export const Employee = objectType({
  name: "Employee",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("email");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
  },
});

export const CreateEmployeeInputType = inputObjectType({
  name: "createEmployeeInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
  },
});

export const EmployeeMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createEmployee", {
      type: "Employee",
      args: {
        data: nonNull("createEmployeeInput"),
      },
      resolve: async (_root, args, ctx) => {
        try {
          const newEmployee = await CreateEmployee(ctx, args.data);
          pubsub.publish("USER_CREATED", {});
          return newEmployee;
        } catch (error) {
          throw error;
        }
      },
    });
    t.nonNull.field("deleteEmployee", {
      type: "Employee",
      args: {
        data: nonNull("getEmployeeInputType"),
      },
      resolve: async (root, args, ctx) => {
        try {
          const user = await currentLoggedInUser(ctx);
          if (user) {
            const deleted = await DeleteEmployee(ctx, args.data);
            pubsub.publish("USER_CREATED", {});
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

export const GetEmployeeInputType = inputObjectType({
  name: "getEmployeeInputType",
  definition(t) {
    t.nonNull.string("id");
  },
});

export const EmployeeQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("employees", {
      type: "Employee",
      resolve: async (root, args, ctx) => {
        try {
          const user = await currentLoggedInUser(ctx);
          if (user) {
            const company = await ctx.db.company.findUnique({
              where: {
                userId: user.id,
              },
            });
            return await ctx.db.employee.findMany({
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
    t.nonNull.field("employee", {
      type: "Employee",
      args: {
        data: nonNull("getEmployeeInputType"),
      },
      resolve: async (root, args, ctx) => {
        try {
          return await GetEmployee(ctx, args.data);
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
