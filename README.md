<p align="center"><img src="https://profilator.bellisario.tk/api/v1/@profilator" align="center"></img></center>
<p></p>
<h1 align="center">GitHub Profilator</h1>

_Add GitHub profiles to Markdown in a snap_

**Official instance:** [profilator.bellisario.tk](https://profilator.bellisario.tk/)

> Are you using GitHub Profilator? Let us know [on this discussion](https://github.com/Bellisario/profilator/discussions/1)! :rocket:

## Example

| Profile                                                                                                         | Smooth Error                                                                                  |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [![Bellisario's Profilator](https://profilator.bellisario.tk/api/v1/Bellisario)](https://github.com/Bellisario) | [![@404's Profilator](https://profilator.bellisario.tk/api/v1/@404)](https://github.com/@404) |

You can also customize the scale of the Profilator (there are no step scaling limits, _ex. you can also scale 0.67x_)
| 1x scale | 0.75x scale | 0.5x scale |
| ---- | ---- | ---- |
| [![Bellisario's Profilator](https://profilator.bellisario.tk/api/v1/Bellisario)](https://github.com/Bellisario) | [![Bellisario's Profilator](https://profilator.bellisario.tk/api/v1/Bellisario?scale=0.75)](https://github.com/Bellisario) | [![Bellisario's Profilator](https://profilator.bellisario.tk/api/v1/Bellisario?scale=0.5)](https://github.com/Bellisario)

> [!NOTE]
> Scale is limited to 0.5x for visibility reasons.

### How to use the scale option

Generate a new Profilator from [the official website](https://profilator.bellisario.tk/) and while updating the markdown change it like this:

```diff
+ [![Bellisario's Profilator](https://profilator.bellisario.tk/api/v1/Bellisario?scale=0.75)](https://github.com/Bellisario)
- [![Bellisario's Profilator](https://profilator.bellisario.tk/api/v1/Bellisario)](https://github.com/Bellisario)
```

> [!TIP]
> You can scale up to 3x.

### Other tips

#### Force username letter uppercase

If you want to force an username letter to be uppercase, just write the username with the letter in uppercase, Profilator will be able to parse it anyway and you'll see that in uppercase, too.\
See the example below:

| lowercase                                                                                                    | forced uppercase                                                                                             |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| [![jamesbond's Profilator](https://profilator.bellisario.tk/api/v1/jamesbond)](https://github.com/jamesbond) | [![JamesBond's Profilator](https://profilator.bellisario.tk/api/v1/JamesBond)](https://github.com/JamesBond) |

## How it works

Under the hood, GitHub Profilator uses the GitHub API to fetch the profile data and then uses a [pre-built template](https://github.com/Bellisario/profilator/blob/main/assets/template.svg) to generate the image, with the all the data needed.

## Technologies

This project uses [Hono](https://hono.dev/) and [Bun](https://bun.sh/), with the option to deploy to [Cloudflare Workers](https://www.cloudflare.com/developer-platform/products/workers/) (used for the official instance).

The template is built with Figma (and then manually modified). You can find the `.fig` file [here](https://github.com/Bellisario/profilator/blob/main/assets/GitHub%20Profilator.fig).

## Why should you use GitHub Profilator?

Because, as the description said, "you can add GitHub profiles to Markdown in a snap" and in a prettier format than the plain "ugly" table you see on a lot of repositiories:

| [![Giorgio Bellisario](https://github.com/Bellisario.png?size=100)](https://github.com/Bellisario) |
| -------------------------------------------------------------------------------------------------- |
| [Giorgio Bellisario](https://github.com/Bellisario)                                                |

## Development

To get started, clone, `cd` the repo and init the `.env` file:

```bash
git clone https://github.com/Bellisario/profilator && cd profilator
```

```bash
cp .env.example .env
```

Then, you can run the following command to start the server:

```bash
bun run dev
```

You can also run this command to start the server in production-like mode with Cloudflare Wrangler:

```bash
bun run start
```

When you're done with the changes, run `bun run format` to make sure your changes follow the project formatting style.

> [!NOTE]
> Depending on your Internet provider, you may need to [create a GitHub access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) and add it to your `.env` file to use GitHub API.

## Contributing

We :heart: contributions!\
Feel free to [open an issue](https://github.com/Bellisario/profilator/issues/new/choose) or a [pull request](https://github.com/Bellisario/profilator/pulls) but follow [Contributing Guidelines](https://github.com/Bellisario/profilator/blob/main/CONTRIBUTING.md).

## License

MIT License [here](https://github.com/Bellisario/profilator/blob/main/LICENSE).
