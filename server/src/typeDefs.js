import { gql } from 'apollo-server';

export const typeDefs = gql`
type Score {
  name: String
  time: String
}

type Query {
  scores: [Score]
}

type Cat {
  id: ID!
  name: String!
}

type Mutation {
  createCat(name: String!): Cat!
}
`;