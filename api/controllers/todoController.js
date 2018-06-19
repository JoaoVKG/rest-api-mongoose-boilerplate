const moongose = require('mongoose');
const Todo = moongose.model('Todos');

exports.listAllTodos = function(req, res) {
    Todo.find({}, function(err, todo) {
        if (err) res.send(err);
        
        res.json(todo);
    })
}

exports.setTodo = function(req, res) {
    var newTodo = new Todo(req.body);
    newTodo.save(function(err, todo) {
        if (err) res.send(err);
        
        res.json(todo);
    });
};
  
  
exports.getTodoById = function(req, res) {
    Todo.findById(req.params.todoId, function(err, todo) {
        if (err) res.send(err);
        
        res.json(todo);
    });
};
  
  
exports.updateTodo = function(req, res) {
    Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true}, function(err, todo) {
        if (err) res.send(err);

        res.json(todo);
    });
};
  

exports.deleteTodo = function(req, res) {
    Todo.remove({_id: req.params.todoId}, function(err, todo) {
        if (err) res.send(err);
        
        res.json({ message: 'Todo successfully deleted!' });
    });
};
