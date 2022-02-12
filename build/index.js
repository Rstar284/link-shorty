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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_service_1 = require("./services/database.service");
const crypto_1 = require("crypto");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/", express_1.default.static("public"));
function rand() {
    return (0, crypto_1.randomBytes)(2).toString("hex");
}
app.post("/api/new/", express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        const url = req.body.url;
        const random = rand();
        const result = yield database_service_1.collections.links.insertOne({ url, id: random });
        result
            ? res.send(`https://link.what-is.ml/${random}`)
            : res.sendStatus(500);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}));
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    res.setHeader("Access-Control-Allow-Origin", "*");
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const url = (_b = (yield database_service_1.collections.links.findOne({ id: id }))) === null || _b === void 0 ? void 0 : _b.url;
        return res.redirect(301, url);
    }
    catch (e) {
        return res.status(404).send(e);
    }
}));
(0, database_service_1.connect)().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}).catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map