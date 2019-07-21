import { BACKEND_URL, LOCALSTORAGE_TOKEN_KEY } from '@/constants'
import { DeleteAccount } from '@/plugins/api/delete/delete-account'
import { DeleteRemoveWallet } from '@/plugins/api/delete/delete-remove-wallet'
import { GetAccountInfo } from '@/plugins/api/get/get-account-info'
import { GetChartData } from '@/plugins/api/get/get-chart-data'
import { GetChartPreview } from '@/plugins/api/get/get-chart-preview'
import { GetNetworksList } from '@/plugins/api/get/get-networks-list'
import { GetPolls } from '@/plugins/api/get/get-polls'
import { GetRewards } from '@/plugins/api/get/get-rewards'
import { GetTransactionList } from '@/plugins/api/get/get-transaction-list'
import { GetWalletList } from '@/plugins/api/get/get-wallet-list'
import { Network } from '@/plugins/api/network'
import { PostAddNewWallet } from '@/plugins/api/post/post-add-new-wallet'
import { PostLogin } from '@/plugins/api/post/post-login'
import { PostRegistration } from '@/plugins/api/post/post-registration'
import { PostRestore } from '@/plugins/api/post/post-restore'
import { PutAccountInfo } from '@/plugins/api/put/put-account-info'
import { PutChangePassword } from '@/plugins/api/put/put-change-password'
import { AUTH } from '@/store/types'
import axios from 'axios'

export const HTTP_STATUS = {
  UNAUTHORIZED: 401
}

export default (ctx, inject) => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_URL
    // validateStatus: status => status >= 200 && status < 400
  })

  const errorHandler = error => {
    if (error.response) {
      if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
        ctx.store.dispatch(AUTH.ACTION.LOGOUT)
      }
    }
    throw error
  }

  axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
    if (token) config.headers.Authorization = `Token ${token}`
    return config
  }, errorHandler)

  axiosInstance.interceptors.response.use(response => {
    return response.data
  }, errorHandler)

  const network = new Network(axiosInstance)

  const api = {
    getAccountInfo: (params, immediately = false) => network.get(GetAccountInfo, params, immediately),
    getWalletList: (params, immediately = false) => network.get(GetWalletList, params, immediately),
    getNetworksList: (params, immediately = false) => network.get(GetNetworksList, params, immediately),
    getReward: (params, immediately = false) => network.get(GetRewards, params, immediately),
    getChartData: (params, immediately = false) => network.get(GetChartData, params, immediately),
    getChartPreview: (params, immediately = false) => network.get(GetChartPreview, params, immediately),
    getTransactionList: (params, immediately = false) => network.get(GetTransactionList, params, immediately),
    getPolls: (params, immediately = false) => network.get(GetPolls, params, immediately),

    registration: data => network.post(PostRegistration, data),
    login: data => network.post(PostLogin, data),
    restorePassword: data => network.post(PostRestore, data),
    addNewWallet: data => network.post(PostAddNewWallet, data),

    changePassword: data => network.put(PutChangePassword, data),
    changeAccountInfo: data => network.put(PutAccountInfo, data),

    removeWallet: id => network.delete(DeleteRemoveWallet, { id }),
    deleteAccount: () => network.delete(DeleteAccount)
  }
  inject('api', api)
}
