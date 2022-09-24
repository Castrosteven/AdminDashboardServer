import { Context } from "../context";
import { NexusGenInputs } from "../nexus-typegen";
import { currentLoggedInUser } from "./User";

export const createCompany = async (
  ctx: Context,
  data: NexusGenInputs["createProjectInput"]
) => {
  const user = await currentLoggedInUser(ctx);
  if (user) {
    const company = await ctx.db.company.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (company) {
      return await ctx.db.project.create({
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
