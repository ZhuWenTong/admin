import {postRequest} from '@/utils/request'
import {TEST} from './api'

export async function requestTest (params) {
    return postRequest(TEST, params)
}