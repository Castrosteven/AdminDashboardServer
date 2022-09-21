import { objectType } from "nexus";

export const Employee = objectType({
  name: "Employee",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("email");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
  },
});
