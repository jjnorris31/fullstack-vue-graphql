const { ApolloServer, gql } = require("apollo-server");
const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});
const User = require('./models/User');
const Post = require('./models/Post');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("DB Connected"))
	.catch((err) => console.error(err))

// schema -> type definitions
const typeDefs = gql`
	type Todo {
		task: String
		completed: Boolean
	}
	
	type Query {
		getTodos: [String]
	}
`;

const server = new ApolloServer({
	typeDefs,
	context: {
		User,
		Post
	}
});

server.listen().then(({url}) => {
	console.log(`Server listening ${url}`)
})