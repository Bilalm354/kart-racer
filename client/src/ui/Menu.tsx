/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import {
  ApolloClient, InMemoryCache, ApolloProvider,
} from '@apollo/client';
import { world } from '../index';
import { Leaderboard } from './Leaderboard';
import { AddScore } from './AddScore';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export const Menu = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAddScore, setShowAddScore] = useState(false);
  const audioElement = document.getElementById('aliensExist')! as HTMLAudioElement;
  return (
    <ApolloProvider client={client}>
      <Container fluid className="p-0">
        <form>
          <button type="button" onClick={() => world.init()}>Play</button>
          <button type="button" onClick={() => world.removeCar()}>Pause</button>
          <button type="button" onClick={() => world.setSmallTrack()}>Small Track</button>
          <button type="button" onClick={() => world.setBigTrack()}>Large Track</button>
          <button type="button" onClick={() => setShowLeaderboard(!showLeaderboard)}>See Leaderboard</button>
          <button type="button" onClick={() => setShowAddScore(!showAddScore)}>Add Score</button>
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
        {showAddScore ? <AddScore /> : null}
        <Container className="fixed-bottom">
          <ProgressBar variant="danger" now={world.car.health} label="Health" />
          <ProgressBar variant="info" now={world.car.turbo} label="Turbo" />
        </Container>
      </Container>
    </ApolloProvider>
  );
};
