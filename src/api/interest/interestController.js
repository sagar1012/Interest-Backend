
const express = require('express');
const router = express.Router();
var interestService = require('./interestService');

router.post("/add", (req, res) => {
    interestService.add(req)
        .then(data => res.send(data))
        .catch(err => res.status(400).send({
            error: err.message
        }));
});

router.post("/get", (req, res) => {
    interestService.get(req)
        .then(data => res.send(data))
        .catch(err => res.status(400).send({
            error: err.message
        }));
});

router.put("/update", (req, res) => {
    interestService.update(req)
        .then(data => res.send(data))
        .catch(err => res.status(400).send({
            error: err.message
        }));
});

router.post("/delete", (req, res) => {
    interestService.delete(req)
        .then(data => res.send(data))
        .catch(err => res.status(400).send({
            error: err.message
        }));
});

module.exports = router;
