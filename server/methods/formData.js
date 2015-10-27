/**
 * Created by maxencecornet on 27/10/15.
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
            'Content-Type': 'multipart/form-data; boundary=' + boundary
        },
        body: bodyParts.join('\r\n')
    }
};