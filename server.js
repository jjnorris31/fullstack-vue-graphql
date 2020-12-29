const { ApolloServer } = require("apollo-server");
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

// connect with mLab
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("DB Connected"))
	.catch((err) => console.error(err))

// create Apollo&/GraphQL server
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		User,
		Post
	}
});

server.listen().then(({url}) => {
	console.log(`Server listening ${url}`)
})