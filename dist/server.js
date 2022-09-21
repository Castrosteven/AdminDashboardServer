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
const port = 5000;
const app = (0, express_1.default)();
const startServer = async () => {
    try {
        const server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.schema,
            context: ({ req }) => {
                return {
                    req,
                    db: context_1.db,
                };
            },
        });
        await server.start();
        server.applyMiddleware({ app });
        app.listen(port, () => {
            console.log(`The server is running on http://localhost:${port}/graphql`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.startServer = startServer;
//# sourceMappingURL=server.js.map