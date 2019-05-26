/**
 * @file index.js
 */

//  Modules
import 'dotenv/config';
import { ApolloServer, gql } from 'apollo-server';
import {typeDefs} from './graphql/schema.js'
import {resolvers} from './graphql/resolvers';
import mongoose from "mongoose";

// A map of functions which return data for the schema.
const db = process.env.DB_URL;

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

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});

console.log(process.env.MY_SECRET);
