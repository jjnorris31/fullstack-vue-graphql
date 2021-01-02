import store from './store';

export default (to, from, next) => {
	if (!store.getters.USER) {
		next({
			path: '/signIn'
		})
	} else {
		next();
	}
}