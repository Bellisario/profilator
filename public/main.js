const result = document.getElementById('the-result');
const resultLink = document.getElementById('profilator-container');
const username = document.getElementById('the-username');
const markdown = document.getElementById('the-markdown');

let keystrokeTimeout;
let before = 0;
let toBeCopied = getMarkdown('Bellisario');

// get the old value to easily change the markdown value just with HTML
const markdownOriginalValue = markdown.value;

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function getMarkdown(username) {
    return `[![${username}'s Profilator](${location.protocol}//${location.host}/${username})](https://github.com/${username})`;
}

function getLink(username) {
    if (username.startsWith('@')) {
        return `${location.protocol}//${location.host}/`;
    }
    return `https://github.com/${username}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // focus the username input
    username.focus();

    username.addEventListener('keydown', function (e) {
        if (e.keyCode === 32) return e.preventDefault();
        before = username.value.length;
    });

    username.addEventListener('keyup', (_e) => {
        clearInterval(keystrokeTimeout);

        // prevent opacity change on (for example) ctrl+a
        if (username.value.length === before) return;

        result.style.opacity = 0;
        // set Bellisario's Profilator as default profile if there is no username
        if (username.value.length === 0) {
            toBeCopied = getMarkdown('Bellisario');
            resultLink.href = getLink('Bellisario');
            setTimeout(() => {
                result.src = '/Bellisario';
            }, 150);
            return;
        }

        toBeCopied = getMarkdown(username.value);
        keystrokeTimeout = setTimeout(() => {
            result.src = '/' + username.value;
            resultLink.href = getLink(username.value);
        }, 500);
    });

    markdown.addEventListener('click', () => {
        copyToClipboard(toBeCopied);
        markdown.value = 'Copied!';
        // https://stackoverflow.com/a/4067488/14997578
        username.setSelectionRange(0, username.value.length);
        username.focus();
        setTimeout(() => {
            markdown.value = markdownOriginalValue;
        }, 1500);
    });
});
