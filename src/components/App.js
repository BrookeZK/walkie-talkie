import { useEffect, useState } from "react";

function App() {
  const [audioInputs, setAudioInputs] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);
  const [videoInputs, setVideoInputs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDevices();
    navigator.mediaDevices.addEventListener('devicechange', event => {
      getDevices();
    });
    }, []
  );

  function getDevices() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      devices.forEach(e => console.log(e));
      populateOptions(devices);
    }).catch(e => 
      setError(e)
    )
  }

  function populateOptions(devices) {
    const audioInputs = [];
    const audioOutputs = [];
    const videoInputs = [];
    devices.forEach(e => {
      console.log(e)
      if (e.kind === "audioinput") {
        audioInputs.push(e)
      } else if (e.kind === "audiooutput") {
        audioOutputs.push(e)
      } else {
        videoInputs.push(e);
      }
    })
    setVideoInputs(videoInputs);
    setAudioInputs(audioInputs);
    setAudioOutputs(audioOutputs);
  }

  function chooseDevice(type) {
    // to do
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
          <video id="video" playsInline autoPlay></video>
        </header>
      </div>
    );
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
