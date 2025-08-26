import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { resolvers } from "./resolvers/resolvers.js"
import { typeDefs } from "./typeDefs/typeDefs.js"

import connectionDB from "./db/connectio.db.js"
const server = new ApolloServer({
    typeDefs,
    resolvers
})

connectionDB().then(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    })
    console.log(`${url}`)
}).catch((error) => {
    console.log("Error while connect to database")
})


