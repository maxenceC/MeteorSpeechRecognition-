Template.home.rendered = function () {

};

Template.home.events({
    'click #record': function () {
        Modules.client.recordAudio({start: true});

    },
    'click #stop': function () {
        Modules.client.recordAudio({start: false});
    }
});


