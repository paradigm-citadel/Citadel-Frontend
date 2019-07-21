import { LOCALSTORAGE_TOKEN_KEY } from '@/constants'
import { AUTH, WALLET } from '@/store/types'

export const namespaced = false

export const state = () => ({
  isAuthed: false,
  signin: {
    email: '',
    password: '',
    error: null,
    isLoading: false
  },
  forgot: {
    email: '',
    error: null,
    isLoading: false,
    status: null // 'success' | 'failed'
  },
  registration: {
    email: '',
    password: '',
    error: null,
    isLoading: null
  }
})

export const getters = {
  [AUTH.GETTER.SIGN_IN_ERROR]: state => state.signin.error,
  [AUTH.GETTER.SIGN_IN_FIELDS]: state => ({
    email: state.signin.email,
    password: state.signin.password
  }),
  [AUTH.GETTER.SIGN_IN_IS_LOADING]: state => state.signin.isLoading,
  [AUTH.GETTER.FORGOT_FIELDS]: state => ({
    email: state.forgot.email
  }),
  [AUTH.GETTER.IS_AUTHED]: state => state.isAuthed,
  [AUTH.GETTER.FORGOT_STATUS]: state => state.forgot.status,
  [AUTH.GETTER.FORGOT_ERROR]: state => state.forgot.error,
  [AUTH.GETTER.REGISTRATION_FIELDS]: state => ({
    email: state.signin.email,
    password: state.signin.password
  }),
  [AUTH.GETTER.REGISTRATION_IS_LOADING]: state => state.registration.isLoading,
  [AUTH.GETTER.REGISTRATION_ERROR]: state => state.registration.error
}

export const mutations = {
  [AUTH.MUTATION.RESET_SIGN_IN]: state => {
    state.signin.email = ''
    state.signin.password = ''
    state.signin.error = null
    state.signin.isLoading = false
  },
  [AUTH.MUTATION.RESET_FORGOT]: state => {
    state.forgot.email = ''
    state.forgot.error = null
    state.forgot.isLoading = false
    state.forgot.status = null
  },
  [AUTH.MUTATION.RESET_REGISTRATION]: state => {
    state.registration.email = ''
    state.registration.password = ''
    state.registration.error = null
    state.registration.isLoading = false
  },
  [AUTH.MUTATION.CHANGE_FIELD_SIGN_IN]: (state, { field, value }) => {
    state.signin[field] = value
  },
  [AUTH.MUTATION.SET_LOADING_SIGN_IN]: (state, value) => {
    state.signin.isLoading = value
  },
  [AUTH.MUTATION.SET_ERROR_SIGN_IN]: (state, error) => {
    state.signin.error = error
  },
  [AUTH.MUTATION.SET_IS_AUTHED]: (state, value) => {
    state.isAuthed = value
  },
  [AUTH.MUTATION.CHANGE_FIELD_FORGOT]: (state, { field, value }) => {
    state.forgot[field] = value
  },
  [AUTH.MUTATION.SET_LOADING_FORGOT]: (state, value) => {
    state.forgot.isLoading = value
  },
  [AUTH.MUTATION.SET_ERROR_FORGOT]: (state, value) => {
    state.forgot.error = value
  },
  [AUTH.MUTATION.SET_FORGOT_STATUS]: (state, value) => {
    state.forgot.status = value
  },
  [AUTH.MUTATION.CHANGE_FIELD_REGISTRATION]: (state, { field, value }) => {
    state.registration[field] = value
  },
  [AUTH.MUTATION.SET_LOADING_REGISTRATION]: (state, value) => {
    state.registration.isLoading = value
  },
  [AUTH.MUTATION.SET_ERROR_REGISTRATION]: (state, value) => {
    state.registration.error = value
  }
}

export const actions = {
  async [AUTH.ACTION.SUBMIT_SIGN_IN]({ commit, state, dispatch }) {
    try {
      const { email, password } = state.signin
      commit(AUTH.MUTATION.SET_LOADING_SIGN_IN, true)

      const { token } = await this.$api.login({ username: email, password })

      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token)
      commit(AUTH.MUTATION.SET_IS_AUTHED, true)

      this.$router.push('/currency/overall')
      dispatch(WALLET.ACTION.LOAD_WALLET_LIST)
    } catch (error) {
      console.log(error)
      commit(AUTH.MUTATION.SET_ERROR_SIGN_IN, error.message)
      commit(AUTH.MUTATION.CHANGE_FIELD_SIGN_IN, {
        field: 'password',
        value: ''
      })
    } finally {
      commit(AUTH.MUTATION.SET_LOADING_SIGN_IN, false)
    }
  },
  async [AUTH.ACTION.SUBMIT_PASSWORD_RECOVERY]({ commit, state }) {
    try {
      const { email } = state.forgot
      commit(AUTH.MUTATION.SET_LOADING_FORGOT, true)

      const { status } = await this.$api.restorePassword({ email })

      if (status !== 'success') throw new Error('Something went wrong')

      commit(AUTH.MUTATION.SET_FORGOT_STATUS, 'success')
    } catch (error) {
      console.log(error)
      commit(AUTH.MUTATION.SET_ERROR_FORGOT, error.message)
      commit(AUTH.MUTATION.SET_FORGOT_STATUS, 'failed')
    } finally {
      commit(AUTH.MUTATION.SET_LOADING_FORGOT, false)
    }
  },
  [AUTH.ACTION.LOGOUT]({ commit }) {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
    commit(AUTH.MUTATION.SET_IS_AUTHED, false)
    this.$router.push('/login')
  },
  async [AUTH.ACTION.SUBMIT_REGISTRATION]({ commit, state, dispatch }) {
    try {
      const { email, password } = state.registration

      commit(AUTH.MUTATION.SET_LOADING_REGISTRATION, true)
      await this.$api.registration({ email, password }).then(result => {
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, result.token)
      })
      commit(AUTH.MUTATION.SET_IS_AUTHED, true)

      this.$router.push('/currency/overall')
      dispatch(WALLET.ACTION.LOAD_WALLET_LIST)
    } catch (error) {
      console.log(error)
      commit(AUTH.MUTATION.SET_ERROR_REGISTRATION, error.message)
    } finally {
      commit(AUTH.MUTATION.SET_LOADING_REGISTRATION, false)
    }
  }
}
