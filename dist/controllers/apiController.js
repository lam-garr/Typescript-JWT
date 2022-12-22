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
exports.GET_user = exports.POST_log_in = exports.POST_sign_up = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function POST_sign_up(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const user = new user_1.default({
            username: req.body.username,
            password: hashedPassword
        }).save(err => {
            if (err) {
                return next(err);
            }
            else {
                res.json({ message: "succesully signed up" });
            }
        });
    });
}
exports.POST_sign_up = POST_sign_up;
function POST_log_in(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ username: req.body.username });
        if (user && (yield bcrypt_1.default.compare(req.body.password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ user }, "secret", { expiresIn: "15m" });
            res.json({ accessToken: token });
        }
        else {
            res.status(400).json({ message: "Error loggin in" });
        }
    });
}
exports.POST_log_in = POST_log_in;
function GET_user(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, 'secret', (err, user) => {
            if (err) {
                return res.status(403).json({ message: err });
            }
            res.json(user);
        });
    }
}
exports.GET_user = GET_user;
