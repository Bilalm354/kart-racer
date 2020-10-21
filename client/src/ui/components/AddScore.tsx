// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Score } from './Leaderboard';

const ADD_SCORE = gql`
  mutation addScore($name:String!, $time:String!){
    addScore(name: $name, time: $time){
      name
      time
    }
  }
`;

export function AddScore() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [addScore, { error, data }] = useMutation<{ addScore: Score },
  { name: string, time: string }>(ADD_SCORE, { variables: { name, time } });

  return (
    <div>
      <h3>Add a Score</h3>
      {error ? (
        <p>
          Oh no!
          {' '}
          {error.message}
        </p>
      ) : null}
      {data && data.addScore ? <p>Saved!</p> : null}
      <form>
        <p>
          <label>Name</label>
          <input
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          <label>Time</label>
          <input
            name="time"
            onChange={(e) => setTime(e.target.value)}
          />
        </p>
        <button type="button" onClick={() => name && time && addScore()}>
          Add
        </button>
      </form>
    </div>
  );
}
