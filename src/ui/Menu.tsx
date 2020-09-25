import React, { useEffect, useState } from 'react';
// import 'scores' from './scores';

const play = () => { console.log('play'); };
const pause = () => { console.log('pause'); };
const selectTrack = () => { console.log('selectTrack'); };
const mute = () => { console.log('mute'); };


import { init, unInit } from '../index';

interface Score {
  name: string,
  time: string
}

const scores: Score[] = [
  { name: 'bilal', time: '00:00:15' },
  { name: 'not bilal', time: '00:00:16' },
];

const Leaderboard = () => {
  return (
    <div>
      <h1>Best Times</h1>
      {scores.map(({ name, time }) => (<h2 key={name}>{name}{' '}:{' '}{time}</h2>))}
    </div>
  )
};

const Menu = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [track, setTrack] = useState('small');
  const [mute, setMute] = useState(false);

  // TODO: change something in index.ts that makes the game pause and play 
  useEffect(() => { console.log(`track: ${track}`) }, [track])
  useEffect(() => { console.log(`mute: ${mute}`) }, [mute])
  return (
    <div>
      <form>
        <button type="button" onClick={() => init()}>Play</button>
        <button type="button" onClick={() => unInit()}>Pause</button>
        <button type="button" onClick={() => setTrack('small')}>Small Track</button>
        <button type="button" onClick={() => setTrack('large')}>Large Track</button>
        <button type="button" onClick={() => setShowLeaderboard(!showLeaderboard)}>See Leaderboard</button>
        <button type="button" onClick={() => setMute(!mute)}>Mute/ Unmute</button>
        <button type="button" onClick={() => console.log('change camera')}>Change Camera</button>
      </form>
      {showLeaderboard ? <Leaderboard /> : null}
      <div id="tracks">

      </div>
    </div>
  )
};

default export { Menu }