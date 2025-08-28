import jwt from "jsonwebtoken"

interface JwtPayload {
    userId: string
}

export const authMiddleware = ({ req }: any) => {
    const authHeader = req.headers?.authorization || ""
    const token = authHeader.replace("Bearer ", "")

    if (!token) {
        return { user: null }
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        return { user: { id: decoded.userId } };
    } catch (err) {
        console.error("Invalid token:", err);
        return { user: null };
    }
}