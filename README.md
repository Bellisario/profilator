<p align="center"><img src="https://profilator.deno.dev/@profilator?v=1.0.0.alpha.1" align="center"></img></center>
<p></p>
<h1 align="center">GitHub Profilator</h1>

> Add GitHub profiles to Markdown in a snap

**Warning:** This is an _Alpha_ version of the project, and it is not stable yet.

**Official website:** [https://profilator.deno.dev/](https://profilator.deno.dev/)

> Are you using GitHub Profilator? Let us know [on this discussion](https://github.com/Bellisario/profilator/discussions/1)! :rocket:

## Example

<!-- deno-fmt-ignore-start -->

| Profile | Smooth Error |
| ---- | ---- |
| [![Bellisario's Profilator](https://profilator.deno.dev/Bellisario?v=1.0.0.alpha.2)](https://github.com/Bellisario) | [![@404's Profilator](https://profilator.deno.dev/@404?v=1.0.0.alpha.2)](https://github.com/@404) |

You can also customize the scale of the Profilator (there are no step scaling limits, _ex. you can also scale 0.93534...x_)
| 1x scale | 0.75x scale | 0.5x scale |
| ---- | ---- | ---- |
| [![Bellisario's Profilator](https://profilator.deno.dev/Bellisario?v=1.0.0.alpha.2)](https://github.com/Bellisario) | [![Bellisario's Profilator](https://profilator.deno.dev/Bellisario?v=1.0.0.alpha.2&scale=0.75)](https://github.com/Bellisario) | [![Bellisario's Profilator](https://profilator.deno.dev/Bellisario?v=1.0.0.alpha.2&scale=0.5)](https://github.com/Bellisario) 

> **Warning:** Currently scale cannot be below 0.5x (because Profilator will become invisible :ghost:)

<!-- deno-fmt-ignore-end -->

### How to use the scale option

Generate a new Profilator from [Profilator website](https://profilator.deno.dev/) and then when adding to markdown change it like this:
```diff
+ [![Bellisario's Profilator](https://profilator.deno.dev/Bellisario?v=1.0.0.alpha.2&scale=0.75)](https://github.com/Bellisario)
- [![Bellisario's Profilator](https://profilator.deno.dev/Bellisario?v=1.0.0.alpha.2)](https://github.com/Bellisario)
```
> **Tip:** you can also scale more than 1x, for example 2x, but for now the image resolution is the same, so could be grainy

## How it works

Under the hood, GitHub Profilator uses the GitHub API to fetch the profile data and then uses a [pre-built template](https://github.com/Bellisario/profilator/blob/main/assets/template.svg) to generate the image, with the all the data needed.

## Technologies

I decided to use [Deno](https://deno.land) for this project because it's a great tool for building simple and fast servers, with the help of the awesome [Deno Deploy](https://deno.com/deploy).

The template is built with Figma (and then manually modified) and you can find the .fig file [here](https://github.com/Bellisario/profilator/blob/main/assets/GitHub%20Profilator.fig).

## Why should you use GitHub Profilator?

There is a simple answer to this question: like the description said "you can add GitHub profiles to Markdown in a snap" and I can also add you are able also to get a beautiful profile display for your GitHub profile, and not an "ugly" one like below (you can see on a lot of repositories):

| [![Giorgio Bellisario](https://github.com/Bellisario.png?size=100)](https://github.com/Bellisario) |
| -------------------------------------------------------------------------------------------------- |
| [Giorgio Bellisario](https://github.com/Bellisario)                                                |

## Development

To get started, clone the repo:

```bash
git clone https://github.com/Bellisario/profilator.git
```

Then, you can run the following command to start the server:

```bash
deno task dev
```

You can also run the following command to start the server in production mode:

```bash
deno task start
```

---

**Warning:** You could need to create a new GitHub personal access token to use this server (especially if your IP Address is associated from GitHub as "too many requests").

### To use a personal access token

Create a new one from [here](https://github.com/settings/tokens/new?description=GitHub%20Profilator%20DEV) (it requires no permissions).

Then, you can set the token into a file named `.github_token` in the root of the project. You can also use the terminal like this:

```bash
echo <token> > .github_token
```

If you prefer, you can also create a new environment variable called `GITHUB_TOKEN` and set it to the token, but this is not recommended for development use: it's only recommended if you want to use the server in production mode (for example) on [Deno Deploy](https://deno.com/deploy).

## How to contribute

Feel free to [open an issue](https://github.com/Bellisario/profilator/issues/new/choose) or a [pull request](https://github.com/Bellisario/profilator/pulls) but follow [Contributing Guidelines](https://github.com/Bellisario/profilator/blob/main/CONTRIBUTING.md).
