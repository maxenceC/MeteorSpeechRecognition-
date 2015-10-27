Template.home.rendered = function () {

    Tracker.autorun(function () {
        var result = Session.get('')
    });

};

Template.home.events({
    'click #record': function () {
        Modules.client.recordAudio({action: 'start'});

    },
    'click #stop': function () {
        Modules.client.recordAudio({action: 'stop'});
    }
});


