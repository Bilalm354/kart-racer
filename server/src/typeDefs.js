import { gql } from 'apollo-server';

export const typeDefs = gql`
type Score {
  name: String
  time: String
}

type Query {
  scores: [Score]
}

type Mutation {
  addScore(name: String!, time: String!): Score!
}
`;