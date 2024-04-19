"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `./src/config/config.env`,
});
const DB = process.env.DB || '';
console.log(DB);
mongoose_1.default.connect(DB).then(() => console.log('Database connection successfully!!'));
