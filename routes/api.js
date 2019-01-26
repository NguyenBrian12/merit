var express = require("express");
var router = express.Router();
var volunteers = require("../server/volunteers");
var events = require('../server/events')

router.get("/ping", (req, res) => {
  var data = '"pong"';
  res.send(data);
});

router.get("/get-volunteer-data/:username", (req, res) => {
  var username = req.params.username;
  volunteers.getData(username).then(d => {
    var str = JSON.stringify(d);
    res.send(str);
  });
});

router.get('/add-points/:username/:pts', (req, res) => {
  var username = req.params.username
  var pts = req.params.points
  volunteers.addPoints(username, pts).then(() => {
    res.end()
  })
})

router.post('/remove-pending-reward/:username/:id', (req, res) => {
  var username = req.params.username
  var id = req.params.id
  volunteers.removePendingReward(username, id).then(() => {
    res.end()
  })
})

router.post('/redeem-reward/:username/:id', (req, res) => {
  var username = req.params.username
  var id = req.params.id
  volunteers.redeemReward(username, id).then(() => {
    res.end()
  })
})

router.get('/get-events', (req, res) => {
  events.getData().then(d => {
    var str = JSON.stringify(d)
    res.send(str)
  })
})

module.exports = router;
