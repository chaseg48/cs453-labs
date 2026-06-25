import express, { request } from "express";

function validateRequest(req) {
  return (typeof(req.body.name) === "string" && req.body.name != "" && Number(req.body.quantity) >= 0);
}

function findItemId(item, req) {
  return (item.id == Number(req.params.id));
}

export function createApp() {
  const app = express();

  app.use(express.json());

  // Starter data. This data is stored in memory and will reset when the
  // server restarts.
  let nextId = 3;
  const items = [
    { id: 1, name: "keyboard", quantity: 10 },
    { id: 2, name: "mouse", quantity: 5 }
  ];

  // Returns the health of the server
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Returns a list of all the items
  app.get("/items", (req, res) => {
    res.status(200).json({items: items});
  });

  // Returns items based on ID
  // Returns an error if the item ID is not found
  app.get("/items/:id", (req, res) => {
    const result = items.find(item => findItemId(item, req));
    if (result != undefined) {
      res.status(200).json(result);
    }
    else {

      res.status(404).json({ error: "Item not found" });
    }
  });

  // Creates a new item and adds it to the items array
  // Increments the next item id
  app.post("/items", (req, res) => {
    if (validateRequest(req)) {
      let newItem = {
        id: nextId,
        name: String(req.body.name),
        quantity: Number(req.body.quantity)
      };
      items.push(newItem);
      nextId++;
      res.status(201).json(newItem);
    }
    else {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Updates an item within the items array if it exists
  // Returns an error if the item does not exist or if the data is invalid
  app.put("/items/:id", (req, res) => {
    if (validateRequest(req)) {
      let index = items.findIndex(item => findItemId(item, req));
      if (index >= 0) {
        let updatedItem = {
          id: Number(req.params.id),
          name: String(req.body.name),
          quantity: Number(req.body.quantity)
        }
        items[index] = updatedItem;
        return res.status(200).json(updatedItem);
      }
      else {
        res.status(404).json({ error: "Item not found" });
      }
    }
    else {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Deletes an item from the list
  app.delete("/items/:id", (req, res) => {
    let index = items.findIndex(item => findItemId(item, req));
    if (index >= 0) {
      items.splice(index, 1);
      res.status(204).json();
    }
    else {
      res.status(404).json({ error: "Item not found" });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

if (isMainModule) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Lab 3 REST API listening on port ${PORT}`);
  });
}
