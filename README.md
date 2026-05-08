Drinks API with Redis
Overview

This is my exercise on how to use Redis.

In this task, I took a simple REST API that originally stored data in local JSON files and changed it so that all data is stored in Redis instead. The main purpose was to practice and understand how Redis works in a real project.

API Endpoints

The API still includes the same endpoints:

GET /drinks – get all drinks
GET /drinks/:id – get a single drink by id
POST /drinks – add a new drink
DELETE /drinks/:id – delete a drink

Each drink contains:

id (number)
name (string)
ingredients (array of strings)
description (string)
How Redis is used

Instead of using a local JSON file, I store the data in Redis.

I use:

client.get() – to read data from Redis
client.set() – to save updated data back to Redis

All drinks are stored as a JSON string under a single Redis key.

Purpose of this exercise

The goal of this exercise was to:

Learn how to connect and use Redis
Practice basic Redis commands
Understand how Redis can replace simple file storage
Work with data stored in memory instead of files
Summary

This is a simple practice project for learning how Redis works by using it in a basic CRUD API.
