<p align="center"><img src="https://profilator.deno.dev/@profilator?v=1.0.0.alpha.1" align="center"></img></center>
<p></p>
<h1 align="center">GitHub Profilator</h1>

> Add GitHub profiles to Markdown in a snap

**Warning:** This is an _Alpha_ version of the project, and it is not stable yet.

**Official website:** [https://profilator.deno.dev/](https://profilator.deno.dev/)

## Example

<!-- deno-fmt-ignore-start -->

| Profile | Smooth Error |
| ---- | ---- |
| [![Bellisario's Profilator](https://profilator.deno.dev/Bellisario?v=1.0.0.alpha.0)](https://github.com/Bellisario) | [![@404's Profilator](https://profilator.deno.dev/@404?v=1.0.0.alpha.0)](https://github.com/@404) |

<!-- deno-fmt-ignore-end -->

## How it works

Under the hood, GitHub Profilator uses the GitHub API to fetch the profile data and then uses a pre-built template to generate the image, with the all the data needed.

## Technologies

I decided to use Deno for this project because it is a great tool for building simple and fast servers, with the help of the awesome Deno Deploy.

# Why should you use GitHub Profilator?

There is a simple answer to this question: like the description said "you can add GitHub profiles to Markdown in a snap" and I can also add you are able also to get a beautiful profile display for your GitHub profile, and not an "ugly" one like this and you can see on a lot of repositories:

| [![Giorgio Bellisario](https://github.com/Bellisario.png?size=100)](https://github.com/Bellisario) |
| -------------------------------------------------------------------------------------------------- |
| [Giorgio Bellisario](https://github.com/Bellisario)                                                |

# Development

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

If you prefer, you can also create a new environment variable called `GITHUB_TOKEN` and set it to the token, but this is not recommended for development use: it's only recommended if you want to use the server in production mode (for example) on Deno Deploy.

## How to contribute

Feel free to open an issue or a pull request but just follow these guidelines:

- An issue is for a bug or a feature request, if you have any question or something similar, please use Discussions.
- Before opening an issue of a pull request, please check if the issue or the pull request already exists.
- Before opening a pull request, make sure to run `deno fmt` and `deno lint` on the whole project to keep code style and linting rules.
- Pull requests for packages updates are not allowed since there is Udd that checks them automatically.
- If you don't know how to contribute, also because you don't know TypeScript, JavaScript, or Deno, you can always help others on Discussions, debug the application, share your awesome idea with a new issue (feature request) and check the whole project for misspellings, too.
