Template.home.rendered = function () {
    $('.loading').hide()
};

Template.home.events({
    'click #record': function () {
        Modules.client.recordAudio({action: 'start'});

    },
    'click #stop': function () {
        Modules.client.recordAudio({action: 'stop'});
    }
});


