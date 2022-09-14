const { Types } = require("mongoose");
const Todo = require("../modals/todoModal");

exports.addTodo = async (req, res) => {
  try {
    const { title, taskDesc, userId } = req.body;
    // console.log(title, taskDesc);
    const task = await Todo.create({
      title: title,
      description: taskDesc,
      user_id: userId,
    });
    res.status(201).json({ message: "task added successfully", data: task });
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error Please Try again");
  }
};
exports.getTodoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId);
    const todos = await Todo.find({ user_id: userId });

    res.status(200).json({ message: "success", data: todos });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "something went wrong", error });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, description } = req.body;
    console.log(title, description);
    const newTodo = await Todo.findByIdAndUpdate(
      { _id: todoId },
      { title: title, description: description },
      { new: true }
    );
    res.status(200).json({ message: "Updated Successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong", error });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;

    const todo = await Todo.findByIdAndDelete(todoId);
    res.status(204).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error", error });
  }
};
