import { extendType } from "nexus";
import { Context } from "../context";
import { NexusGenInputs } from "../nexus-typegen";
import { currentLoggedInUser } from "./User";

export const UpdateCompany = async (
  ctx: Context,
  data: NexusGenInputs["updateCompanyInputType"]
) => {
  const user = await currentLoggedInUser(ctx);
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

export const GetCompany = async (ctx: Context) => {
  const user = await currentLoggedInUser(ctx);
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
