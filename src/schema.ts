import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./models";
export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), "./src", "nexus-typegen.ts"),
    schema: join(process.cwd(), "./src", "schema.graphql"),
  },
  contextType: {
    module: join(process.cwd(), "./src/context.ts"),
    export: "Context",
  },
});
