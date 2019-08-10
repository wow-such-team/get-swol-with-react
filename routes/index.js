const path = require('path');
const router = require('express').Router();

// if no API routes, send React app
router.use((req, res) => 
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
);

module.exports = router;