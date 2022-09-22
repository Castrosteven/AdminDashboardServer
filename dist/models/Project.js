"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const nexus_1 = require("nexus");
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
//# sourceMappingURL=Project.js.map