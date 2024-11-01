import { useApolloClient } from '@nuxtjs/apollo'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      token
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
`

export const useAuth = () => {
  const apolloClient = useApolloClient().default
  const user = useState('user', () => null)
  const error = useState('authError', () => null)
  const loading = useState('authLoading', () => false)

  const signup = async (signupData) => {
    loading.value = true
    try {
      const { data } = await apolloClient.mutate({
        mutation: SIGNUP_MUTATION,
        variables: { data: signupData },
      })
      localStorage.setItem('token', data.signup.token)
      user.value = data.signup.user
      error.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const login = async (loginData) => {
    loading.value = true
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { data: loginData },
      })
      localStorage.setItem('token', data.login.token)
      user.value = data.login.user
      error.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    user.value = null
  }

  return {
    user,
    loading,
    error,
    signup,
    login,
    logout,
  }
}
