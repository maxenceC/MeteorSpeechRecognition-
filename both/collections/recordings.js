Recordings = new Mongo.Collection('Recordings');

Recordings.helpers({

});

Recordings.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
