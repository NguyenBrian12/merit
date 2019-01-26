var express = require('express')
var router = express.Router()
var volunteers = require('../server/volunteers')

router.get('/ping', (req, res) => {
  var data = "\"pong\""
  res.send(data);
})

router.get('/get-volunteer-data', (req, res) => {
  var username = req.params.username
  volunteers.getData(username).then(d => {
    var str = JSON.stringify(d)
    res.send(str)
  })
}

module.exports = router
