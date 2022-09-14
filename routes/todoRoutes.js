const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todoController");
const { requireSignIn } = require("../middlewares");

router.post("/addTodo", todoController.addTodo);
router.get("/:userId", todoController.getTodoByUserId);
router.delete("/delete/:todoId", todoController.deleteTodo);
router.patch("/updateTodo/:todoId", todoController.updateTodo);

module.exports = router;
