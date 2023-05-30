const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("Hello World!");
});


// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fe54zrb.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  try {
    const serviceCollection = client
      .db("railway_ticketing_collections")
      .collection("railway_ticketing_services");

      app.get("/services", async (req, res) => {
        const query = {};
        const cursor = serviceCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      });
  
      app.post("/services", async (req, res) => {
        console.log("post api called");
        const cmd = req.body;
        const result = await serviceCollection.insertOne(cmd);
        res.send(result);
      });
  } finally {
  }
}
run().catch((err) => console.error(err));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
