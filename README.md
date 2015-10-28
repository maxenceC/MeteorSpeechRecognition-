# Meteor Speech Recognition

A sample Meteor app using Haven OnDemand Speech Recognition API, with recorderJS to capture user web browser Audio stream and get a text transcript of it.


* [Installation](#installation)
* [Dependencies](#dependencies)


## <a name="installation"></a> Installation

1. Clone this repo to <yourapp> :

  'git clone https://github.com/maxenceC/MeteorSpeechRecognition-.git yourapp'

2. Sign up for a [Haven OnDemand developer account here](https://www.havenondemand.com/signup.html),once logged in, you can then find your API Key [here](https://www.havenondemand.com/account/api-keys.html)

3. In server/methods/speechRecognition.js, on lines 10 and 40, add your key :

  `params: {
               apikey: "YOUR KEY HERE"
           }`

4. Run locally :

    'cd yourapp'

    'meteor'

## <a name="dependencies"></a> Dependencies

* Audio recording:
  * [mattdiamond/Recorderjs](https://github.com/mattdiamond/Recorderjs)
