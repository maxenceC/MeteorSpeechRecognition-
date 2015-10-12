Meteor.publishComposite("recordings", function() {
  return {
    find: function() {
      return recordings.find({});
    }
  }
});
