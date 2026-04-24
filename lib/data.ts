import fs from 'fs'
import path from 'path'

// Redis client — lazy-initialized only when env vars are present
let _redis: import('@upstash/redis').Redis | null = null

async function getRedis() {
  if (_redis) return _redis
  const url   = process.env.UPSTASH_REDIS_REST_URL   || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  if (url && token) {
    const { Redis } = await import('@upstash/redis')
    _redis = new Redis({ url, token })
    return _redis
  }
  return null
}

function filePath(name: string) {
  return path.join(process.cwd(), 'data', `${name}.json`)
}

export async function readData<T>(name: string): Promise<T[]> {
  const redis = await getRedis()
  if (redis) {
    const val = await redis.get<T[]>(`cs:${name}`)
    return val ?? []
  }
  try {
    return JSON.parse(fs.readFileSync(filePath(name), 'utf-8'))
  } catch {
    return []
  }
}

export async function writeData<T>(name: string, data: T[]): Promise<void> {
  const redis = await getRedis()
  if (redis) {
    await redis.set(`cs:${name}`, data)
    return
  }
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2))
}

export async function readOne<T>(name: string, fallback: T): Promise<T> {
  const redis = await getRedis()
  if (redis) {
    const val = await redis.get<T>(`cs:${name}`)
    return val ?? fallback
  }
  try {
    return JSON.parse(fs.readFileSync(filePath(name), 'utf-8'))
  } catch {
    return fallback
  }
}

export async function writeOne<T>(name: string, data: T): Promise<void> {
  const redis = await getRedis()
  if (redis) {
    await redis.set(`cs:${name}`, data)
    return
  }
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2))
}
