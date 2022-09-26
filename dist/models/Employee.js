"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeQuery = exports.GetEmployeeInputType = exports.EmployeeMutation = exports.CreateEmployeeInputType = exports.Employee = void 0;
const nexus_1 = require("nexus");
const Employee_1 = require("../controllers/Employee");
const controllers_1 = require("../controllers");
const Subscriptions_1 = require("./Subscriptions");
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
                    Subscriptions_1.pubsub.publish("USER_CREATED", {});
                    return newEmployee;
                }
                catch (error) {
                    throw error;
                }
            },
        });
        t.nonNull.field("deleteEmployee", {
            type: "Employee",
            args: {
                data: (0, nexus_1.nonNull)("getEmployeeInputType"),
            },
            resolve: async (root, args, ctx) => {
                try {
                    const user = await (0, controllers_1.currentLoggedInUser)(ctx);
                    if (user) {
                        console.log("ran");
                        const deleted = await (0, Employee_1.DeleteEmployee)(ctx, args.data);
                        Subscriptions_1.pubsub.publish("USER_CREATED", {});
                        return deleted;
                    }
                    throw new Error("No user");
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
exports.GetEmployeeInputType = (0, nexus_1.inputObjectType)({
    name: "getEmployeeInputType",
    definition(t) {
        t.nonNull.string("id");
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
        t.nonNull.field("employee", {
            type: "Employee",
            args: {
                data: (0, nexus_1.nonNull)("getEmployeeInputType"),
            },
            resolve: async (root, args, ctx) => {
                try {
                    return await (0, Employee_1.GetEmployee)(ctx, args.data);
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
//# sourceMappingURL=Employee.js.map