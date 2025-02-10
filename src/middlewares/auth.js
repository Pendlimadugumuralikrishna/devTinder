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
        console.log(decoded);
        const { userId } = decoded;
        console.log("user id from the auth" + userId);

        req.userId = userId;
        console.log(req.userId);
        next();
    } catch (e) {
        res.status(401).send("Unauthorized");
    }
}
export default auth;