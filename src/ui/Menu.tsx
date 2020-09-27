/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { scores } from '~data/scores';

import {
  init, setBigTrack, setCameraView, setSmallTrack, unInit,
} from '../index';

const Leaderboard = () => (
  <div>
    <h1>Best Times</h1>
    {scores.map(({ name, time }) => (
      <h2 key={name}>
        {name}
        {' '}
        :
        {' '}
        {time}
      </h2>
    ))}
  </div>
);

export const Menu = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const audioElement = document.getElementById('aliensExist')! as HTMLAudioElement;
  return (
    <div>
      <form>
        <button type="button" onClick={() => init()}>Play</button>
        <button type="button" onClick={() => unInit()}>Pause</button>
        <button type="button" onClick={() => setSmallTrack()}>Small Track</button>
        <button type="button" onClick={() => setBigTrack()}>Large Track</button>
        <button type="button" onClick={() => setShowLeaderboard(!showLeaderboard)}>See Leaderboard</button>
        <button
          type="button"
          onClick={() => audioElement.play()}
        >
          Play Music
        </button>
        <button type="button" onClick={() => audioElement.pause()}>Pause Music</button>
        <button type="button" onClick={() => setCameraView('top')}>Top Camera</button>
        <button type="button" onClick={() => setCameraView('behindCar')}>Behind Car Camera</button>
      </form>
      {showLeaderboard ? <Leaderboard /> : null}
    </div>
  );
};
