import { describe, expect, test } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";

// Return the health of the server
describe("Lab 3 REST API", () => {
  test("GET /health returns status ok", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/health")
        .expect(200);

    expect(response.body).toEqual({ status: "ok" });
  });

  // Return the complete list of items
    test("GET /items returns list of items", async () => {
      const app = createApp();
  
      const response = await request(app)
          .get("/items")
          .expect(200);
  
      expect(response.body).toEqual({items: [{id: 1, name: "keyboard", quantity: 10 }, { id: 2, name: "mouse", quantity: 5 }]});
    });

    // Return item by id
    test("GET /items/:id returns item by id", async () => {
      const app = createApp();
  
      const response = await request(app)
          .get("/items/1")
          .expect(200);
  
      expect(response.body).toEqual({id: 1, name: "keyboard", quantity: 10 });
    });

    // Return error for invalid item id
    test("GET /items/:id returns error 404 for invalid item id", async () => {
      const app = createApp();
  
      const response = await request(app)
          .get("/items/999")
          .expect(404);
  
      expect(response.body).toEqual({error: "Item not found"});
    });

    // Create a new item
    test("POST /items creates a new item", async () => {
      const app = createApp();
  
      const response = await request(app)
          .post("/items")
          .send({name: "newItem", quantity: 500})
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .expect(201);
  
      expect(response.body).toEqual({ id: 3, name: "newItem", quantity: 500 });
    });

    // Attempt to create a new item with a bad request
    test("POST /items returns error 400 for invalid request", async () => {
      const app = createApp();
  
      const response = await request(app)
          .post("/items")
          .send({name: "", quantity: 500})
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .expect(400);
  
      expect(response.body).toEqual({ error: "Invalid request" });
    });

    // Update an item
    test("PUT /items/id updates an existing item", async () => {
      const app = createApp();
  
      const response = await request(app)
          .put("/items/1")
          .send({name: "updatedItem", quantity: 500})
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .expect(200);
  
      expect(response.body).toEqual({ id: 1, name: "updatedItem", quantity: 500 });
    });

    // Attempt to update an item that does not exist
    test("PUT /items/id returns error 404 for an item that does not exist", async () => {
      const app = createApp();
  
      const response = await request(app)
          .put("/items/999")
          .send({name: "updatedItem", quantity: 500})
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .expect(404);
  
      expect(response.body).toEqual({ error: "Item not found" });
    });

    // Delete an item from the list
    test("DELETE /items/id deletes an item from the list", async () => {
      const app = createApp();
  
      const response = await request(app)
          .delete("/items/1")
          .expect(204);
  
      expect(response.body).toEqual({});
    });

});


