"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMutation = exports.CreateProjectInputType = exports.ProjectQuery = exports.Project = void 0;
const nexus_1 = require("nexus");
const controllers_1 = require("../controllers");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const Projects_1 = require("../controllers/Projects");
const pubsub = new graphql_subscriptions_1.PubSub();
exports.Project = (0, nexus_1.objectType)({
    name: "Project",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("name");
        t.nonNull.list.field("tasks", {
            type: "Task",
            resolve: async (root, args, ctx) => {
                try {
                    return await ctx.db.task.findMany({
                        where: {
                            projectId: root.id,
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
exports.ProjectQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("projects", {
            type: "Project",
            resolve: async (root, args, ctx) => {
                try {
                    const user = await (0, controllers_1.currentLoggedInUser)(ctx);
                    if (user) {
                        const company = await ctx.db.company.findUnique({
                            where: {
                                userId: user.id,
                            },
                        });
                        return await ctx.db.project.findMany({
                            where: {
                                companyId: company.id,
                            },
                        });
                    }
                    throw new Error("NO User");
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
exports.CreateProjectInputType = (0, nexus_1.inputObjectType)({
    name: "createProjectInput",
    definition(t) {
        t.nonNull.string("name");
    },
});
exports.ProjectMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createProject", {
            type: "Project",
            args: {
                data: (0, nexus_1.nonNull)("createProjectInput"),
            },
            resolve: async (_root, args, ctx) => {
                try {
                    const newCompany = await (0, Projects_1.createCompany)(ctx, args.data);
                    pubsub.publish("PROJECT_CREATED", {});
                    return newCompany;
                }
                catch (error) {
                    throw error;
                }
            },
        });
    },
});
//# sourceMappingURL=Project.js.map