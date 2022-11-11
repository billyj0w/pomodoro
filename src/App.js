import './App.css';
import React from 'react'
import ToDo from './components/ToDo';
import Pomodoro from './components/Pomodoro';


function App() {
  return (
    <div className='App'>
      <Pomodoro />
      <ToDo />
    </div>
  );
}

export default App;
