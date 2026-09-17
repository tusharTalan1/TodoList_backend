let todos = require("../data/todos");

function getAllTodos(req, res){
  res.json(todos);
}

function getTodoById(req, res){
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json(todo);
}

function createTodo(req, res){
  const { title, owner } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTodo = {
    id: todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
    title,
    done: false,
    owner: owner || 1
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
}

function updateTodo(req, res){
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  const { title, done } = req.body;
  if (title !== undefined) {
    todo.title = title;
  }
  if (done !== undefined) {
    todo.done = done;
  }
  res.json(todo);
}

function deleteTodo(req, res){
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  const deleted = todos.splice(todoIndex, 1);
  res.json(deleted[0]);
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
