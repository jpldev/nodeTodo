const express = require('express');
const router = express.Router({mergeParams: true});
const lists = require('../data/mocklist')

//Get Tasks from a List
router.get('/', function(req, res){

    let id = req.params.id;
    
    let elem = lists.find(item => item.id == id);

    
    if (elem) {
        res.json(elem.tasks);
    } else {
        res.status(404).json({ message: "not found" })
    }

});

//Post de una tarea en una lista
router.post('/', function(req, res){

    let listId = req.params.id;

    let newTask = req.body;

    console.log(listId);
    console.log(newTask);

    let list = lists.find(item => item.id = listId);

    if(list){
        newTask.id = list.tasks.length + 1;
        newTask.done = false;


        list.tasks.push(newTask);

        res.status(200).json(newTask);
    } else {
        res.status(404).json({message: "not found"});
    }    

});

module.exports = router;

// //Ejercicio
// //Task post, mejorar la validacion si no est[a] tasks (la lista). Listo
// //Task get, listo
// //ver
// //Task get por id
// //Task put, modificar la task (desc, done)
// //Task delete



