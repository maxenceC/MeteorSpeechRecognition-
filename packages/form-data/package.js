Package.describe({
  name: 'maxencecornet:form-data',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Generate multipart/form-data from array buffer (Uint8Array).',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/maxenceC/meteor-form-data',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'underscore']);
  api.addFiles('form-data.js');
  api.export('FormData', 'server')
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('maxencecornet:form-data');
  api.addFiles('form-data-tests.js');
});
