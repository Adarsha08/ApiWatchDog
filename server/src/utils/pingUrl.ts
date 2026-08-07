import axios from 'axios'

export const pingUrl = async (url: string) => {
  const start = Date.now()
  try {
    const res = await axios.get(url, { timeout: 5000 })
    return { statusCode: res.status, responseMs: Date.now() - start }
  } catch (err: any) {
    return { statusCode: err.response?.status || 0, responseMs: Date.now() - start }
  }
}