let express = require('express');
let app = express();
let lists = require('./mocklist')
let bodyParser = require('body-parser');

//Middleware que toma los bodys y los pasa a json
app.use(bodyParser.json());


app.get('/list', function (req, res) {
    res.json(lists);
});

app.get('/list/:id', function (req, res) {

    let id = req.params.id;

    let elem = lists.find(item => item.id == id);

    if (elem) {
        res.json(elem);
    } else {
        res.status(404).json({ message: "not found" })
    }

});

app.post('/list', function (req, res) {

    let newElem = req.body;
    newElem.id = lists.length + 1;
    newElem.tasks = [];
    lists.push(newElem);

    res.status(201).json({ message: newElem });

});


app.delete('/list/:id', function (req, res) {

    let id = req.params.id;

    let newList = lists.filter(item => item.id != id);



    if (newList) {
        lists = newList;
        res.status(200).json({ message: 'deleted' });

    } else {
        res.status(404).json({ message: "not found" });
    }


});

//Get Tasks from a List
app.get('/list/:id/tasks', function(req, res){

    let id = req.params.id;
    
    let elem = lists.find(item => item.id == id);

    
    if (elem) {
        res.json(elem.tasks);
    } else {
        res.status(404).json({ message: "not found" })
    }

});

//Post de una tarea en una lista
app.post('/list/:id/tasks', function(req, res){

    let listId = req.params.id;

    let newTask = req.body;

    console.log(listId);
    console.log(newTask);

    let list = lists.find(item => item.id = listId);

    newTask.id = list.tasks.length + 1;
    newTask.done = false;


    list.tasks.push(newTask);

    res.status(200).json(newTask);

});

//Ejercicio
//Task post, mejorar la validacion si no est[a] tasks (la lista)
//Task get, listo
//Task get por id
//Task put, modificar la task (desc, done)
//Task delete






//Request - Response
app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log('Server running at 3000')
})

