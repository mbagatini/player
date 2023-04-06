import axios from 'axios'
import { APIUrl } from '../env'

export const api = axios.create({
    baseURL: APIUrl,
})
