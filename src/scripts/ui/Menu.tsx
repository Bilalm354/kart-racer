import React from 'react';

const play = () => { console.log('play'); };
const pause = () => { console.log('pause'); };
const selectTrack = () => { console.log('selectTrack'); };
const showLeaderboard = () => { console.log('showLeaderboard')};
const mute = () => { console.log('mute'); };

const scores = [
  {name: "bilal", time: "00:00:15"},
  {name: "not bilal", time: "00:00:16"},
]

const Leaderboard = scores.map((score) => 
  <h1 key ={score.name}>{score.name} : {score.time}</h1>
);



export const Menu = () => (
  <div>
    <form>
      <button type="button" onClick={() => play()}>Play</button>
      <button type="button" onClick={() => pause()}>Pause</button>
      <button type="button" onClick={() => selectTrack()}>Select Track</button>
      <button type="button" onClick={() => showLeaderboard()}>See Leaderboard</button>
      <button type="button" onClick={() => mute()}>Mute/ Unmute</button>
    </form>
    {Leaderboard}
  </div>
);
