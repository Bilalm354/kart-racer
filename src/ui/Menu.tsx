import React, { AudioHTMLAttributes, useEffect, useState } from 'react';
import { scores } from '~data/scores';

const play = () => { console.log('play'); };
const pause = () => { console.log('pause'); };
const selectTrack = () => { console.log('selectTrack'); };
const mute = () => { console.log('mute'); };


import { init, setCameraView, unInit } from '../index';

const x: HTMLAudioElement = document.getElementById("aliensExist")!;

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}

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
  // const [mute, setMute] = useState(false);

  useEffect(() => { console.log(`track: ${track}`) }, [track])
  // useEffect(() => { console.log(`mute: ${mute}`) }, [mute])

  return (
    <div>
      <form>
        <button type="button" onClick={() => init()}>Play</button>
        <button type="button" onClick={() => unInit()}>Pause</button>
        <button type="button" onClick={() => setTrack('small')}>Small Track</button>
        <button type="button" onClick={() => setTrack('large')}>Large Track</button>
        <button type="button" onClick={() => setShowLeaderboard(!showLeaderboard)}>See Leaderboard</button>
        <button type="button" onClick={() => playAudio()}>Play Music</button>
        <button type="button" onClick={() => pauseAudio()}>Pause Music</button>
        <button type="button" onClick={() => setCameraView('top')}>Top Camera</button>
        <button type="button" onClick={() => setCameraView('behindCar')}>Behind Car Camera</button>
      </form>
      {showLeaderboard ? <Leaderboard /> : null}
    </div>
  )
};

default export { Menu }