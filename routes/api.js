var express = require('express')
var router = express.Router()

router.get('/ping', (req, res) => {
  var data = "\"pong\""
  res.send(data);
})

module.exports = router
