module.exports = function(app) {
    
    const todoController = require('../controllers/todoController');

    app.route('/todos')
        .get(todoController.listAllTodos)
        .post(todoController.setTodo);

    app.route('/todos/:todoId')
        .get(todoController.getTodoById)
        .put(todoController.updateTodo)
        .delete(todoController.deleteTodo);
}
