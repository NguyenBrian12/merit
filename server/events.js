var mongo = require('./mongo')
var util = require('./utility')
var hash = require('object-hash')

function addEvent(data) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    db.collection('events').insertOne(data, (err, res) => {
      resolve()
    })
  })
  return promise
}

function getData() {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    db.collection("events").find({}).toArray((e, res) => {
      resolve(res)
    })
  })
  return promise
}

exports.getData = getData

var data1 = {
  name: 'Charity Concert',
  description: 'Help organize our annual charity concert!',
  date: '2019-02-10',
  reward: 75
}

mongo.init().then(() => {
  addEvent(data1)
})
