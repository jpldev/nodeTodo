const express = require('express');
const router = express.Router();
let lists = require('../data/mocklist')
const taskRouter = require('../routes/tasks');

router.use('/:id/tasks', taskRouter);

router.get('/', function (req, res) {
    res.json(lists);
});

router.get('/:id', function (req, res) {

    let id = req.params.id;
    let elem = lists.find(item => item.id == id);

    if (elem) {
        res.json(elem);
    } else {
        res.status(404).json({ message: "not found" })
    }

});

router.post('/', function (req, res) {

    let newElem = req.body;
    newElem.id = lists.length + 1;
    newElem.tasks = [];
    lists.push(newElem);

    res.status(201).json({ message: newElem });

});

router.delete('/:id', function (req, res) {

    let id = req.params.id;

    let newList = lists.filter(item => item.id != id);

    if (newList) {
        lists = newList;
        res.status(200).json({ message: 'deleted' });

    } else {
        res.status(404).json({ message: "not found" });
    }


});


// //Request - Response
// router.get('/', function (req, res) {
//     res.send('Hello World!')
// })


//router.post
//router.put
//router.get byId
//router.delete

module.exports = router;