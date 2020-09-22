import { unmute } from '../index';
import React from 'react';

const play = () => { console.log('play'); };
const pause = () => { console.log('pause'); };
const selectTrack = () => { console.log('selectTrack'); };
const showLeaderboard = () => { console.log('showLeaderboard'); };
const mute = () => { console.log('mute'); };
// TODO: add music - robotunicornattack song.
export const Menu = () => (
  <form>
    <button type="button" onClick={() => play()}>Play</button>
    <button type="button" onClick={() => pause()}>Pause</button>
    <button type="button" onClick={() => selectTrack()}>Select Track</button>
    <button type="button" onClick={() => showLeaderboard()}>See Leaderboard</button>
    <button type="button" onClick={() => unmute()}>Mute/ Unmute</button>
  </form>
);
