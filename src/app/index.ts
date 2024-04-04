import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import { Tweet } from './tweet';
import cors from 'cors'

import { User } from './user'
import { GraphqlContext } from '../interfaces';
import JWTService from '../services/jwt';
export async function initServer() {
   const app = express();
   app.use(bodyParser.json())
   app.use(cors())

   app.get('/',(req,res)=>{
      res.status(200).json({message:"Everything is good!"});
   })

   const graphqlserver = new ApolloServer<GraphqlContext>({
      typeDefs: `
  ${User.types}
  ${Tweet.types}
  type Query{
     ${User.queries}
     ${Tweet.queries}
  }
  type Mutation{
   ${Tweet.mutations}
   ${User.mutations}
  }
  `,
      resolvers: {
         Query: {
            ...User.resolvers.queries,
            ...Tweet.resolvers.queries
         },
         Mutation: {
            ...Tweet.resolvers.mutations,
            ...User.resolvers.mutations
         },
         ...Tweet.resolvers.extraResolvers,
         ...User.resolvers.extraResolvers
      },

   });

   await graphqlserver.start();
   app.use("/graphql", expressMiddleware(graphqlserver, {
      context: async ({ req, res }) => {
         return {
            user: req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split('Bearer ')[1]) : undefined
         }
      }
   }))
   return app;
}
