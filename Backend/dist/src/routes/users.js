"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const router = express_1.default.Router();
const userSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
    firstName: zod_1.z.string().nonempty({ message: "First name is required" }),
    lastName: zod_1.z.string().nonempty({ message: "Last name is required" })
});
const validateUser = (req, res, next) => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        const errorMessages = result.error.errors.map((error) => {
            var _a;
            return {
                field: (_a = error.path) === null || _a === void 0 ? void 0 : _a[0], // The field that caused the error
                message: error.message // The actual error message
            };
        });
        res.status(400).json({ message: errorMessages });
    }
    else {
        req.body = result.data;
        next();
    }
};
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield user_1.default.find({});
        res.status(200).json({ totalUsers });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.post('/register', validateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.default.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }
        else {
            const { email, password, firstName, lastName } = req.body;
            user = new user_1.default({ email, password, firstName, lastName });
            yield user.save();
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' }); //as string is used to tell the typescript that the value is a string.
            res.cookie('auth_Token', token, {
                httpOnly: true, //this means that the cookie cannot be accessed by the client side js code and can be accessed by only the server.
                secure: process.env.NODE_ENV === 'production', // this means the cookie will only be sent over https  
                maxAge: 86400000 //this is the time in milliseconds for which the cookie will be valid
            });
            res.status(200).json({ message: "User registered successfully" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
exports.default = router;
