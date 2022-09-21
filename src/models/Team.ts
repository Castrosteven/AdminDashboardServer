import { objectType } from "nexus";

export const Team = objectType({
  name: "Team",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
  },
});
