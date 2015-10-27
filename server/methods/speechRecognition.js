/**
 * Created by maxencecornet on 21/10/15.
 */

TranscriptContent = null;

var _checkJobStatus = function (jobID) {
    HTTP.post('https://api.idolondemand.com/1/job/status/' + jobID, {
        params: {
            apikey: "0103cf46-2d52-4ba6-b350-3fb689e43b66"
        }
    }, function (error, result) {
        if (error) {
            console.log('Error when checking job status : ' + error)
        } else if (result.data.actions[0].result) {
            TranscriptContent = result.data.actions[0].result.document[0].content;
            console.log('Transcript content result : ' + TranscriptContent);
        } else {
            Meteor.setTimeout(function () {
                _checkJobStatus(result.data.jobID)
            }, 2200)
        }
    })
};

Meteor.methods({
    uploadFile: function (file) {
        var fd = new FormData;

        fd.append('file', {
            contentType: 'audio/wav',
            filename: 'longer.wav',
            data: file
        });

        var generated = fd.generate();

        HTTP.post('https://api.idolondemand.com/1/api/async/recognizespeech/v1', {
            params: {
                apikey: "0103cf46-2d52-4ba6-b350-3fb689e43b66"
            },
            headers: generated.headers,
            content: generated.body
        }, function (error, result) {
            if (error) {
                console.log('Error when posting to Haven OnDemand :' + error);
            } else if (result) {
                console.log('Success when posting to Haven OnDemand :' + result.data.jobID);
                _checkJobStatus(result.data.jobID);
            }
        });
    },
    returnTranscriptContent: function () {
        return TranscriptContent;
    }
});

