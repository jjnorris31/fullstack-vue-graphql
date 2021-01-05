const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
	const {username, email} = user;
	return jwt.sign({username, email}, secret, {expiresIn});
}

module.exports = {
	Query: {
		getPosts: async (_, args, {Post}) => {
			// population is the process of automatically replacing the specified
			// path in the document with documents from other collections
			return await Post.find({}).sort({createdAt: 'desc'}).populate({
				path: 'createdBy',
				model: 'User'
			});
		},
		getCurrentUser: async (_, args, {User, currentUser}) => {
			if (!currentUser) {
				return null;
			}

			return await User.findOne({username: currentUser.username}).populate({
				path: 'favorites',
				model: 'Post'
			});
		}
	},
	Mutation: {
		addPost: async (
			_,
			{title, imageUrl, categories, description, creatorId},
			{Post}) => {
			return await new Post({
				title,
				imageUrl,
				categories,
				description,
				createdBy: creatorId
			}).save();
		},
		signUp: async (_, {username, email, password}, {User}) => {
			const user = await User.findOne({username: username});
			if (user) {
				throw new Error('User already exist');
			}
			const newUser = await new User({
				username,
				email,
				password,
			}).save();
			return {token: createToken(newUser, process.env.SECRET, "1hr")}
		},
		signIn: async (_, {username, password}, {User}) => {
			const user = await User.findOne({username});
			if (!user) throw new Error("User not found");
			// comparing password
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) throw new Error("Invalid password");
			return {token: createToken(user, process.env.SECRET, "1hr")}
		},
	}
}