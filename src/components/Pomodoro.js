import React, { useState } from 'react'
import Up from './../assetss/up.svg'
import Down from './../assetss/down.svg'

function Pomodoro() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timingType, setTimingType] = useState('SESSION');
  const [timeLeft, setTimeLeft] = useState(1500);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1)
    }
  }, 1000)

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  }
  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)
    }
  }
  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  }

  const timeFormater = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formatedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formatedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formatedMinutes}:${formatedSeconds}`;
  }

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play)
    // if(play){
    //   setPlay(false)
    // }else{
    //   setPlay(true)
    // }
  }

  const resetTimer = () => {
    const audio = document.getElementById('beep');
    if (!timeLeft && timingType === "SESSION") {
      setTimeLeft(breakLength * 60)
      setTimingType("BREAK")
      audio.play()
    }
    if (!timeLeft && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60)
      setTimingType("SESSION")
      audio.pause()
      audio.currentTime = 0
    }
  }

  const clock = () => {
    if (play) {
      // timeout
      resetTimer()
    } else {
      clearTimeout(timeout)
    }
  }

  const handleReset = () => {
    clearTimeout(timeout)
    setPlay(false)
    setTimeLeft(1500)
    setBreakLength(5)
    setSessionLength(25)
    setTimingType("SESSION")
    const audio = document.getElementById('beep')
    audio.pause()
    audio.currentTime = 0
  }

  React.useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])

  const title = timingType === 'SESSION' ? "Session" : 'Break';

  return (
    <div className="App">
      <h2>POMODORO & TO DO LIST</h2>

      <div className='breakSession'>
        <h3 id='break-label'>Break Length</h3>
        <div className='buttons'>
          <button disabled={play} onClick={handleBreakIncrease}
            id='break-increment'>
            <img src={Up} alt="SVG as an image" />
          </button>

          <strong id='break-length'>{breakLength}</strong>

          <button disabled={play} onClick={handleBreakDecrease}
            id='break-decrement'>
            <img src={Down} alt="SVG as an image" />
          </button>
        </div>
      </div>

      <div className='sessionLength'>
        <h3 id='session-label'>Session Length</h3>
        <div className='buttons'>
          <button disabled={play} onClick={handleSessionIncrease}
            id='session-increment'>
            <img src={Up} />
          </button>

          <strong id='session-length'>{sessionLength}</strong>

          <button disabled={play} onClick={handleSessionDecrease}
            id='session-decrement'>
            <img src={Down} alt="SVG as an image" />
          </button>
        </div>
      </div>

      <div className='timerWrapper'>
        <h2 id='timer-label'>{title}</h2>
        <div className='timer'>
          <h2 id='time-left'>{timeFormater()}</h2>
        </div>
        <div className='buttonTimer'>
          <button onClick={handlePlay} id='start_stop'>Start/Stop</button>
          <button onClick={handleReset} id='reset'>Reset</button>
        </div>
      </div>
      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  );
}

export default Pomodoro