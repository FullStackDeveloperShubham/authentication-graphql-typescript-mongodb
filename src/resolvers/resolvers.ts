import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from ".././models/user.model.js"
export const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find()
        }
    },

    Mutation: {
        // ! Register the user 
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

                // NOTE : check the SECRETE AND EXPIERY present
                const JWT_SECRET = process.env.JWT_SECRET;
                const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";

                if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

                // !Generate JWT
                const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRES as jwt.SignOptions['expiresIn'],
                });
                return {
                    token,
                    user: {
                        id: newUser._id.toString(),
                        UserName: newUser.UserName,
                        email: newUser.email,
                    }
                }
            } catch (error) {
                console.log("Error while creting the use", error.message)
                return new Error("Error while creating the use")
            }

        },

        // ! LogIn the use 
        logInUser: async (_: any, { email, password, token }) => {
            const JWT_SECRET = process.env.JWT_SECRET;
            const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";
            if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

            if (token) {
                try {
                    const decoded = jwt.verify(token, JWT_SECRET);
                    console.log("✅ Existing token verified:", decoded);

                    const existUser = await User.findById((decoded as any).userId);
                    if (!existUser) throw new Error("User not found for this token");

                    return {
                        message: "Token is already valid ✅",
                        token,
                        user: {
                            id: existUser._id,
                            email: existUser.email,
                            UserName: existUser.UserName,
                        },
                    };
                } catch (err) {
                    console.error("❌ Invalid token:", err.message);
                }
            }

            const existUser = await User.findOne({ email });
            if (!existUser) {
                throw new Error("Sorry user not found");
            }

            const isValidPassword = await bcrypt.compare(password, existUser.password);
            if (!isValidPassword) {
                throw new Error("Password validation failed");
            }

            const newToken = jwt.sign({ userId: existUser._id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES as jwt.SignOptions["expiresIn"],
            });

            return {
                message: "Login successful. New token generated ✅",
                token: newToken,
                user: {
                    id: existUser._id,
                    email: existUser.email,
                    UserName: existUser.UserName,
                },
            };
        }
    }
}
