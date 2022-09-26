"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSubscription = exports.pubsub = void 0;
const nexus_1 = require("nexus");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const context_1 = require("../context");
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.ProjectSubscription = (0, nexus_1.subscriptionType)({
    definition(t) {
        t.nonNull.list.field("projects", {
            type: "Project",
            subscribe() {
                return exports.pubsub.asyncIterator(["PROJECT_CREATED"]);
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
                        return await context_1.db.project.findMany({
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
        t.nonNull.list.field("employees", {
            type: "Employee",
            subscribe() {
                return exports.pubsub.asyncIterator(["USER_CREATED"]);
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
//# sourceMappingURL=Subscriptions.js.map