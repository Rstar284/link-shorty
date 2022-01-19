import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

function rand() {
  return Math.random().toString(16).substr(2, 5);
}

app.post("/api/new/", express.json(), async (req: express.Request, res: express.Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const url: string = req.body.url;
  const random = rand();
  console.log(url)
  try {
    fs.writeFile(`./links/${random}`, url, (err: Error) => {
      if (err) {
        return res.status(500).send(err);
      }
    })
  } catch (err) {
    return res.status(500).send(err);
  }
  return res.status(200).send(`https://${req.hostname}:${port}/api/${random}`);
})

app.get("/api/:id", async (req: express.Request, res: express.Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id: string = req.params.id;
  try {
    const url = fs.readFileSync(`./links/${id}`, "utf8");
    return res.redirect(301, url);
  } catch (e) {
    return res.status(404).send(e);
  }
})

app.listen(port, () => { console.log(`Listening on port ${port}`) });