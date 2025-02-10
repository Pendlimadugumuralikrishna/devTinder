import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }
    try {
        const decoded = jwt.verify(token, "secrer");
        const { userId } = decoded;
        req.userId = userId;
        next();
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
}