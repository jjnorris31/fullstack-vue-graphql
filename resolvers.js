module.exports = {
	Mutation: {
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