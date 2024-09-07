import {
    Application,
    Context,
    Router,
} from 'https://deno.land/x/oak@v17.0.0/mod.ts';
import { encodeBase64 } from 'https://deno.land/std@0.224.0/encoding/base64.ts';
import ky from 'https://cdn.skypack.dev/ky@0.31.0?dts';

const app = new Application({
    logErrors: false,
});
const router = new Router();
const decoder = new TextDecoder('utf-8');

// App Version
const VERSION = '1.0.0.alpha.4';

export { app, Context, decoder, encodeBase64 as encode, ky, router, VERSION };
