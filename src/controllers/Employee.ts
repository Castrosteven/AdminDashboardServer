import { Context } from "../context";
import { NexusGenInputs } from "../nexus-typegen";
import { currentLoggedInUser } from "./User";

export const CreateEmployee = async (
  ctx: Context,
  data: NexusGenInputs["createEmployeeInput"]
) => {
  const user = await currentLoggedInUser(ctx);
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

export const GetEmployee = async (
  ctx: Context,
  data: NexusGenInputs["getEmployeeInputType"]
) => {
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

export const DeleteEmployee = async (
  ctx: Context,
  data: NexusGenInputs["getEmployeeInputType"]
) => {
  return await ctx.db.employee.delete({
    where: {
      id: data.id,
    },
  });
};
