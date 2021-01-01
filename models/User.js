const mongoose = require('mongoose');
const md5 = require('md5');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	avatar: {
		type: String
	},
	joinDate: {
		type: Date,
		default: Date.now()
	},
	favorites: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
		ref: 'Post'
	}
})

// create and add avatar to user
UserSchema.pre('save', function (next)  {
	this.avatar = `http://gravatar.com/avatar/${this.username}?d=identicon`
	next();
})

// hash password so it can't be seen
UserSchema.pre('save', function (next)  {
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10,  (err, salt) =>  {
		// an error was happened, mongoose not execute middleware or the hooked function
		if (err) return next(err);
		bcrypt.hash(this.password, salt, (err, hash) => {
			// an error was happened, mongoose not execute middleware or the hooked function
			if (err) return next(err)
			this.password = hash;
			next();
		})
	})
})

module.exports = mongoose.model('User', UserSchema);