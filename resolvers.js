module.exports = {
	Query: {
		getPosts: async (_, args, {Post}) => {
			// population is the process of automatically replacing the specified
			// path in the document with documents from other collections
			return await Post.find({}).sort({createdAt: 'desc'}).populate({
				path: 'createdBy',
				model: 'User'
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
			return await new User({
				username,
				email,
				password
			}).save();
		}
	}
}