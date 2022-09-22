"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompany = exports.UpdateCompany = void 0;
const User_1 = require("./User");
const UpdateCompany = async (ctx, data) => {
    const user = await (0, User_1.currentLoggedInUser)(ctx);
    if (user) {
        return await ctx.db.company.update({
            where: {
                id: user.id,
            },
            data: {
                name: data.name,
            },
        });
    }
    throw new Error("No User");
};
exports.UpdateCompany = UpdateCompany;
const GetCompany = async (ctx) => {
    const user = await (0, User_1.currentLoggedInUser)(ctx);
    if (user) {
        const company = await ctx.db.company.findUnique({
            where: {
                userId: user.id,
            },
        });
        if (company) {
            return company;
        }
        throw new Error("No Company Found");
    }
    throw new Error("No User");
};
exports.GetCompany = GetCompany;
//# sourceMappingURL=Company.js.map