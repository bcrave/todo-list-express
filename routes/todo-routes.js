const express = require("express");
const todoRouter = express.Router();

// Import the model
const Todo = require("../models/todo-model");

// GET
todoRouter.route("/todos").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(`get Todo error: ${err}`);
      res.status(500).send(`Get Todo Error: ${err}`);
    } else {
      res.status(200).json(todos);
    }
  });
});

// POST
todoRouter.route("/todo").post((req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => {
      res.status(400).send(`unable to add todo: ${err}`);
    });
});

// PATCH
todoRouter.route("/todo/:id").patch((req, res) => {
  const id = req.params.id;

  Todo.findById(id, (err, todo) => {
    if (err) {
      res.status(404).send(`Item not found: ${err}`);
    } else {
      todo.done = req.body.done;

      todo
        .save()
        .then((todo) => {
          res.json(`Todo Item: "${todo.title}" updated!`);
        })
        .catch((err) => {
          res.status(400).send(`Unable to update item: ${err}`);
        });
    }
  });
});

// DELTE
todoRouter.route("/todo/:id").delete((req, res) => {
  Todo.findByIdAndRemove({ _id: req.params.id }, (err, todo) => {
    if (err) {
      res.status(404).json(`Could not delete: ${err}`);
    } else {
      res.json("Got rid of that ish yo");
    }
  });
});

module.exports = todoRouter;
