// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface Score {
  name: string
  time: string
}

interface ScoreData {
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

  return data?.scores.map(({ name, time }) => (
    <div key={name}>
      <p>
        {`${name} : ${time}`}
      </p>
    </div>
  ));
};
