/**
 * @file index.js
 */

//  Modules
import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/schema.js'
import { resolvers } from './graphql/resolvers';
import mongoose from "mongoose";

// A map of functions which return data for the schema.
const {NODE_ENV, DB_URL, DB_TEST_URL} = process.env

const db = NODE_ENV === 'test' ? DB_TEST_URL : DB_URL;

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

export const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});