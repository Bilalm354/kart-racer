import React from 'react';
import { useQuery, gql } from '@apollo/client';

export interface Score {
  name: string
  time: string
}

export interface ScoreData {
  scores: Score[]
}

const SCORES = gql`
  query getScores{
    scores {
      name
      time
    }
  }
`;

export const Leaderboard = () => {
  const { loading, error, data } = useQuery<ScoreData>(SCORES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
  <div id="leaderboard">
    {data?.scores.map(({ name, time }) => (
      <div key={name}>
        <p>
          {`${name} : ${time}`}
        </p>
      </div>
    ))}
  </div>
  )
} ;
