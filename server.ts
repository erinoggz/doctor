import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './app/config/config';
import typeDefs from './app/graphql/queries';
import resolvers from './app/graphql/resolvers';
import './app/utils/jobs';

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const httpServer = http.createServer(app);

export const createApolloServer = async (
  listenOptions = { port: config.web.port }
) => {
  const server = new ApolloServer({
    schema,
    introspection: config.web.environment !== 'production',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options

    expressMiddleware(server)
  );
  app.use(express.json());

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: listenOptions.port }, resolve)
  );

  console.log(`🚀 Server ready at port: ${listenOptions.port}`);
};
createApolloServer();

mongoose.set('strictQuery', false);
mongoose
  .connect(config.mongo.uri)
  .then(() => console.log('Database Connected'))
  .catch((err) => {
    console.error(err);
  });

mongoose.connection.on('error', (err) => {
  console.error(`DB connection error: ${err.message}`);
});
