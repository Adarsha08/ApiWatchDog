"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});
const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"API Watchdog" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map