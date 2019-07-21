import { LOCALSTORAGE_TOKEN_KEY } from '@/constants'
import { AUTH, PROFILE, WALLET } from '@/store/types'

let IS_CHECKED = false

export default async ({ store, app }) => {
  if (IS_CHECKED) return

  const tokenInLocalStorage = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
  const isAuthed = store.getters[AUTH.GETTER.IS_AUTHED]

  if (tokenInLocalStorage && !isAuthed) {
    try {
      await Promise.all([
        store.dispatch(PROFILE.ACTION.LOAD_PROFILE_DATA),
        store.dispatch(WALLET.ACTION.LOAD_WALLET_LIST)
      ])
      store.commit(AUTH.MUTATION.SET_IS_AUTHED, true)
    } catch (err) {
      localStorage.clear()
      app.router.push({ path: '/login' })
    }
  } else {
    app.router.push({ path: '/login' })
  }
  IS_CHECKED = true
}
