import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { useEffect, useState } from 'react'

const endpoint = 'https://notes.vladpoienariu.xyz/api'
// const endpoint = 'http://192.168.1.169:1605/api'

const basic_auth = {
    username: "vlad",
    password: "duster123"
}

export default function useFetch(options: {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    url: string,
    data: object | never,
    headers: AxiosRequestHeaders | {}
} | null = null) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (options) {
            const updatedOptions: AxiosRequestConfig = {
                ...options,
                url: endpoint + options.url,
                headers: options.headers,
                auth: basic_auth,
                withCredentials: false,
            }

            setIsLoading(true)

            axios(updatedOptions).then((resp) => {
                const data = resp.data
                setData(data)
                setIsLoading(false)
            })
                .catch((err) => {
                    setError(`Error: ${err}`)
                })
                .finally(() => setIsLoading(false))
        }

    }, [])


    function call(options: {
        method: 'POST' | 'GET' | 'PUT' | 'DELETE',
        url: string,
        data: never | object,
        headers: AxiosRequestHeaders | {}
    }) {
        const updatedOptions: AxiosRequestConfig = {
            ...options,
            url: endpoint + options.url,
            headers: options.headers,
            auth: basic_auth,
            withCredentials: false,
        }

        setIsLoading(true)
        options.url = endpoint + options.url

        axios(updatedOptions).then((resp) => {
            const data = resp.data
            setData(data)
            setIsLoading(false)
        })
            .catch((err) => {
                setError(`Error: ${err}`)
            })
            .finally(() => setIsLoading(false))
    }


    return { data, isLoading, error, call }
}