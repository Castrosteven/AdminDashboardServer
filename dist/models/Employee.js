"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSubscription = exports.EmployeeQuery = exports.EmployeeMutation = exports.CreateEmployeeInputType = exports.Employee = void 0;
const nexus_1 = require("nexus");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const Employee_1 = require("../controllers/Employee");
const context_1 = require("../context");
const controllers_1 = require("../controllers");
const pubsub = new graphql_subscriptions_1.PubSub();
exports.Employee = (0, nexus_1.objectType)({
    name: "Employee",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("email");
        t.nonNull.string("firstName");
        t.nonNull.string("lastName");
    },
});
exports.CreateEmployeeInputType = (0, nexus_1.inputObjectType)({
    name: "createEmployeeInput",
    definition(t) {
        t.nonNull.string("email");
        t.nonNull.string("firstName");
        t.nonNull.string("lastName");
    },
});
exports.EmployeeMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createEmployee", {
            type: "Employee",
            args: {
                data: (0, nexus_1.nonNull)("createEmployeeInput"),
            },
            resolve: async (_root, args, ctx) => {
                try {
                    const newEmployee = await (0, Employee_1.CreateEmployee)(ctx, args.data);
                    pubsub.publish("USER_CREATED", {});
                    return newEmployee;
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
exports.EmployeeQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("employees", {
            type: "Employee",
            resolve: async (root, args, ctx) => {
                try {
                    const user = await (0, controllers_1.currentLoggedInUser)(ctx);
                    if (user) {
                        const company = await ctx.db.company.findUnique({
                            where: {
                                userId: user.id,
                            },
                        });
                        return await ctx.db.employee.findMany({
                            where: {
                                companyId: company.id,
                            },
                        });
                    }
                    throw new Error("No User");
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
exports.EmployeeSubscription = (0, nexus_1.subscriptionType)({
    definition(t) {
        t.nonNull.list.field("employees", {
            type: "Employee",
            subscribe() {
                return pubsub.asyncIterator(["USER_CREATED"]);
            },
            resolve: async (root, args, ctx) => {
                try {
                    const user = ctx;
                    if (user) {
                        const company = await context_1.db.company.findUnique({
                            where: {
                                userId: user.id,
                            },
                        });
                        return await context_1.db.employee.findMany({
                            where: {
                                companyId: company.id,
                            },
                        });
                    }
                    throw new Error("No User");
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
//# sourceMappingURL=Employee.js.map