import express, { Request, Response } from 'express';
import { z } from 'zod';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';

interface CustomRequest extends Request {
    userId?: string;
}

const router = express.Router();

const loginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

const loginValidator = (req: Request, res: Response, next: Function) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        const errorMessages = result.error.errors.map((error) => {
            return {
                field: error.path?.[0],
                message: error.message
            }
        })
        res.status(400).json({ message: errorMessages });
    }
    else {
        req.body = result.data as loginType;
        next();
    }
}

type loginType = z.infer<typeof loginSchema>;

router.post('/login', loginValidator, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: "Invalid Credentials" });
            }
            else {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
                res.cookie('auth_Token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', //this means that the cookie will only be sent over https
                    maxAge: 86400000
                })
                res.status(200).json({
                    message: "User logged in successfully",
                    user: user._id,
                });
            }
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });

    }
})

router.get('/validate-token', verifyToken, (req: CustomRequest, res: Response) => {
    res.status(200).send({ userId: req?.userId });

})


router.post('/logout', (req: Request, res: Response) => { // this route is used to logout the user
    res.cookie('auth_Token', '', {
        expires: new Date(0), // this will expire the cookie immediately
    })
    res.status(200).json({ message: "User logged out successfully" });
})



export default router;
