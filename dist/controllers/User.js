"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.currentLoggedInUser = exports.updateUser = exports.signInUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Creates A New User Document in DB if email does not already exists
 * @param ctx
 * @param data
 * @returns Promise<User>
 */
const createUser = async (ctx, data) => {
    const findUser = await ctx.db.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!findUser) {
        const encryptedPassword = await bcrypt_1.default.hash(data.password, 10);
        return await ctx.db.user.create({
            data: {
                ...data,
                password: encryptedPassword,
            },
        });
    }
    throw new Error("User already Exists");
};
exports.createUser = createUser;
/**
 * Signs in a user and returns jwt
 * @param ctx
 * @param data
 * @returns Promise<AccessToken>
 */
const signInUser = async (ctx, data) => {
    const findUser = await ctx.db.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (findUser) {
        const match = await bcrypt_1.default.compare(data.password, findUser.password);
        const accessToken = jsonwebtoken_1.default.sign(JSON.stringify(findUser), "SECRET");
        if (match) {
            return {
                accessToken: accessToken,
            };
        }
        else {
            throw new Error("Wrong Credentials");
        }
    }
    throw new Error("User Not Found");
};
exports.signInUser = signInUser;
/**
 *Updates the current Authenticated User
 @param ctx
 @param data
 @returns Promise<User>
 */
const updateUser = async (ctx, data) => {
    const currentUser = await (0, exports.currentLoggedInUser)(ctx);
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
exports.updateUser = updateUser;
/**
 * Returns the current Logged in user
 * @param ctx
 * @returns Promise<User>
 */
const currentLoggedInUser = async (ctx) => {
    const accessToken = ctx.req.headers.authorization;
    if (accessToken) {
        const decryptedAccessToken = jsonwebtoken_1.default.verify(accessToken, "SECRET");
        if (decryptedAccessToken) {
            return await ctx.db.user.findUnique({
                where: {
                    id: decryptedAccessToken.id,
                },
            });
        }
        throw new Error("Invalid Token Provided");
    }
};
exports.currentLoggedInUser = currentLoggedInUser;
/**
 * Changes the current authenticated users password
 * @param ctx
 * @param data
 * @returns Promise<Boolean>
 */
const changePassword = async (ctx, data) => {
    const currentUser = await (0, exports.currentLoggedInUser)(ctx);
    if (currentUser) {
        const match = await bcrypt_1.default.compare(data.currentPassword, currentUser.password);
        if (match) {
            const encryptedPassword = await bcrypt_1.default.hash(data.newPassword, 10);
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
exports.changePassword = changePassword;
//# sourceMappingURL=User.js.map