const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { checkPermission } = require("../middleware/rbac");

router.get("/", checkPermission("read_all"), todoController.getAllTodos);
router.get("/:id", checkPermission("read"), todoController.getTodoById);
router.post("/", checkPermission("create"), todoController.createTodo);
router.put("/:id", checkPermission("update"), todoController.updateTodo);
router.delete("/:id", checkPermission("delete"), todoController.deleteTodo);

module.exports = router;
