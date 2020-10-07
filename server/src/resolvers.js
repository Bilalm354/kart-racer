export const resolvers = {
    Query: {
        hello: () => "hi",
    },
    Mutation: {
        createCat: (_, { name }) => {
            const kitty = new Cat({ name });
            kitty.save();
        }
    }
};

