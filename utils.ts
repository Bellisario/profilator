import { Context, decoder, encode, ky } from './deps.ts';

export const DEV = Deno.env.get('DEV') === 'true';
if (DEV === true) {
    console.log('DEV mode enabled');
}

type Base64 = string;
interface ProfileData {
    username: string;
    name: string;
    image: Base64;
}
interface GitHubAPI {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string | null;
    company?: string | null;
    blog: string;
    location: string;
    email?: string | null;
    hireable?: string | boolean | null;
    bio: string;
    twitter_username?: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
}

/**
 * Replaces the given text {{token}} with the given value.
 */
export class Replacer {
    #text;
    constructor(text: string) {
        this.#text = text;
    }
    replace(search: string, replace: string) {
        this.#text = this.#text.replaceAll(`{{${search}}}`, replace);
    }
    get result() {
        return this.#text;
    }
}

function getDEVGitHubToken() {
    try {
        const data = Deno.readFileSync('.github_token');
        return decoder.decode(data);
    } catch {
        return;
    }
}

const GITHUB_TOKEN: string = Deno.env.get('GITHUB_TOKEN') ||
    getDEVGitHubToken() || '';

/**
 * Get name of user from GitHub API, returns object with 'err' if fails (and means an user does not exist)
 */
export async function getUserName(
    username: string,
): Promise<{ name: string; err: boolean }> {
    try {
        const res: GitHubAPI = await ky.get(
            `https://api.github.com/users/${username}`,
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            },
        ).json();
        return {
            err: false,
            name: res.name || '',
        };
    } catch {
        return {
            err: true,
            name: '',
        };
    }
}

const template = decoder.decode(await Deno.readFile('./assets/template.svg'));
// const replacer = new Replacer(template);
/**
 * Return a new profile SVG (as a string) with the given params.
 */
export function Profile(params: ProfileData) {
    const replacer = new Replacer(template);
    Object.keys(params).forEach((key: string) => {
        //@ts-ignore: Cannot params[key] with key of type string
        replacer.replace(key, params[key]);
    });
    return replacer.result;
}

/**
 * Return a Base64 string of the given image URL.
 */
export async function getImageBase64(url: string): Promise<Base64> {
    const res = await ky.get(url).arrayBuffer();
    return encode(res);
}

/**
 * Return a Base64 string of the given image path.
 */
export async function getLocalImageBase64(url: string): Promise<Base64> {
    const res = (await Deno.readFile(url)).buffer;
    return encode(res);
}

/**
 * Seconds in a day
 */
export const oneDaySeconds = 24 * 60 * 60;

/**
 * Blank GIF Base64 encoded
 */
const blankGif = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const internalProfilatorsData: { [key: string]: ProfileData } = {
    '@profilator': {
        username: 'Profilator',
        name: 'Snap GitHub profiles',
        image: await getLocalImageBase64(`${Deno.cwd()}/assets/profile.png`),
    },
    '@blank': {
        username: '',
        name: '',
        image: blankGif,
    },
    '404': {
        username: 'Not Found',
        name: 'GitHub user not found.',
        image: blankGif,
    },
};

/**
 * Default profile profilators for internal use
 */
export const defaultProfiles = {
    '@profilator': Profile(internalProfilatorsData['@profilator']),
    '@blank': Profile(internalProfilatorsData['@blank']),
    '404': Profile(internalProfilatorsData['404']),
};

/**
 * Detect if HTML is excepted as response of the given request
 */
export function acceptsHTML(ctx: Context): boolean {
    return ctx.request.accepts()?.includes('text/html') ?? false;
}

/**
 * Detect if a request is made by a GitHub Camo Bot
 */
export function isGitHubCamoBot(ctx: Context): boolean {
    return ctx.request.headers.get('User-Agent')?.includes('GitHub-Camo') ??
        false;
}
