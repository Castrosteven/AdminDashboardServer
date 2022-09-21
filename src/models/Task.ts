import { objectType } from "nexus";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.string("description");
  },
});
