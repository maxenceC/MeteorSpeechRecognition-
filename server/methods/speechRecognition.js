/**
 * Created by maxencecornet on 21/10/15.
 */
Meteor.methods({
    uploadFile: function (file) {
        HTTP.post('https://api.idolondemand.com/1/api/async/recognizespeech/v1?file=hpnext.mp4', {
            params: {
                apikey: "0103cf46-2d52-4ba6-b350-3fb689e43b66",
                file: Assets.getBinary('recording.wav')
            }
        }, function (error, result) {
            console.log(error);
            console.log(result);
        });
    }
});