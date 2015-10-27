/**
 * Created by maxencecornet on 21/10/15.
 */
FormData = function () {
    this._parts = {};
};

FormData.prototype.append = function (name, part) {
    this._parts[name] = part;
};

FormData.prototype.generate = function () {
    var boundary = Date.now();
    var bodyParts = [];

    _.each(this._parts, function (part, name) {
        part.data = (new Buffer(part.data)).toString('base64');

        bodyParts.push(
            '--' + boundary,
            'Content-Disposition: form-data; name="' + name + '"; filename="' + part.filename + '"',
            'Content-Type: ' + part.contentType,
            'Content-Transfer-Encoding: base64',
            '',
            part.data);
    });

    bodyParts.push('--' + boundary + '--', '');

    return {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=' + boundary,
        },
        body: bodyParts.join('\r\n')
    }
};

var _checkJobStatus = function (jobID) {
    return HTTP.post('https://api.idolondemand.com/1/job/status/' + jobID, {
        params: {
            apikey: "0103cf46-2d52-4ba6-b350-3fb689e43b66"
        }
    }, function (error, result) {
        if (error) {
            console.log('Error whren checking job status : ' + error)
        } else if (result.data.actions[0].result) {
            console.log(result.data.actions[0].result.document[0].content);
            return result.data.actions[0].result.document[0].content;
        } else {
            Meteor.setTimeout(function () {
                _checkJobStatus(result.data.jobID)
            }, 2200)
        }
    })
};

Meteor.methods({
    uploadFile: function (file) {
        //var filo = Assets.getBinary('longer.wav');


        //console.log(file);
        var fd = new FormData;

        fd.append('file', {
            contentType: 'audio/wav',
            filename: 'longer.wav',
            data: file
        });

        var generated = fd.generate();

        return HTTP.post('https://api.idolondemand.com/1/api/async/recognizespeech/v1', {
            params: {
                apikey: "0103cf46-2d52-4ba6-b350-3fb689e43b66",
            },
            headers: generated.headers,
            content: generated.body
        }, function (error, result) {
            if (error) {
                console.log('Error when posting to Haven OnDemand :' + error);
            } else if (result) {
                console.log('Success when posting to Haven OnDemand :' + result.data.jobID);
                return _checkJobStatus(result.data.jobID);
            }
        });
    }
});

