"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config"); //it is used to load the environment variables from the .env file into process.env
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log(err);
}); //as string is used to tell the typescript that the value is a string.
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../../Frontend/dist')));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // this is used to parse the incoming requests with urlencoded payloads.
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.listen(7000, () => {
    console.log("Server running on port 7000");
});
