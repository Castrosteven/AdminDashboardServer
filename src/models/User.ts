import { extendType, inputObjectType, nonNull, objectType } from "nexus";
import {
  changePassword,
  createUser,
  currentLoggedInUser,
  signInUser,
  updateUser,
} from "../controllers";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("email");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.nonNull.string("password");
  },
});
export const AccessToken = objectType({
  name: "accessToken",
  definition(t) {
    t.nonNull.string("accessToken");
  },
});
export const LoginUserInputType = inputObjectType({
  name: "loginUserInputType",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});
export const CreateUserInputType = inputObjectType({
  name: "createUserInputType",
  definition(t) {
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});
export const UpdateUserInputType = inputObjectType({
  name: "updateUserInputType",
  definition(t) {
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
  },
});
export const ChangePasswordInput = inputObjectType({
  name: "changePasswordInput",
  definition(t) {
    t.nonNull.string("currentPassword");
    t.nonNull.string("newPassword");
  },
});
export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nullable.field("me", {
      type: "User",
      resolve: async (_root, _args, ctx) => {
        try {
          return await currentLoggedInUser(ctx);
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        data: nonNull("createUserInputType"),
      },
      resolve: async (_root, args, context) => {
        try {
          return await createUser(context, args.data);
        } catch (error) {
          throw error;
        }
      },
    });
    t.nonNull.field("signInUser", {
      type: "accessToken",
      args: {
        data: nonNull("loginUserInputType"),
      },
      resolve: async (_root, args, context) => {
        try {
          return await signInUser(context, args.data);
        } catch (error) {
          throw error;
        }
      },
    });
    t.nonNull.field("updateUser", {
      type: "User",
      args: {
        data: nonNull("updateUserInputType"),
      },
      resolve: async (_root, args, ctx) => {
        try {
          return await updateUser(ctx, args.data);
        } catch (error) {
          throw error;
        }
      },
    });
    t.nonNull.field("changePassword", {
      type: "Boolean",
      args: {
        data: nonNull("changePasswordInput"),
      },
      resolve: async (_root, args, ctx) => {
        try {
          return await changePassword(ctx, args.data);
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
