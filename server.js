const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require('mongoose');

// import environment variables
require('dotenv').config({path: '.env'});
const User = require('./models/User');
const Post = require('./models/Post');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');

// connect with mLab
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("DB Connected"))
	.catch((err) => console.error(err));

const getUser = async token => {
	if (token) {
		try {
			return await jwt.verify(token, process.env.SECRET);
		} catch (e) {
			throw new AuthenticationError('Your session was ended. Please sign in again.')
		}
	}
}

// create Apollo&/GraphQL server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	formatError: (error) => {
		return {name: error.name, message: error.message}
	},
	context: async ({req}) => {
		const token = req.headers["authorization"];
		return {User, Post, currentUser: await getUser(token)}
	}
});

server.listen().then(({url}) => {
	console.log(`Server listening ${url}`)
})