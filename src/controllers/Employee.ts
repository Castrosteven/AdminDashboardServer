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
