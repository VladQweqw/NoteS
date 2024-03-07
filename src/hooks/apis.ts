import axios from "axios"
import { endpoint } from "./useApi"

export async function callApi(options: {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    url: string,
    data: any,
    headers: {}
}) {
    options.url = endpoint + options.url    
    return axios(options)
    .then((resp) => {
        if(resp.status >= 200 && resp.status < 300) {                        
            return resp.data
        }else {
            return `${resp.status}: ${resp.statusText}`
        }
    })
    .catch((err) => {
        return err
    })

}
