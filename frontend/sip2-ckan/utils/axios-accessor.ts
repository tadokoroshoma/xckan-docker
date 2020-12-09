// https://typescript.nuxtjs.org/ja/cookbook/store.html#%E3%82%AF%E3%83%A9%E3%82%B9%E3%83%99%E3%83%BC%E3%82%B9
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { stringify } from 'querystring'

let $axios: NuxtAxiosInstance

export function initializeAxios(axios: NuxtAxiosInstance) {
    $axios = axios
    //$axios.setBaseURL('/api')
    $axios.defaults.paramsSerializer = params => stringify(params)
}

export { $axios }