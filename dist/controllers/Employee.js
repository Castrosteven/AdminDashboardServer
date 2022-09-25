"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEmployee = exports.GetEmployee = exports.CreateEmployee = void 0;
const User_1 = require("./User");
const CreateEmployee = async (ctx, data) => {
    const user = await (0, User_1.currentLoggedInUser)(ctx);
    if (user) {
        const company = await ctx.db.company.findUnique({
            where: {
                userId: user.id,
            },
        });
        if (company) {
            return await ctx.db.employee.create({
                data: {
                    ...data,
                    companyId: company.id,
                },
            });
        }
        throw new Error("No Company");
    }
    throw new Error("No User");
};
exports.CreateEmployee = CreateEmployee;
const GetEmployee = async (ctx, data) => {
    const employee = await ctx.db.employee.findUnique({
        where: {
            id: data.id,
        },
    });
    if (employee) {
        return employee;
    }
    throw new Error("Employee Not Found");
};
exports.GetEmployee = GetEmployee;
const DeleteEmployee = async (ctx, data) => {
    return await ctx.db.employee.delete({
        where: {
            id: data.id,
        },
    });
};
exports.DeleteEmployee = DeleteEmployee;
//# sourceMappingURL=Employee.js.map