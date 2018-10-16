const express = require('express');
const router = express.Router({mergeParams: true});
const users = require('../data/userlist');

router.get('/', function(req, res){
    res.json(users);
});

router.get('/:id', function(req, res){
    let id = req.params.id;
    user = users.find(u => u.id == id);

    if(user){
        res.json(user);
    } else{
        res.status(404).json({message: "not found"});
    }
    
})

module.exports = router;
