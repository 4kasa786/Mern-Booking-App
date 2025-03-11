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
const zod_1 = require("zod");
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Email is required" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
});
const loginValidator = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        const errorMessages = result.error.errors.map((error) => {
            var _a;
            return {
                field: (_a = error.path) === null || _a === void 0 ? void 0 : _a[0],
                message: error.message
            };
        });
        res.status(400).json({ message: errorMessages });
    }
    else {
        req.body = result.data;
        next();
    }
};
router.post('/login', loginValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid Credentials" });
        }
        else {
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: "Invalid Credentials" });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                res.cookie('auth_Token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', //this means that the cookie will only be sent over https
                    maxAge: 86400000
                });
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
}));
router.get('/validate-token', auth_1.default, (req, res) => {
    res.status(200).send({ userId: req === null || req === void 0 ? void 0 : req.userId });
});
router.post('/logout', (req, res) => {
    res.cookie('auth_Token', '', {
        expires: new Date(0), // this will expire the cookie immediately
    });
    res.status(200).json({ message: "User logged out successfully" });
});
exports.default = router;
