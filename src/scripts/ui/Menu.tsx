import React, { useEffect, useState } from 'react';
// import 'scores' from './scores';

const play = () => { console.log('play'); };
const pause = () => { console.log('pause'); };
const selectTrack = () => { console.log('selectTrack'); };
const mute = () => { console.log('mute'); };

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const Menu = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [play, setPlayOrPause] = useState(true);
  const [track, setTrack] = useState('small');
  const [mute, setMute] = useState(false);

  // TODO: change something in index.ts that makes the game pause and play 
  useEffect(() => { console.log(`play: ${play}`) }, [play])
  useEffect(() => { console.log(`track: ${track}`) }, [track])
  useEffect(() => { console.log(`mute: ${mute}`) }, [mute])
  return (
    <div>
      <form>
        <button type="button" onClick={() => setPlayOrPause(true)}>Play</button>
        <button type="button" onClick={() => setPlayOrPause(false)}>Pause</button>
        <button type="button" onClick={() => setTrack('small')}>Small Track</button>
        <button type="button" onClick={() => setTrack('large')}>Large Track</button>
        <button type="button" onClick={() => setShowLeaderboard(!showLeaderboard)}>See Leaderboard</button>
        <button type="button" onClick={() => setMute(!mute)}>Mute/ Unmute</button>
      </form>
      {showLeaderboard ? <Leaderboard /> : null}
      <div id="tracks">

      </div>
    </div>
  )
};

default export { Menu }