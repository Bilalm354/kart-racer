// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import {
  Container, Nav, Navbar, NavDropdown, Row,
} from 'react-bootstrap';
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
  // TODO: stop stats.js from getting in the way of the first nav bar option
  return (
    <ApolloProvider client={client}>
      <Container fluid className="p-0">
        <Navbar bg="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavDropdown title="Mode" id="collasible-nav-dropdown">
              <Nav.Link onClick={() => world.setMode('play')}>Play</Nav.Link>
              <Nav.Link onClick={() => world.setMode('create')}>Create (click while mouse is on the ground)</Nav.Link>
            </NavDropdown>
            <NavDropdown title="Track" id="collasible-nav-dropdown">
              <Nav.Link onClick={() => world.setSmallTrack()}>Small Track</Nav.Link>
              <Nav.Link onClick={() => world.setBigTrack()}>Large Track</Nav.Link>
            </NavDropdown>
            <NavDropdown title="Leaderboard" id="collasible-nav-dropdown">
              <Nav.Link onClick={() => setShowLeaderboard(!showLeaderboard)}>See Leaderboard</Nav.Link>
              <Nav.Link onClick={() => setShowAddScore(!showAddScore)}>Add Score</Nav.Link>
            </NavDropdown>
            <NavDropdown title="Music" id="collasible-nav-dropdown">
              <Nav.Link onClick={() => audioElement.play()}>Play Music</Nav.Link>
              <Nav.Link onClick={() => audioElement.pause()}>Pause Music</Nav.Link>
            </NavDropdown>
            <NavDropdown title="Camera" id="collasible-nav-dropdown">
              <Nav.Link onClick={() => world.setCameraView('top')}>Top Camera</Nav.Link>
              <Nav.Link onClick={() => world.setCameraView('behindCar')}>Behind Car Camera</Nav.Link>
            </NavDropdown>
            <NavDropdown title="Car Colour" id="collasible-nav-dropdown">
              <Nav.Link onClick={() => world.car.setColor('red')}>Red</Nav.Link>
              <Nav.Link onClick={() => world.car.setColor('green')}>Green</Nav.Link>
              <Nav.Link onClick={() => world.car.setColor('blue')}>Blue</Nav.Link>
            </NavDropdown>
            <Nav.Link onClick={() => setShowTouchpad(!showTouchpad)}>Show/ Hide Touchpad</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
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
