module.exports = app =>{
    const todolist = require("../controllers/todolist.controller.js");
    var router = require("express").Router();

    //Create and Save a new Tutorial
    router.post("/",todolist.create);

  //Retrive all the todolist from database
  router.get("/",todolist.listAll);

   //Find a Tutorial by id
  router.get("/:id",todolist.findOne);

   //Delete a Tutorial by id
   router.delete("/:id", todolist.delete);

   app.use('/api/todolist', router);
}