import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

function rand() {
  return Math.random().toString(16).substr(2, 5);
}

app.post("/api/new/", express.json(), async (req: express.Request, res: express.Response) => {
  const url: string = req.body.url;
  const random = rand();
  console.log(url)
  try {
    fs.writeFile(`./links/${random}`, url, (err) => {
      if (err) {
        console.log(err);
      }
    })
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(200).send(req.path + random);
})

app.get("/api/:id", async (req: express.Request, res: express.Response) => {
  const id: string = req.params.id;
  try {
    const url = fs.readFileSync(`./links/${id}`, "utf8");
    return res.redirect(url);
  } catch (e) {
    return res.status(404).send(e);
  }
})

app.listen(port, () => { console.log(`Listening on port ${port}`) });