const db = require("../models");
const Todolist = db.todolist;

exports.create = (req, res) =>{
    // Validate request
    if(!req.body.title) {
       res.status(400).send({message: "Content cannot be empty"});
       return;
    }
    //create todolist
    const todolist = new Todolist({
       title: req.body.title,
       description: req.body.description,
    });
    //save in the database
    todolist
    .save(todolist)
    .then(data => {
       res.send(data);
    })
    .catch(err =>{
       res.status(500).send({
           message:
           err.message || "Some error occurred while creating the todolist"
       });
    });
   };


exports.listAll = (req, res) =>{
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} :{};
        Todolist.find(condition)
        .then(data => {
            res.send(data);
        })
    .catch(err =>{
        res.status(500).send({
            message: 
            err.message ||  "Some error occurred while creating the todolist"
        });
    });
    };

    exports.delete = (req, res) => {
        const id = req.params.id;
    
        Todolist.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot delete todo with id=${id}. Maybe todo was not found!` });
                } else {
                    res.send({ message: "Todo was deleted successfully!" });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete todo with id=${id}`
                });
            });
    };

exports.findOne = (req, res) =>{
        const id = req.params.id;
        Todolist.findById(id)
            .then(data => {
                if(!data)
                    res.status(404).send({message:"Not found todolist with id " +id });
                else res.send(data);
            })
        .catch(err =>{
            res.status(500).send({
                message: 
                err.message || "Some error occurred while retrieving todolist with id= " +id
            });
        });
    };

    exports.findId = (req, res) => {
        const title = req.params.title;    
        if (!title) {
            console.log("No title provided");
            return res.status(400).send({ message: "Title cannot be empty!" });
        }
        Todolist.findOne({ title: title })
            .then(data => {
                if (!data) {
                    console.log(`Todo with title ${title} not found`);
                    return res.status(404).send({ message: `Cannot delete todo with title ${title}. It was not found!` });
                } 
               else res.send(data._id)
               
            })
            .catch(err => {
                console.error(`Error occurred while deleting todo with title=${title}:`, err);
                return res.status(500).send({
                    message: `Could not delete todo with title=${title}. Error: ${err.message}`
                });
            });
    };
    