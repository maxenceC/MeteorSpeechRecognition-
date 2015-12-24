/**
 * Created by maxencecornet on 21/10/15.
 */

TranscriptContent = null;

// This is a polling method, which calls itself every 2.2 seconds to check if the transcript is ready, using the jobID provided by uploadFile()'s return value
var _checkJobStatus = function (jobID) {
    HTTP.post('https://api.idolondemand.com/1/job/status/' + jobID, {
        params: {
            apikey: "Your API key"
        }
    }, function (error, result) {
        if (error) {
            console.log('Error when checking job status : ' + error)
        } else if (result.data.actions[0].result) {
            TranscriptContent = result.data.actions[0].result.document[0].content;
            console.log('Transcript content result : ' + TranscriptContent);
        } else {
            // Calling itself every 0.3 seconds until the text transcript is ready
            Meteor.setTimeout(function () {
                _checkJobStatus(result.data.jobID)
            }, 300)
        }
    })
};

Meteor.methods({
    uploadFile: function (file) {

        // Generate a multipart file from the audio blob
        var fd = new FormData;

        fd.append('file', {
            contentType: 'audio/wav',
            filename: 'longer.wav',
            data: file
        });

        var generated = fd.generate();

        // Upload the file to Haven OnDemand speech recognition API, which task works asynchronously and return a JobID
        // This jobID is used to poll the status of the speech recognition task
        HTTP.post('https://api.idolondemand.com/1/api/async/recognizespeech/v1', {
            params: {
                apikey: "Your API key"
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
    // Return the value of the transcript to the client
    returnTranscriptContent: function () {
        result = TranscriptContent;
        TranscriptContent = 0;
        return result;
    }
});

