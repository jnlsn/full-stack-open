const persons = require("./persons");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <body>
                <p>Phonebook has info for ${persons.length} people.</p>
                <p>${new Date().toLocaleString()}</p>
            </body>
        </html>
    `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    return res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const i = persons.findIndex((p) => p.id === req.params.id);
  if (i >= 0) {
    persons.splice(i, 1);
    res.status(200).end();
  } else {
    res.status(204).end();
  }
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  if (persons.some((p) => p.name === name)) {
    return res.status(400).json({ error: "This person already exists" });
  }

  const id =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) + 1 : 0;

  const person = { id, name, number };

  persons.push(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
