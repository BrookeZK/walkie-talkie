import { useEffect, useState } from "react";

function App() {
  const [audioInputs, setAudioInputs] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);
  // const [videoInputs, setVideoInputs] = useState([]);
  const [error, setError] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  // const [sinkIdSuccess, setSinkIdSuccess] = useState(false);

  // const getDevices = () => {
  //   navigator.mediaDevices.enumerateDevices().then(devices => {
  //     console.log(audioOutputs)
  //     populateOptions(devices);
  //   }).catch(e => 
  //     setError(e)
  //   )
  // }

  useEffect(() => {
    const getDevices = () => {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        populateOptions(devices);
      }).catch(e => 
        setError(e)
      )
    }
    getDevices();
    navigator.mediaDevices.addEventListener('devicechange', event => {
      getDevices();
    });
    }, []
  );


  // function attachSinkId(element, sinkId) {
  //   // if (typeof element.sinkId !== 'undefined') {
  //     element.setSinkId(sinkId)
  //     .then(() => {
  //       console.log(`Success, audio output device attached: ${sinkId}`);
  //       setSinkIdSuccess(true);
  //     })
  //     .catch(error => {
  //       console.log("ERROR!", error)
  //     })
  //   // } else {
  //   //   console.log("did not work")
  //   // }
  // }

  function populateOptions(devices) {
    const audioIs = [];
    const audioOs = [];
    const videoIs = [];
    devices.forEach(e => {
      console.log(e)
      if (e.kind === "audioinput") {
        audioIs.push(e)
      } else if (e.kind === "audiooutput") {
        audioOs.push(e)
      } else {
        videoIs.push(e);
      }
    })
    // setVideoInputs(videoIs);
    setAudioInputs(audioIs);
    setAudioOutputs(audioOs);
    console.log("here")
  }

  // function handleAttachingSinkId() {
  //   // gets AudioInput
  //   const constraints = { 
  //     audio: { deviceId: audioInputs[0].deviceId },
  //     video: { devideId: videoInputs[0].deviceId}
  //   }
  //   navigator.mediaDevices.getUserMedia(constraints).then(stream => {
  //     window.stream = stream;
  //     const videoElement = document.querySelector('video');
  //     videoElement.srcObject = stream;
  //     console.log(videoElement)
  //     attachSinkId(videoElement, audioOutputs[0].deviceId)
  //   });
  // }

  function connectDevice(...args) {
    // const constraints = {'video': false, 'audio': true};
    navigator.mediaDevices.getUserMedia(args[0])
      .then(stream => {
        const audioElement = document.querySelector('audio');
        console.log(audioElement)
        audioElement.src = stream;
      })
  }

  function chooseDevice(type) {
    if (window.stream) {
      console.log("stream", window.stream)
      window.stream.getTracks().forEach(track => {
        console.log(track)
        track.stop();
      });
    }
    const element = document.getElementById(type);
    if (type === "audioinput") {
      console.log(element.selectedOptions[0].value)
      connectDevice({'video': false, 'audio': {'echoCancellation': true, "deviceId": element.selectedOptions[0].value}});
    } else if (type === "audiooutput") {

    }
  }

  if (error) {
    return (
      <div>
        <header>
          <h1>Walkie Talkie</h1>
          <p>There has been an error: <em>{error.message}</em></p>
        </header>
      </div>
    )
  } else if (audioInputs.length > 0 && audioOutputs.length > 0) {
    if (firstLoad) { 
      console.log("connectinng device for first time")
      connectDevice({'video': false, 'audio': {'deviceId': audioInputs[2] }}) 
      setFirstLoad(false)
    }
    return (
      <div>
        <header>
          <h1>Walkie Talkie</h1>
          <form>
            <label>Audio Input</label>
            <select id="audioinput"onChange={() => chooseDevice("audioinput")}>
              {audioInputs.length > 0 && audioInputs.map(device => 
                <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
              )}
            </select>
            <br/><br/>
            <label>Audio Output</label>
            <select id="audiooutput" onChange={() => chooseDevice("audiooutput")}>
              {audioOutputs.length > 0 && audioOutputs.map(device => 
                <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
              )}
            </select>
          </form>
          <audio id="audio" controls></audio>
        </header>
      </div>
    )
  } else {
    return (
      <div>
        <header>
          <h1>Walkie Talkie</h1>
          <p>Loading...</p>
        </header>
      </div>
    )
  }
}

export default App;
