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
    }, function (err) {
        console.log('Browser not supported : ' + err);
        _displayError(err);
    });
};

var _displayError = function (error) {
    $('#err').html('Error : '+error.message);
    $('#recordingON').hide();
    $('#err').show();
};

var _grabAndDisplayTranscriptContent = function () {
    Meteor.call('returnTranscriptContent', function (error, result) {
        if (result) {
            $('#transcript').html(result);
            $('.loading').hide();
            $('#result').show();
        } else {
            Meteor.setTimeout(function () {
                _grabAndDisplayTranscriptContent();
            }, 300)
        }
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
    if (typeof(mediaStream.stop) === 'function') {
        mediaStream.stop()
    } else {
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
        var audioContext = _setCompatibility();
        var record = _record(audioContext);
        $('#recordingON').show();
        $('#result').hide();
    } else if (options.action === 'stop') {
        _stopRecording();
        $('.loading').show();
        $('#recordingON').hide();
    }
};

Modules.client.recordAudio = recordAudio;
