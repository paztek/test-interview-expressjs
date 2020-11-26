const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next) {
    return new(new Error('TEST'));
    res.json({ foo: 'bar' });
});

module.exports = router;
