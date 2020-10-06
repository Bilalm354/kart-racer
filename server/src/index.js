const { ApolloServer, gql } = require('apollo-server');
import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

const typeDefs = gql`
  type Score {
    name: String
    time: String
  }

  type Query {
    scores: [Score]
  }

#   type Mutation {
#       addScore(name: String, time: String): Score
#   } 
`;

const scores = [
    { name: 'bilal', time: '00:00:15' },
    { name: 'not bilal', time: '00:00:16' },
];

const resolvers = {
    Query: {
        scores: () => scores,
    },
    // Mutation: {
    //     addScore: () => addScore,
    // }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
