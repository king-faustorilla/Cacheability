# Drinks API with Redis Storage

## Overview

This project is a simple REST API for managing drinks. In earlier versions, the data was stored in local JSON files. In this version, we replace file-based storage with **Redis**, using it both as a cache and as a primary data store.

The goal of this task is to practice working with Redis using basic commands like `client.get` and `client.set`, while maintaining the same API structure as before.

---

## Tech Stack

* Node.js
* Express.js
* Redis (`node-redis` or similar client)
* JSON-based data structure stored in Redis

---

## Data Model

Each **drink** has the following structure:

```json
{
  "id": 1,
  "name": "Mojito",
  "ingredients": ["Rum", "Mint", "Sugar", "Lime", "Soda Water"],
  "description": "A refreshing Cuban cocktail."
}
```

---

## Storage Strategy (Redis)

Instead of storing data in a JSON file, all drinks are stored in Redis.

A common approach is:

* Store all drinks under a single Redis key, e.g.:

  ```
  drinks
  ```
* The value is a JSON stringified array of drink objects.

Example:

```
Key: drinks
Value: "[{...}, {...}, {...}]"
```

### Redis Operations Used

* `client.get("drinks")` → retrieve all drinks
* `client.set("drinks", JSON.stringify(drinks))` → update the full list

---

## API Endpoints

### 1. Get all drinks

```
GET /drinks
```

Returns an array of all drinks stored in Redis.

---

### 2. Get drink by ID

```
GET /drinks/:id
```

Returns a single drink that matches the provided ID.

---

### 3. Add a new drink

```
POST /drinks
```

Request body:

```json
{
  "name": "Mojito",
  "ingredients": ["Rum", "Mint", "Sugar", "Lime", "Soda Water"],
  "description": "A refreshing Cuban cocktail."
}
```

* Generates a unique `id`
* Adds the drink to Redis storage

---

### 4. Delete a drink

```
DELETE /drinks/:id
```

Removes the drink with the specified ID from Redis.

---

## How It Works

1. On each request, the server reads the current drinks list from Redis using `GET`.
2. The JSON string is parsed into an array.
3. Any modifications (add/delete/update) are performed in memory.
4. The updated array is saved back to Redis using `SET`.

---

## Why Redis?

Using Redis instead of a local JSON file provides:

* Faster read/write operations
* Better scalability
* Simpler transition toward distributed systems
* Built-in caching capabilities (useful for future improvements)

---

## Possible Improvements

* Store each drink as a separate Redis key instead of a single array
* Add TTL (time-to-live) for cached data
* Use Redis hashes for more efficient updates
* Add validation for request bodies
* Introduce pagination for large datasets

---

## Summary

This task demonstrates how Redis can be used not only as a cache, but also as a lightweight data store. By replacing file-based storage with Redis, the API becomes more flexible and closer to production-style architecture.
