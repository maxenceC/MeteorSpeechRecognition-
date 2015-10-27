# meteor-boilerplate

A sample Meteor app using Haven OnDemand Speech Recognition API, with recorderJS to capture user web browser Audio stream and get a text transcript of it.

* [Installation](#installation)
* [Dependencies](#dependencies)



## <a name="installation"></a> Installation

1. Clone this repo to `<yourapp>`

  `git clone https://github.com/Differential/meteor-boilerplate.git <yourapp>`

2. Remove `.git`

  `cd <yourapp> && rm -rf .git`

3. Start coding!

## <a name="file-structure"></a> File Structure

We have a common file structure we use across all of our Meteor apps. Client-only files are stored in the `client` directory, server-only files are stored in the `server` directory, and shared files are stored in the `both` directory. The `private` and `public` directories are for either private or public assets. 


## <a name="dependencies"></a> Dependencies

* Audio recording:
  * [mattdiamond/Recorderjs](https://github.com/mattdiamond/Recorderjs)
