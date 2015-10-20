/**
 * Created by maxencecornet on 20/10/15.
 */
// package to read files
    /*
var fs = require('fs');

// your IDOL OnDemand api key that you just generated
var API_KEY = "[YOUR API KEY HERE]";

/**
 Given the URL to a PDF, runs it through IDOL OnDemand's OCR API to extract the text from it.
 If the text is successfully extracted, calls the success callback with the text.
 If anything fails, calls the failure callback.
 */
/*
var convertPdf = function(filename, success, failure) {
    // store the PDF on IDOL OnDemand's servers for later processing
    // grab the file itself
    fs.stat(filename, function(err, stats) {
        // store the file
        HTTP.post("https://api.idolondemand.com/1/api/sync/storeobject/v1", {
                multipart: true,
                data&colon; {
            apikey: API_KEY,
                file: restler.file(filename, null, stats.size, null, "application/pdf")
        }
    }).on("complete", function(data) {
        // IDOL returns a reference (a unique identifier) to the uploaded file
        // data = { reference : string }
        if (data && data.reference) {
            // run the PDF through the OCR api
            HTTP.post("https://api.idolondemand.com/1/api/sync/ocrdocument/v1", {
                    data&colon; {
                apikey: API_KEY,
                    reference: data.reference,
                    mode: "document_scan"
            }
        }).on("complete", function(data) {
            if (data.text_block) {
                // success! the PDF's text is encoded in `data`;
                // now just grab the text from the raw data
                var text = _(data.text_block).pluck('text').join('\n');
                if (success) {
                    success(text);
                };
            }
            else {
                // something went wrong with OCR!
                if (failure) {
                    failure();
                }
            }
        });
    }
    else {
        // something went wrong storing the file!
        if (failure) {
            failure();
        };
    }
});
});
}
    */