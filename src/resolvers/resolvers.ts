import User from ".././models/user.model.js"
export const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find()
        }
    },

    Mutation: {
        addUser: async (_: any, { input }) => {
            const { email } = input

            const existUser = await User.findOne({ email })
            if (existUser) {
                throw new Error("User already exist")
            }
            try {
                const newUser = await User.create({
                    ...input,
                    UserName: input.name,
                    email: input.email,
                    password: input.password
                })
                console.log("New created user", newUser)
                return newUser
            } catch (error) {
                console.log("Error while creting the use", error.message)
                return new Error("Error while creating the use")
            }

        }
    }
}