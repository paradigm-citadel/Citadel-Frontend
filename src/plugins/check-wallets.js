import { AUTH, WALLET } from '@/store/types'

const INTERVAL_IN_SECONDS = 30 * 1000 // 30 sec

export default ctx => {
  setInterval(() => {
    if (!ctx.store.getters[AUTH.GETTER.IS_AUTHED]) return
    ctx.store.dispatch(WALLET.ACTION.LOAD_WALLET_LIST)
  }, INTERVAL_IN_SECONDS)
}
