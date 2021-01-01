import { gql } from 'apollo-boost';

// post queries
export const GET_POSTS = gql`
	query {
			getPosts {
					_id
					title
					imageUrl
			}
	}
`

// user mutations
export const SIGN_IN = gql`
	mutation ($username: String!, $password: String!) {
			signIn(username: $username, password: $password) {
					token
			}
	}
`

export const SIGN_UP = gql`
	mutation ($username: String!, $email: String!, $password: String!) {
			signUp(username: $username, email: $email, password: $password) {
					token
			}
	}
`