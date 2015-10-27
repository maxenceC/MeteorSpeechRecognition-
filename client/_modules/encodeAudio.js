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

var _stopRecording = function () {
    // stop the media stream
    mediaStream.stop();

    // stop Recorder.js
    rec.stop();

    // export it to WAV
    rec.exportWAV(function (e) {
        rec.clear();
        //Recorder.forceDownload(e, "recording.wav");

        function readFile(file, callback){
            var fileReader = new FileReader();
            fileReader.onloadend = callback;
            fileReader.readAsArrayBuffer( file );
        }

        readFile(e, function(e) {
            var test = new Uint8Array(e.target.result);
            console.log(test);
            Meteor.call('uploadFile',test);
        });



    });
};

var recordAudio = function (options) {
    if (options.action === 'start') {
        var audioContext = _setCompatibility();
        var record = _record(audioContext);
    } else if (options.action === 'stop') {
        _stopRecording();
    }
};

Modules.client.recordAudio = recordAudio;
