var mongo = require("./mongo");

function addVolunteer(volunteer_data) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB();
    db.collection("volunteers").insertOne(volunteer_data, (err, res) => {
      resolve();
    });
  });
  return promise;
}

function getData(username) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB();
    var q = { username: username };
    db.collection("volunteers").findOne(q, (e, res) => {
      resolve(res);
    });
  });
  return promise;
}

exports.getData = getData;

// function updateVolunteer(username, volunteer_data) {
//   var promise = new Promise((resolve, reject) => {
//     var db = mongo.getDB()
//     var q = {username: username}
//     db.collection("volunteers").updateOne(q, volunteer_data, (err, res) => {
//
//     }
//   })
// }

// var volunteer_data = {
//   username: 'jj92',
//   firstname: 'Jeff',
//   lastname: 'Jones',
//   date: '2019-01-26',
//   points: 0
// }

// mongo.init().then(() => {
//   addVolunteer(volunteer_data)
// })

// mongo.init().then(() => {
//   getData('jj92').then(d => console.log(d))
// })
