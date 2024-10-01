import jwt from "jsonwebtoken";

export async function getAuthToken(req, res, next) {
    const { token } = req.body;

    if(!token){
        return res.json({
            success: false,
            message: "Access Denied. Login in to use this feature."
        });
    }
    jwt.verify(token, process.env.JWT_SECRET,(err, user) => {
        if (err) {
            return res.json({
                success: false,
                 message: 'Invalid token.'
            });
        }
        req.user = user;
        next();
    });
}