import {
    Application,
    Context,
    Router,
} from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { Handlebars } from 'https://deno.land/x/handlebars@v0.8.0/mod.ts';
import { encode } from 'https://deno.land/std@0.147.0/encoding/base64.ts';
import ky from 'https://cdn.skypack.dev/ky@0.31.0?dts';

const app = new Application({
    logErrors: false,
});
const router = new Router();
const hbs = new Handlebars();
const decoder = new TextDecoder('utf-8');

export { app, Context, decoder, hbs, router, encode, ky };
