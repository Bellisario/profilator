import type { UsersAPI } from '#types/github.ts'
import type { Context } from 'hono'
import { accepts } from 'hono/accepts'
import profile from '../assets/profile.svg'

export function getScale(rawScale?: string): number {
    if (rawScale === undefined) return 1

    const scale = Number(rawScale)
    if (Number.isNaN(scale)) return 1

    // clamp scale between 0.5 and 5
    return Math.max(0.5, Math.min(scale, 5))
}

// GitHub API blocks Cloudflare Wrangler if you do not set a custom user agent (?!)
const DEFAULT_HEADERS = {
    'User-Agent': 'curl/7.54.1',
}
export async function getUserName(
    username: string,
): Promise<{ name: string; err: boolean }> {
    try {
        const req = await fetch(`https://api.github.com/users/${username}`, {
            headers: process.env.GITHUB_TOKEN
                ? {
                      Authorization: `token ${process.env.GITHUB_TOKEN}`,
                      ...DEFAULT_HEADERS,
                  }
                : {
                      ...DEFAULT_HEADERS,
                  },
        })
        const res = (await req.json()) as UsersAPI
        return {
            err: false,
            name: res.name || '',
        }
    } catch {
        return {
            err: true,
            name: '',
        }
    }
}

export class TemplateReplacer {
    private template: string

    constructor(template: string) {
        this.template = template
    }
    replace(key: string, value: string) {
        this.template = this.template.replaceAll(`{{${key}}}`, value)
    }
    get value() {
        return this.template
    }
}

interface ProfileCreator {
    username: string
    name: string
    image: string
    scale: number
}
export function createProfile(template: string, data: ProfileCreator) {
    const replacer = new TemplateReplacer(template)
    const defaultHeight = 200
    const defaultWidth = 150
    const scale = data.scale

    // @ts-ignore we don't want to include it in our replaced values
    delete data.scale

    const height = defaultHeight * scale
    const width = defaultWidth * scale

    Object.keys(data).forEach((key: string) => {
        //@ts-ignore: Cannot data[key] with key of type string
        replacer.replace(key, data[key])
    })
    replacer.replace('height', height.toString())
    replacer.replace('width', width.toString())
    return replacer.value
}

export async function getImageBase64(
    username: string,
    scale: number,
): Promise<string | undefined> {
    try {
        const req = await fetch(
            `https://github.com/${username}.png?size=${101 * Math.min(scale, 3)}`,
        )
        if (!req.ok) return undefined
        const buf = await req.arrayBuffer()
        return `data:image/png;base64,${Buffer.from(buf).toString('base64')}`
    } catch {
        return undefined
    }
}

export function isGitHubCamoBot(c: Context): boolean {
    return c.req.header('User-Agent')?.includes('GitHub-Camo') ?? false
}
export function acceptsHTML(c: Context): boolean {
    const accept = accepts(c, {
        header: 'Accept',
        supports: ['text/html', 'image/*'],
        default: 'text/html',
    })
    return accept === 'text/html'
}

const BLANK_GIF =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
const PROFILE_IMG = `data:image/svg+xml;base64,${Buffer.from(profile).toString('base64')}`

export const DUMMY_PROFILES_DATA: { [key: string]: ProfileCreator } = {
    '@profilator': {
        username: 'Profilator',
        name: 'Snap GitHub profiles',
        image: PROFILE_IMG,
        scale: 1,
    },
    '@blank': {
        username: '',
        name: '',
        image: BLANK_GIF,
        scale: 1,
    },
    '@404': {
        username: 'Not Found',
        name: 'GitHub user not found.',
        image: BLANK_GIF,
        scale: 1,
    },
}
