"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const nexus_1 = require("nexus");
exports.Team = (0, nexus_1.objectType)({
    name: "Team",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("name");
    },
});
//# sourceMappingURL=Team.js.map