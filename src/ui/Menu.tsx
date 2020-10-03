/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import { scores } from '../data/scores';
import { world } from '../index';

const Leaderboard = () => (
  <div>
    <h1>Best Times</h1>
    {scores.map(({ name, time }) => (
      <h2 key={name}>
        {name}
        :
        {time}
      </h2>
    ))}
  </div>
);

export const Menu = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const audioElement = document.getElementById('aliensExist')! as HTMLAudioElement;
  return (
    <Container fluid className="p-0">
      <form>
        <button type="button" onClick={() => world.init()}>Play</button>
        <button type="button" onClick={() => world.uninit()}>Pause</button>
        <button type="button" onClick={() => world.setSmallTrack()}>Small Track</button>
        <button type="button" onClick={() => world.setBigTrack()}>Large Track</button>
        <button type="button" onClick={() => setShowLeaderboard(!showLeaderboard)}>See Leaderboard</button>
        <button
          type="button"
          onClick={() => audioElement.play()}
        >
          Play Music
        </button>
        <button type="button" onClick={() => audioElement.pause()}>Pause Music</button>
        <button type="button" onClick={() => world.setCameraView('top')}>Top Camera</button>
        <button type="button" onClick={() => world.setCameraView('behindCar')}>Behind Car Camera</button>
        <button type="button" onClick={() => world.car.setColor('red')}>Red Car</button>
        <button type="button" onClick={() => world.car.setColor('green')}>Green Car</button>
        <button type="button" onClick={() => world.car.setColor('blue')}>Blue Car</button>
      </form>
      {showLeaderboard ? <Leaderboard /> : null}
      <Container className="fixed-bottom">
        <ProgressBar variant="danger" now={world.car.health} label="Health" />
        <ProgressBar variant="info" now={world.car.turbo} label="Turbo" />
      </Container>
    </Container>
  );
};
