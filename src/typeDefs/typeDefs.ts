import { gql } from "graphql-tag"

export const typeDefs = gql`
  type User {
     id:ID!
     UserName:String!
     email:String!
  }

  type AuthPayload {
    token:String!
    user:User!
  }

   input UserInput {
    name:String!
    email:String!
    password:String!
   }

  type Query {
    getAllUsers:[User!]!
  }

  type Mutation {
    # Add User 
    addUser(input:UserInput) : AuthPayload!
    logInUser(email:String! , password:String!):AuthPayload!
  }
`