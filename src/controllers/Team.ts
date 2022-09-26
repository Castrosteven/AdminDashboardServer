import { Context } from "../context";
import { NexusGenInputs } from "../nexus-typegen";
import { currentLoggedInUser } from "./User";

export const CreateTeam = async (
  ctx: Context,
  data: NexusGenInputs["createTeamInput"]
) => {
  const user = await currentLoggedInUser(ctx);
  if (user) {
    const company = await ctx.db.company.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (company) {
      return await ctx.db.team.create({
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

export const GetTeam = async (
  ctx: Context,
  data: NexusGenInputs["getTeamInputType"]
) => {
  const employee = await ctx.db.team.findUnique({
    where: {
      id: data.id,
    },
  });
  if (employee) {
    return employee;
  }
  throw new Error("Employee Not Found");
};

export const DeleteTeam = async (
  ctx: Context,
  data: NexusGenInputs["getTeamInputType"]
) => {
  return await ctx.db.team.delete({
    where: {
      id: data.id,
    },
  });
};
