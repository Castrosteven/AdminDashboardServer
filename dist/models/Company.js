"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyQueries = exports.CompanyMutation = exports.UpdateCompanyInput = exports.Company = void 0;
const nexus_1 = require("nexus");
const controllers_1 = require("../controllers");
exports.Company = (0, nexus_1.objectType)({
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
                }
                catch (error) {
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
                }
                catch (error) {
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
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
exports.UpdateCompanyInput = (0, nexus_1.inputObjectType)({
    name: "updateCompanyInputType",
    definition(t) {
        t.nonNull.string("name");
    },
});
exports.CompanyMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("updateCompany", {
            type: "Company",
            args: {
                data: (0, nexus_1.nonNull)("updateCompanyInputType"),
            },
            resolve: async (_root, args, ctx) => {
                try {
                    return await (0, controllers_1.UpdateCompany)(ctx, args.data);
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
exports.CompanyQueries = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.field("myCompany", {
            type: "Company",
            resolve: async (_root, _args, ctx) => {
                try {
                    return await (0, controllers_1.GetCompany)(ctx);
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
//# sourceMappingURL=Company.js.map