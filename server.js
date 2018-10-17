let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let listsRouter = require('./routes/lists.js')
let usersRouter = require('./routes/users.js');


//Middleware que toma los bodys y los pasa a json
app.use(bodyParser.json());

//middleware, simulando autenticacion
//Se usa next(), para avanzar o no
// app.use('/list', middlewareAuth, listsRouter);

app.use('/list', listsRouter);

app.use('/users', usersRouter);

app.listen(3000, function () {
    console.log('Server running at 3000')
})

