import { Hono } from 'hono'
import * as utils from '#utils'
import template from '../assets/template.svg'
import { cache } from 'hono/cache'

const DEBUG = process.env.DEBUG === 'true'
if (DEBUG) console.log('INFO: running in debug mode')

const app = new Hono()
const api = app.basePath('/api/v1')

const CACHE_NAME = 'api-v1' + (DEBUG ? `_${Date.now()}` : '')
api.use(
    cache({
        cacheName: CACHE_NAME,
        cacheControl: 'max-age=43200', // 12h
    }),
)

api.get('/:username', async (c, next) => {
    const username = c.req.param('username')
    const scale = utils.getScale(c.req.query('scale') ?? '1')

    if (username.startsWith('@')) {
        const dummy = utils.DUMMY_PROFILES_DATA
        if (dummy[username] == undefined) return await next()

        return new Response(utils.createProfile(template, dummy[username]), {
            headers: {
                'Content-Type': 'image/svg+xml',
            },
        })
    }

    const { name, err } = await utils.getUserName(username)
    if (err) return await next()

    const image = await utils.getImageBase64(username, scale)
    if (!image) return await next()

    return new Response(
        utils.createProfile(template, {
            username,
            name,
            scale,
            image,
        }),
        {
            headers: {
                'Content-Type': 'image/svg+xml',
            },
        },
    )
})

api.use(async (c, next) => {
    // prevent GitHub's "Camo" and images load from 404 error (or content fails to load)
    if (utils.isGitHubCamoBot(c) || !utils.acceptsHTML(c)) {
        return new Response(
            utils.createProfile(template, utils.DUMMY_PROFILES_DATA['@404']!),
            {
                headers: {
                    'Content-Type': 'image/svg+xml',
                },
            },
        )
    }

    return await next()
})

if (typeof Bun !== 'undefined') {
    const { serveStatic } = await import('hono/bun')
    app.use('*', serveStatic({ root: 'public/' }))
}

export default app
