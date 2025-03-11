import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
    userId?: string;
} //this is used to add a new property to the Request object in typescript.

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {

    const token = req.cookies['auth_Token'];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            req.userId = (decoded as JwtPayload).userId;
            next();

        } catch (err) {
            res.status(401).json({ message: "Unauthorized" });
            return
        }
    }

}

export default verifyToken;