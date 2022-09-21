"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMutation = exports.ChangePasswordInput = exports.UpdateUserInputType = exports.CreateUserInputType = exports.LoginUserInputType = exports.AccessToken = exports.User = void 0;
const nexus_1 = require("nexus");
const controllers_1 = require("../controllers");
exports.User = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("email");
        t.nonNull.string("firstName");
        t.nonNull.string("lastName");
        t.nonNull.string("password");
    },
});
exports.AccessToken = (0, nexus_1.objectType)({
    name: "accessToken",
    definition(t) {
        t.nonNull.string("accessToken");
    },
});
exports.LoginUserInputType = (0, nexus_1.inputObjectType)({
    name: "loginUserInputType",
    definition(t) {
        t.nonNull.string("email");
        t.nonNull.string("password");
    },
});
exports.CreateUserInputType = (0, nexus_1.inputObjectType)({
    name: "createUserInputType",
    definition(t) {
        t.nonNull.string("firstName");
        t.nonNull.string("lastName");
        t.nonNull.string("email");
        t.nonNull.string("password");
    },
});
exports.UpdateUserInputType = (0, nexus_1.inputObjectType)({
    name: "updateUserInputType",
    definition(t) {
        t.nonNull.string("firstName");
        t.nonNull.string("lastName");
    },
});
exports.ChangePasswordInput = (0, nexus_1.inputObjectType)({
    name: "changePasswordInput",
    definition(t) {
        t.nonNull.string("currentPassword");
        t.nonNull.string("newPassword");
    },
});
exports.UserMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createUser", {
            type: "User",
            args: {
                data: (0, nexus_1.nonNull)("createUserInputType"),
            },
            resolve: async (_root, args, context) => {
                try {
                    return await (0, controllers_1.createUser)(context, args.data);
                }
                catch (error) {
                    throw error;
                }
            },
        });
        t.nonNull.field("signInUser", {
            type: "accessToken",
            args: {
                data: (0, nexus_1.nonNull)("loginUserInputType"),
            },
            resolve: async (_root, args, context) => {
                try {
                    return await (0, controllers_1.signInUser)(context, args.data);
                }
                catch (error) {
                    throw error;
                }
            },
        });
        t.nonNull.field("updateUser", {
            type: "User",
            args: {
                data: (0, nexus_1.nonNull)("updateUserInputType"),
            },
            resolve: async (_root, args, ctx) => {
                try {
                    return await (0, controllers_1.updateUser)(ctx, args.data);
                }
                catch (error) {
                    throw error;
                }
            },
        });
        t.nonNull.field("changePassword", {
            type: "Boolean",
            args: {
                data: (0, nexus_1.nonNull)("changePasswordInput"),
            },
            resolve: async (_root, args, ctx) => {
                try {
                    return await (0, controllers_1.changePassword)(ctx, args.data);
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
//# sourceMappingURL=User.js.map