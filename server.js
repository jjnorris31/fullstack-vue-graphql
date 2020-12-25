const { ApolloServer, gql } = require("apollo-server");

const todos = [
	{
		task: 'Wash car',
		completed: false,
	},
	{
		task: 'Clean room',
		completed: false,
	}
];

// schema -> type definitions
const typeDefs = gql`
	type Todo {
		task: String
		completed: Boolean
	}
	
	type Query {
		getTodos: [Todo]
	}
	
	type Mutation {
		addTodo(task: String, completed: Boolean): Todo
	}
	
`;

const resolvers = {
	Query: {
		getTodos: () => todos
	},
	Mutation: {
		addTodo: (_, {task, completed}) => {
			todos.push({task: task, completed: completed});
			return todos[todos.length - 1];
		}
	}
}

const server = new ApolloServer({
	typeDefs, resolvers
});

server.listen().then(({url}) => {
	console.log(`Server listening ${url}`)
})