[![LICENSE](http://img.shields.io/badge/LICENSE-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# form-data

Generate multipart/form-data from array buffer (Uint8Array), used to upload files to external servers using APIs.

## Methods

```javascript

FromData has 2 methods : append() and generate().
 
```

## Usage

```javascript
/*
Upload audio file to Haven OnDemand speech recognition API
*/

var fd = new FormData;
// Here var file is an empty array buffer, but you should have a content 
var file = new Uint8Array();
  
fd.append('file', {
    contentType: 'audio/wav',
    filename: 'longer.wav',
    data: file
});
  
var generated = fd.generate();
  
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
    }
});
```