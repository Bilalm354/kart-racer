import { Score } from "./models/Score";

export const resolvers = {
    Query: {
        scores: () => Score.find()
    },
    
    Mutation: {
        addScore: async (_, { name, time }) => {
            const newScore = new Score({ name, time });
            await newScore.save();
            return newScore;
        }
    }
};