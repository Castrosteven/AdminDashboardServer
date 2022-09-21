import { objectType } from "nexus";

export const Project = objectType({
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
        } catch (error) {
          throw error;
        }
      },
    });
  },
});
