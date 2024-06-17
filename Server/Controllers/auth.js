"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogout = exports.ProcessLogin = exports.ProcessRegistration = void 0;
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../Models/user"));
function ProcessRegistration(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            console.error("All fields are required");
            return res.status(400).json({ success: false, msg: "Error: User not registered. All fields are required" });
        }
        if (err) {
            console.error("Error while inserting user");
            if (err.name == "UserExistsError") {
                console.error("Error: User already exists");
            }
            return res.status(400).json({ success: false, msg: "Error: User not registered.", data: null });
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.json({ success: true, msg: "User Authenticated Successfully", data: newUser });
        });
    });
}
exports.ProcessRegistration = ProcessRegistration;
function ProcessLogin(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ success: false, msg: "Error: Server Error", data: null });
        }
        if (!user) {
            console.error("Login error: User Credential Error or User not found");
            return res.status(400).json({ success: false, msg: "Error: Login Error", data: null });
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ success: false, msg: "Error: Database Error", data: null });
            }
            return res.status(200).json({ success: true, msg: "User Logged in Successfully", data: user });
        });
    })(req, res, next);
}
exports.ProcessLogin = ProcessLogin;
function ProcessLogout(req, res, next) {
    req.logOut(() => {
        console.log("User logged out successfully");
        return res.json({ success: true, msg: "User Logged out Successfully", data: null });
    });
}
exports.ProcessLogout = ProcessLogout;
//# sourceMappingURL=auth.js.map