import {
    Application,
    Context,
    Router,
} from 'https://deno.land/x/oak@v12.0.0/mod.ts';
import { encode } from 'https://deno.land/std@0.178.0/encoding/base64.ts';
import ky from 'https://cdn.skypack.dev/ky@0.31.0?dts';

const app = new Application({
    logErrors: false,
});
const router = new Router();
const decoder = new TextDecoder('utf-8');

// App Version
const VERSION = '1.0.0.alpha.4';

export { app, Context, decoder, encode, ky, router, VERSION };
