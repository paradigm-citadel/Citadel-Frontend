import { AUTH } from '@/store/types'

export default ({ store, redirect }) => {
  const isAuthed = store.getters[AUTH.GETTER.IS_AUTHED]

  if (isAuthed) {
    redirect('/currency/overall')
  }
}
