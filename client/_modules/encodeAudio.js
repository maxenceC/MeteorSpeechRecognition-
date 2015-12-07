/**
 * Created by maxencecornet on 06/10/15.
 */

var mediaStream;
var rec;

var _setCompatibility = function () {
    var navigator = window.navigator;
    navigator.getUserMedia = (
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
    );

    var Context = window.AudioContext || window.webkitAudioContext;
    var context = new Context();

    return context;
};

var _record = function (context) {
    // ask for permission and start recording
    navigator.getUserMedia({audio: true}, function (localMediaStream) {
        mediaStream = localMediaStream;

        // create a stream source to pass to Recorder.js
        var mediaStreamSource = context.createMediaStreamSource(localMediaStream);

        // create new instance of Recorder.js using the mediaStreamSource
        rec = new Recorder(mediaStreamSource);

        rec.record();
    }, function () {
        console.log('Browser not supported');
    });
};

var _grabAndDisplayTranscriptContent = function () {
    Meteor.call('returnTranscriptContent', function (error, result) {
        Session.set("data", result);
        if (result) {
            $('#transcript').html(Session.get("data"));
            $('.loading').hide()
        }
        Meteor.setTimeout(function () {
            _grabAndDisplayTranscriptContent();
        }, 2200)
    });
};

//convert Blob to ArrayBuffer
var _convertToArrayBuffer = function (file, callback) {
    var fileReader = new FileReader();
    fileReader.onloadend = callback;
    fileReader.readAsArrayBuffer(file);
};

var _stopRecording = function () {
    // stop the media stream -- mediaStream.stop() is deprecated in Chrome 45
    if (mediaStream.stop()) {
        mediaStream.stop()
    }else {
        mediaStream.getTracks()[0].stop();
    }

    // stop Recorder.js
    rec.stop();

    // export it to WAV
    rec.exportWAV(function (e) {
        rec.clear();

        _convertToArrayBuffer(e, function (e) {
            var newFile = new Uint8Array(e.target.result);
            Meteor.call('uploadFile', newFile, function () {
                _grabAndDisplayTranscriptContent();
            });
        });
    });
};

var recordAudio = function (options) {
    if (options.action === 'start') {
        $('.loading').show();
        var audioContext = _setCompatibility();
        var record = _record(audioContext);
    } else if (options.action === 'stop') {
        _stopRecording();
    }
};

Modules.client.recordAudio = recordAudio;
