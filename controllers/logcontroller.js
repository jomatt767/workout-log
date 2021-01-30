let express = require('express');
let router = express.router();
const validateSession = require('../middleware/validate-session');
const log = require('../db').import('../models/journal');

// log create

router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        title: req.body.log.title,
        date: req.body.log.date,
        entry: req.body.log.entry,
        owner: req.user.id
    }
    log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({error: err}));
});

/*get all entries*/

router.get("/", (req,res) => {
    log.findAll()
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err}));
});

// get entries by user

router.get("/mine", validateSession, (req, res) => {
    let userid =req.user.id
    log.findAll({
        where: { owner: userid},
    })
    .then((log) =>res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err}));
});

// get entries by title

router.get('/:title', function (req,res) {
    let title = req.params.title;

    log.findAll({
        where: { title: title},
    })
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err}));
});
router.put('/update/:entryId', validateSession, function(req, res) {
    const updatelogEntry = {
        title: req.body.log.title,
        date: req.body.log.date,
        entry: req.body.log.entry,
    };
    const query = {where: { id:req.params.entryId, owner: req.user.id} };
    
    log.update(updatelogEntry, query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err}));
});
router.delete("/delete/:id", validateSession, function (req, res){
    const query = { where: { id: req.params.id, owner: req.user.id } };

    log.destroy(query)
    .then(() => res.status(200).json({ message: "log Entry Removed"}))
    .catch((err) => res.status(500).json({ error: err}));

});



module.exports = router 
