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
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(body_parser_1.default.json());
function rand() {
    return Math.random().toString(16).substr(2, 5);
}
app.post("/api/new/", express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body.url;
    const random = rand();
    console.log(url);
    try {
        fs_1.default.writeFile(`./links/${random}`, url, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
        });
    }
    catch (err) {
        return res.status(500).send(err);
    }
    return res.status(200).send(req.path + random);
}));
app.get("/api/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const url = fs_1.default.readFileSync(`./links/${id}`, "utf8");
        return res.redirect(301, url);
    }
    catch (e) {
        return res.status(404).send(e);
    }
}));
app.listen(port, () => { console.log(`Listening on port ${port}`); });
//# sourceMappingURL=index.js.map