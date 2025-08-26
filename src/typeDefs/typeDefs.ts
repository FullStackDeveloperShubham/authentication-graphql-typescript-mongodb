import { gql } from "graphql-tag"

export const typeDefs = gql`
  type User {
     id:ID!
     UserName:String!
     email:String!
     password:String!
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
    addUser(input:UserInput) : User!
  }
`