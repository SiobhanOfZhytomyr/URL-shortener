const express = require("express");
const pool = require("./db");
const cors = require("cors");
const shortid = require("shortid");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/urls", async (req, res) => {
  try {
    const q = await pool.query("SELECT * FROM shortenedurls");

    res.json(q.rows);
    console.log("handeled a request");
  } catch (e) {
    console.log(e);
  }
});

app.post("/new/url", async (req, res) => {
  try {
    const { url } = req.body;
    const shortened = shortid.generate();

    const newUrl = await pool.query(
      "INSERT INTO shortenedurls (original_url, shortened_url) VALUES ($1, $2) RETURNING *;",
      [url, shortened]
    );
    res.status(201).json({
      status: "success",
      data: {
        url: newUrl.rows[0],
      },
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.get("/:shortened", async (req, res) => {
  try {
    const fullUrl = await pool.query(
      "SELECT original_url, id FROM shortenedurls WHERE shortened_url=$1;",
      [req.params.shortened]
    );
    const update = await pool.query(
      "UPDATE shortenedurls SET times_used = times_used+1 WHERE id=$1 ",
      [fullUrl.rows[0].id]
    );
    res.redirect(fullUrl.rows[0].original_url);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
});
app.listen(5000, () => {
  console.log("server is running on 5000");
});
