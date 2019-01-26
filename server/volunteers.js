var mongo = require('./mongo')
var util = require('./utility')
var events = require('./events')
var hash = require('object-hash')

function addVolunteer(data) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    db.collection('volunteers').insertOne(data, (err, res) => {
      resolve()
    })
  })
  return promise
}

function getData(username) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    var q = {username: username}
    db.collection("volunteers").findOne(q, (e, res) => {
      resolve(res)
    })
  })
  return promise
}

exports.getData = getData

function setPoints(username, pts) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    var q = {username: username}
    var newvals = { $set: { points: pts }}
    db.collection("volunteers").updateOne(q, newvals, (err, res) => {
      resolve()
    })
  })
  return promise
}

async function addPoints(username, pts) {
  var data = await getData(username)
  await setPoints(username, data.points + pts)
}

exports.addPoints = addPoints

function setPendingRewards(username, rewards) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    var q = {username: username}
    var newvals = { $set: { pending_rewards: rewards }}
    db.collection("volunteers").updateOne(q, newvals, (err, res) => {
      resolve()
    })
  })
  return promise
}

async function addPendingReward(username, pr_date, pr_desc, pr_val) {
  var data = await getData(username)
  var rewards = data.pending_rewards
  var id = hash([pr_date, pr_desc, pr_val])
  rewards.push({
    id: id,
    date: pr_date,
    description: pr_desc,
    point_value: pr_val
  })
  await setPendingRewards(username, rewards)
}

async function removePendingReward(username, id) {
  var data = await getData(username)
  var rewards = []
  for (var reward of data.pending_rewards) {
    if (reward.id != id) rewards.push(reward)
  }
  await setPendingRewards(username, rewards)
}

exports.removePendingReward = removePendingReward

async function getPendingRewards(username) {
  var data = await getData(username)
  return data.pending_rewards
}

async function getPendingReward(username, id) {
  var rewards = await getPendingRewards(username)
  for (var reward of rewards) {
    if(reward.id == id) return reward
  }
}

async function redeemReward(username, id) {
  var reward = await getPendingReward(username, id)
  var redeem_value = reward.point_value
  await addPoints(username, redeem_value)
  await removePendingReward(username, id)
}

exports.redeemReward = redeemReward

async function addReferral(username, firstname, lastname) {
  var date = util.formatDate(new Date())
  var name = firstname + ' ' + lastname
  var desc = 'referral for ' + name
  var value = 100
  await addPendingReward(username, date, desc, value)
}

async function addEvent(username, id) {
  var event_data = await events.getEvent(id)
  var date = event_data.date
  var desc = event_data.name + " - " + event_data.description
  var value = event_data.reward
  await addPendingReward(username, date, desc, value)
}

exports.addEvent = addEvent

var user_data = {
  username: 'jj92',
  firstname: 'Jeff',
  lastname: 'Jones',
  date: '2019-01-26',
  points: 150,
  pending_rewards: []
}

var event_data = {
  name: 'Charity Concert',
  description: 'Help organize our annual charity concert!',
  date: '2019-02-10',
  reward: 75
}

var username = 'jj92'
var pr_desc = 'referral for Dennis Tran'
var pr_val = 100
var pr_date = '2019-01-26'
// var id = '858c442bb9e3171a2bd42c9dedd9f1ddc928f8fc'

mongo.init().then(() => {
  // addVolunteer(user_data)
  // getData(username).then(d => console.log(d))
  // setPoints(username, 100)
  // addPoints(username, 10)
  // addPendingReward(username, pr_date, pr_desc, pr_val)
  // removePendingReward(username, id)
  // redeemReward(username, id)
  // addReferral(username, 'Forrest', 'Zhang')
  // addEvent(username, '684eda380d497fed2abf200f459176a94888bea1')
})
