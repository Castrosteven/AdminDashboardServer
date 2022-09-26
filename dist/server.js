"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema");
const context_1 = require("./context");
const http_1 = require("http");
const apollo_server_core_1 = require("apollo-server-core");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const port = 5000;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const getUserFromWsContext = async (ctx, msg) => {
    if (ctx.connectionParams && ctx.connectionParams.Authorization) {
        const accessToken = ctx.connectionParams.Authorization;
        const userObj = jsonwebtoken_1.default.verify(accessToken, "SECRET");
        const user = await context_1.db.user.findUnique({
            where: {
                id: userObj.id,
            },
        });
        return user;
    }
    return null;
};
const startServer = async () => {
    try {
        const wsServer = new ws_1.WebSocketServer({
            server: httpServer,
            path: "/graphql",
        });
        const serverCleanup = (0, ws_2.useServer)({
            schema: schema_1.schema,
            context: (ctx, msg) => {
                return getUserFromWsContext(ctx, msg);
            },
        }, wsServer);
        const server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.schema,
            context: ({ req }) => {
                return {
                    req,
                    db: context_1.db,
                };
            },
            csrfPrevention: true,
            cache: "bounded",
            plugins: [
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                await serverCleanup.dispose();
                            },
                        };
                    },
                },
                (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            ],
        });
        await server.start();
        server.applyMiddleware({ app });
        httpServer.listen(port, () => {
            console.log(`The server is running on http://localhost:${port}${server.graphqlPath}`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.startServer = startServer;
//# sourceMappingURL=server.js.map