"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const nexus_1 = require("nexus");
exports.Task = (0, nexus_1.objectType)({
    name: "Task",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("name");
        t.nonNull.string("description");
    },
});
//# sourceMappingURL=Task.js.map