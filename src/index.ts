import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import { ObjectId } from "mongodb";
import { collections, connect } from "./services/database.service";
import Links from "./models/links";
import { randomBytes } from "crypto";
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

function rand() {
  return randomBytes(2).toString("hex");
}

app.post(
  "/api/new/",
  express.json(),
  async (req: express.Request, res: express.Response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const url = req.body.url;
      const random = rand();
      const result = await collections.links.insertOne({ url, id: random });
      result ? res.send(`localhost:3000/${random}`) : res.sendStatus(500);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
);

app.get("/:id", async (req: express.Request, res: express.Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id: string = req?.params?.id;
  try {
    const url = (await collections.links.findOne({ id: id }))
      ?.url;
    return res.redirect(301, url);
  } catch (e) {
    return res.status(404).send(e);
  }
});

connect().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}).catch((error: Error) => {
  console.error("Database connection failed", error);
  process.exit();
});
