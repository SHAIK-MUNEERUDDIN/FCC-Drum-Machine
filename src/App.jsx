import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const drumPads = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  const [volume, setVolume] = useState(0.7);
  const [display, setDisplay] = useState("");
  const [power, setPower] = useState(true);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (power) {
        playSound(event.key.toUpperCase());
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [power, volume]);

  function playSound(selector) {
    if (!power) {
      return;
    }
    const drumPad = drumPads.find((pad) => pad.keyTrigger === selector);
    if (drumPad) {
      const audio = document.getElementById(drumPad.keyTrigger);
      if (audio) {
        audio.volume = volume;
        audio.play();
        setDisplay(drumPad.id);

        audio.parentElement.classList.add("active");
        setTimeout(() => {
          audio.parentElement.classList.remove("active");
        }, 300);
      }
    }
  }

  function handleVolume(event) {
    const newVolume = event.target.value;
    setVolume(newVolume);
  }

  const togglePower = () => {
    setPower((prevPower) => !prevPower);
    setDisplay("");
  };

  return (
    <div id="wrapper">
      <div id="drum-machine">
        <h1 className="heading">DRUM MACHINE</h1>
        <div id="display">
          <div className="drum-pads">
            {drumPads.map((drumPad) => (
              <div
                key={drumPad.keyCode}
                onClick={() => {
                  playSound(drumPad.keyTrigger);
                }}
                className="drum-pad"
                id={drumPad.id}
              >
                {drumPad.keyTrigger}
                <audio
                  src={drumPad.url}
                  className="clip"
                  id={drumPad.keyTrigger}
                ></audio>
              </div>
            ))}
          </div>
          <div className="controls">
            <div className="btn-container">
              <p>POWER</p>
              <div className="btn-box" onClick={togglePower}>
                <div
                  className="box"
                  style={{
                    float: power ? "right" : "left",
                    background: power ? "#1ccf1c" : "red",
                  }}
                ></div>
              </div>
            </div>
            <div className="screen">{display}</div>
            <div className="volume-box">
              <label htmlFor="volume">
                Volume: {Math.round(volume * 100)}%
              </label>
              <input
                id="volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                className="slider"
                onChange={handleVolume}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
