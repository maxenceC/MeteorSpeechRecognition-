Template.home.rendered = function () {
    $('.loading').hide();
    $('#recordingON').hide();
    $('#result').hide();
    $('#err').hide();
};

Template.home.events({
    'click #record': function () {
        Modules.client.recordAudio({action: 'start'});
    },
    'click #stop': function () {
        Modules.client.recordAudio({action: 'stop'});
    }
});


