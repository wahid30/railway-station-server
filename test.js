const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

// userName: dbUsers;
// pass: q13lCMP6JE63iEs3;

const uri =
  "mongodb+srv://dbUsers:q13lCMP6JE63iEs3@cluster0.cpadwda.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userComments = client.db("userComments").collection("comments");
    const VeterinaryServices = client
      .db("VeterinaryServices")
      .collection("Veterinary_Services");
    const VaccinationCareServices = client
      .db("VaccinationCareServices")
      .collection("VaccinationCare_Services");
    const NeuterServices = client
      .db("NeuterServices")
      .collection("Neuter_Services");
    const dayCareServices = client
      .db("dayCareServices")
      .collection("dayCare_Services");
    const animalAdoptions = client
      .db("animalAdoptions")
      .collection("adaptions");

    app.get("/comments", async (req, res) => {
      const query = {};
      const cursor = userComments.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/comments", async (req, res) => {
      console.log("post api called");
      const cmd = req.body;
      const result = await userComments.insertOne(cmd);
      res.send(result);
    });

    app.get("/VeterinarianServices", async (req, res) => {
      const query = {};
      const cursor = VeterinaryServices.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/VeterinarianServices", async (req, res) => {
      console.log("post api called");
      const cmd = req.body;
      const result = await VeterinaryServices.insertOne(cmd);
      res.send(result);
    });

    app.get("/VaccinationCareServices", async (req, res) => {
      const query = {};
      const cursor = VaccinationCareServices.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/VaccinationCareServices", async (req, res) => {
      console.log("post api called");
      const cmd = req.body;
      const result = await VaccinationCareServices.insertOne(cmd);
      res.send(result);
    });

    app.get("/NeuterServices", async (req, res) => {
      const query = {};
      const cursor = NeuterServices.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/NeuterServices", async (req, res) => {
      console.log("post api called");
      const cmd = req.body;
      const result = await NeuterServices.insertOne(cmd);
      res.send(result);
    });

    app.get("/dayCareServices", async (req, res) => {
      const query = {};
      const cursor = dayCareServices.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/dayCareServices", async (req, res) => {
      console.log("post api called");
      const cmd = req.body;
      const result = await dayCareServices.insertOne(cmd);
      res.send(result);
    });

    app.get("/animalAdoptions", async (req, res) => {
      const query = {};
      const cursor = animalAdoptions.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // app.delete("/comments/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await userComments.deleteOne(query);
    //   res.send(result);
    // });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app on port ${port}`);
});