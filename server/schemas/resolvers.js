const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, { username, userId }) => {
            if (userId) {
                return User.findOne({ userId }).populate('savedBooks');
            } else {
                return User.findOne({ username }).populate('savedBooks');
            }
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (!user) {
                throw new AuthenticationError('No user found with this username or email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { username, authors, description, title, link, image, bookId }) => {
            const saveBookInput = {
                authors: authors,
                description: description,
                bookId: bookId,
                image: image,
                link: link,
                title: title
            }
            return await User.findOneAndUpdate(
                { username: username },
                { $addToSet: { savedBooks: saveBookInput } },
                {
                    new: true,
                    runValidators: true,
                }
            )
        },
        removeBook: async (parent, { username, bookId }) => {
            return await User.findOneAndUpdate(
                { username: username },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;