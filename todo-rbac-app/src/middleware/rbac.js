const users = require("../data/users");
const todos = require("../data/todos");

function checkPermission(action){
  return (req, res, next)=>{
    const userId = parseInt(req.headers["x-user-id"], 10);
    if (!userId){
      return res.status(401).json({ error: "Unauthorized: Missing x-user-id header" });
    }

    const currentUser = users.find((u) => u.id === userId);
    if (!currentUser){
      return res.status(403).json({ error: "Forbidden: User not found" });
    }

    req.user = currentUser;

    if (currentUser.role === "admin"){
      return next();
    }

    if (action === "create" || action === "read_all"){
      return next();
    }

    const todoId = parseInt(req.params.id, 10);
    const todo = todos.find((t) => t.id === todoId);

    if (!todo){
      return res.status(404).json({ error: "Todo not found" });
    }

    if (todo.owner !== currentUser.id){
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    next();
  };
}

module.exports = { checkPermission };
