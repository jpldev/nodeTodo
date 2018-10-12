let express = require('express');
let app = express();
let lists = require('./mocklist')
let bodyParser = require('body-parser');

//Middleware que toma los bodys y los pasa a json
app.use(bodyParser.json());


app.get('/list', function(req, res){
    res.json(lists);
});

app.get('/list/:id', function(req, res){
    
    let id = req.params.id;

    let elem = lists.find(item => item.id == id);

    if(elem){
        res.json(elem);
    } else{
        res.status(404).json({message:"not found"})
    }
    
});

app.post('/list', function(req, res){

    let newElem = req.body;
    newElem.id = lists.length + 1;
    newElem.tasks = [];
    lists.push(newElem);

    res.status(201).json({message: newElem});

});


app.delete('/list/:id', function(req, res){

    let id = req.params.id;

    let newList = lists.filter(item => item.id != id) ;

    

    if(newList){
        lists = newList;
        res.status(200).json({message: 'deleted'});
        
    } else {
        res.status(404).json({message:"not found"});
    }
    

});


//Request - Response
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Server running at 3000')
})

