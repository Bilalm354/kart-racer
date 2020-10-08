// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const SCORES = gql`
  query getScores{
    scores {
      name
      time
    }
  }
`;

export const Leaderboard = () => {
  const { loading, error, data } = useQuery(SCORES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return data.scores.map(({ name, time }) => (
    <div key={name}>
      <p>
        {name}
        {' '}
        :
        {' '}
        {time}
      </p>
    </div>
  ));
};
