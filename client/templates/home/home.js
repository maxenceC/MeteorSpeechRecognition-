Template.home.rendered = function () {

};

Template.home.events({
    'click #record': function () {
        Modules.client.recordAudio({action: 'start'});

    },
    'click #stop': function () {
        Modules.client.recordAudio({action: 'stop'});
    },
    'click #upload': function() {
        Meteor.call('uploadFile', function(error, result) {
            $('#transcript').val(result);
        });
    }
});


