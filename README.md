# Walkie Talkie

#### By Brooke K., last updated 02/28/2021

## Technologies Used

* _[Create React App](https://github.com/facebook/create-react-app)_
* _[WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)_
* _[Node](https://nodejs.org/en/download/) v12.18.3_
* [Firebase Firestore](https://firebase.google.com/docs/firestore)

## Description
"Walkie Talkie" is an application whose design and functionality simulates the experience of using a walkie talkie. The Minimum Viable Product is to start and stop an audio session with 1 other person using the WebRTC API for audio sharing and firestore to create and share session information so that two people can talk to each other.

## User Stories
As a user, I would like to...:

- [ ] start and end an audio chat with one other person.
- [ ] start and end an audio chat with multiple people.
- [ ] only be able to speak by pressing a button, like a walkie talkie has.
- [ ] manage my audio input and output.
- [ ] invite someone to my walkie talkie session with an invitation code.
- [ ] be able to join a session with an invitation code.
- [ ] be able to restart the same session, even if I leave the application and return at a later time.
- [ ] start multiple sessions, similar to having access to multiple channels on a walkie talkie.
- [ ] be able to nickname my sessions.
- [ ] use the application anonymously.
- [ ] create an account to save and manage my walkie talkie sessions.


## Prerequisites to running and viewing this application

You need the following installed on your computer to view this application:

* [Node](https://nodejs.org/en/download/)
* A modern web browser, like [Firefox](https://www.mozilla.org/en-US/firefox/new/) or [Chrome](https://www.google.com/chrome/)
* [VSCode](https://code.visualstudio.com/download) or another text editor to view or edit the code base

## Setup/Installation Requirements

* Download or clone this repo
* In your terminal navigate to the root level of the project, and:
    * To download dependencies, run `npm install`
    * To create a production build of the app, run `npm run build`
    * To start a development server, run `npm run start` and then navigate open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

## Known Bugs
There are no known bugs currently.

## License
MIT

Copyright (c) 2021