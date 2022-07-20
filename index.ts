import { app, router, VERSION } from './deps.ts';
import {
    acceptsHTML,
    defaultProfiles,
    DEV,
    getImageBase64,
    getUserName,
    isGitHubCamoBot,
    oneDaySeconds,
    Profile,
} from './utils.ts';

// Static files under the "public" folder
app.use(async (ctx, next) => {
    try {
        if (ctx.request.url.pathname === '/[404].html') {
            throw new Error('Not found');
        }
        await ctx.send({
            root: `${Deno.cwd()}/public`,
            index: 'index.html',
        });
    } catch {
        await next();
    }
});

// Set cache headers
app.use(async (ctx, next) => {
    ctx.response.headers.set(
        'cache-control',
        'public, max-age=' + oneDaySeconds,
    );
    await next();
});

// Set Bellisario profilator as default profile (for the favicon)
router.get('/favicon.svg', (ctx) => {
    ctx.response.redirect('/Bellisario');
});
router.get('/favicon.ico', (ctx) => {
    ctx.response.redirect('/Bellisario');
});

// Using "@" because GitHub usernames cannot start with this character
// use @profilator as Profilator example image
router.get('/@profilator', (ctx) => {
    ctx.response.type = 'image/svg+xml';
    ctx.response.body = defaultProfiles['@profilator'];
});
// use @blank as blank profile
router.get('/@blank', (ctx) => {
    ctx.response.type = 'image/svg+xml';
    ctx.response.body = defaultProfiles['@blank'];
});
// get App Version
router.get('/@version', (ctx) => {
    ctx.response.type = 'text/javascript';
    ctx.response.body = `window.VERSION = '${DEV ? 'DEV' : VERSION}';`;
});

router.get('/:username', async (ctx, next) => {
    const { username } = ctx.params;
    const v = ctx.request.url.searchParams.get('v');
    const scaleRaw = ctx.request.url.searchParams.get('scale');
    const scale = new Number(scaleRaw) ? +scaleRaw! : 1;

    if (DEV === true && v === null) {
        return ctx.response.redirect(`/${username}?v=${Date.now()}`);
    }

    if (v === null) {
        return ctx.response.redirect(`/${username}?v=${VERSION}`);
    }

    const { name, err } = await getUserName(username);

    if (err) {
        return await next();
    }

    const image = await getImageBase64(
        `https://github.com/${username}.png?size=101`,
    );

    const profile = Profile({ username, name, image, scale });
    ctx.response.type = 'image/svg+xml';
    ctx.response.body = profile;
});

router.use(async (ctx) => {
    // prevent GitHub's "Camo" and images load from 404 error (or content fails to load)
    if (isGitHubCamoBot(ctx) || !acceptsHTML(ctx)) {
        ctx.response.type = 'image/svg+xml';
        ctx.response.body = defaultProfiles['404'];
        return;
    }
    ctx.response.status = 404;
    ctx.response.type = 'text/html';
    ctx.response.body = await Deno.readFile(`${Deno.cwd()}/public/[404].html`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('error', (evt) => {
    // ignore this error
    if (evt.error.message === 'connection closed before message completed') {
        return;
    }
    console.log(evt);
});

console.log('App listening on port', 3000);
await app.listen({ port: 3000 });
