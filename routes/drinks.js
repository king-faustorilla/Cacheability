const express = require("express");
const router = express.Router();
const client = require("../redis");

router.post("/", async (req, res) => {
  const { id, name, ingredients, description } = req.body;

  const drink = { id, name, ingredients, description };

  await client.set(`drink:${id}`, JSON.stringify(drink));

  res.status(201).json({
    message: "Drink created",
    drink
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await client.get(`drink:${id}`);

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(JSON.parse(data));
});
  

router.get("/", async (req, res) => {
  const keys = await client.keys("drink:*");

  const drinks = [];

  for (let key of keys) {
    const data = await client.get(key);
    drinks.push(JSON.parse(data));
  }

  res.json(drinks);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await client.del(`drink:${id}`);

  if (result === 0) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ message: "Deleted successfully" });
});
  

module.exports = router;