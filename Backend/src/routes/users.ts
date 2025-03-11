import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { error } from 'console';
const router = express.Router();
const userSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    firstName: z.string().nonempty({ message: "First name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" })
});

type userData = z.infer<typeof userSchema>;
const validateUser = (req: Request, res: Response, next: Function) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        const errorMessages = result.error.errors.map((error) => {
            return {
                field: error.path?.[0],  // The field that caused the error
                message: error.message   // The actual error message
            }
        });
        res.status(400).json({ message: errorMessages });
    }
    else {
        req.body = result.data as userData;
        next();
    }

}

router.get('/all', async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.find({});
        res.status(200).json({ totalUsers });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/register', validateUser, async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }
        else {
            const { email, password, firstName, lastName } = req.body as userData;
            user = new User({ email, password, firstName, lastName });
            await user.save();
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' })//as string is used to tell the typescript that the value is a string.

            res.cookie('auth_Token', token, {
                httpOnly: true, //this means that the cookie cannot be accessed by the client side js code and can be accessed by only the server.
                secure: process.env.NODE_ENV === 'production', // this means the cookie will only be sent over https  
                maxAge: 86400000 //this is the time in milliseconds for which the cookie will be valid
            })

            res.status(200).json({ message: "User registered successfully" });

        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

})


export default router;