import { Context } from "../context";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NexusGenInputs } from "../nexus-typegen";
import { User } from "@prisma/client";
/**
 * Creates A New User Document in DB if email does not already exists
 * @param ctx
 * @param data
 * @returns Promise<User>
 */
export const createUser = async (
  ctx: Context,
  data: NexusGenInputs["createUserInputType"]
) => {
  const findUser = await ctx.db.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!findUser) {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    return await ctx.db.user.create({
      data: {
        ...data,
        Company: {
          create: {
            name: "My Company",
            employees: {
              create: {
                email: "Johndoe@email.com",
                firstName: "John",
                lastName: "Doe",
              },
            },
            projects: {
              create: {
                name: "My First Project",
                tasks: {
                  create: {
                    name: "My First Task",
                    description: "Hello World Task",
                  },
                },
              },
            },
            teams: {
              create: {
                name: "The A Team",
              },
            },
          },
        },
        password: encryptedPassword,
      },
    });
  }
  throw new Error("User already Exists");
};

/**
 * Signs in a user and returns jwt
 * @param ctx
 * @param data
 * @returns Promise<AccessToken>
 */
export const signInUser = async (
  ctx: Context,
  data: NexusGenInputs["loginUserInputType"]
) => {
  const findUser = await ctx.db.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (findUser) {
    const match = await bcrypt.compare(data.password, findUser.password);
    const accessToken = jwt.sign(JSON.stringify(findUser), "SECRET");
    if (match) {
      return {
        accessToken: accessToken,
      };
    } else {
      throw new Error("Wrong Credentials");
    }
  }
  throw new Error("User Not Found");
};

/**
 *Updates the current Authenticated User
 @param ctx 
 @param data
 @returns Promise<User>
 */
export const updateUser = async (
  ctx: Context,
  data: NexusGenInputs["updateUserInputType"]
) => {
  const currentUser = await currentLoggedInUser(ctx);
  if (currentUser) {
    return await ctx.db.user.update({
      where: {
        id: currentUser.id,
      },
      data: data,
    });
  }
  throw new Error("No User Found");
};

/**
 * Returns the current Logged in user
 * @param ctx
 * @returns Promise<User>
 */
export const currentLoggedInUser = async (ctx: Context) => {
  const accessToken = ctx.req.headers.authorization;
  if (accessToken) {
    const decryptedAccessToken = jwt.verify(accessToken, "SECRET") as User;
    if (decryptedAccessToken) {
      return await ctx.db.user.findUnique({
        where: {
          id: decryptedAccessToken.id,
        },
      });
    }
    throw new Error("Invalid Token Provided");
  }
  throw new Error("No Token Provided");
};
/**
 * Changes the current authenticated users password
 * @param ctx
 * @param data
 * @returns Promise<Boolean>
 */
export const changePassword = async (
  ctx: Context,
  data: NexusGenInputs["changePasswordInput"]
) => {
  const currentUser = await currentLoggedInUser(ctx);
  if (currentUser) {
    const match = await bcrypt.compare(
      data.currentPassword,
      currentUser.password
    );
    if (match) {
      const encryptedPassword = await bcrypt.hash(data.newPassword, 10);
      await ctx.db.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          password: encryptedPassword,
        },
      });
      return true;
    }
    throw new Error("Wrong Password");
  }
  throw new Error("User Not Found");
};
