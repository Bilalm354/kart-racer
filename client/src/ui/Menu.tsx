// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { world } from '~/World';
import { Leaderboard } from '~/ui/components/Leaderboard';
import { AddScore } from '~/ui/components/AddScore';
import { Touchpad } from '~/ui/components/TouchPad';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export const Menu = () => {
  const audioElement = document.getElementById('aliensExist')! as HTMLAudioElement;

  const isMobile = true;
  // TODO: hide add score after submitting
  // TODO: deploy server in continuous deployment
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAddScore, setShowAddScore] = useState(false);
  const [showTouchpad, setShowTouchpad] = useState(isMobile);

  return (
    <ApolloProvider client={client}>
      <Container fluid className="p-0">
        <form>
          <button type="button" onClick={() => world.setMode('play')}>Play Mode</button>
          <button type="button" onClick={() => world.setMode('create')}>Create Mode (click while mouse is on the ground)</button>
          {true ? undefined : (<button type="button" onClick={() => alert('Paused!')}>Pause</button>)}
          <button type="button" onClick={() => world.setSmallTrack()}>Small Track</button>
          <button type="button" onClick={() => world.setBigTrack()}>Large Track</button>
          <button type="button" onClick={() => setShowLeaderboard(!showLeaderboard)}>See Leaderboard</button>
          <button type="button" onClick={() => setShowAddScore(!showAddScore)}>Add Score</button>
          <button type="button" onClick={() => setShowTouchpad(!showTouchpad)}>Show/ Hide Touchpad</button>
          <button type="button" onClick={() => audioElement.play()}>Play Music</button>
          <button type="button" onClick={() => audioElement.pause()}>Pause Music</button>
          <button type="button" onClick={() => world.setCameraView('top')}>Top Camera</button>
          <button type="button" onClick={() => world.setCameraView('behindCar')}>Behind Car Camera</button>
          <button type="button" onClick={() => world.car.setColor('red')}>Red Car</button>
          <button type="button" onClick={() => world.car.setColor('green')}>Green Car</button>
          <button type="button" onClick={() => world.car.setColor('blue')}>Blue Car</button>
        </form>
        {showLeaderboard ? <Leaderboard /> : undefined}
        {showAddScore ? <AddScore /> : undefined}
        <Container fluid className="fixed-bottom text-center">
          <Row>
            Speed:
            {world.car.getHorizontalSpeed()}
          </Row>
          <Row>
            Time:
            {Math.round(world.clock.getElapsedTime() * 100) / 100}
          </Row>
          <Row>
            {showTouchpad ? <Touchpad /> : undefined}
          </Row>
          <ProgressBar variant="danger" now={world.car.health} label="Health" />
          <ProgressBar variant="info" now={world.car.turbo} label="Turbo" />
        </Container>
      </Container>
    </ApolloProvider>
  );
};
