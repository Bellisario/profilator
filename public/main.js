const previewImage = document.getElementById('preview-image')
const previewLink = document.getElementById('preview-link')
const username = document.getElementById('username')
const markdown = document.getElementById('markdown')

let before = 0
let toBeCopied = getMarkdown('Bellisario')

function copyToClipboard(text) {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
}

function getImage(username) {
    return `${location.protocol}//${location.host}/api/v1/${username}`
}

function getMarkdown(username) {
    return `[![${username}'s Profilator](${getImage(
        username,
    )})](https://github.com/${username})`
}

function getLink(username) {
    if (username.startsWith('@')) {
        return `${location.protocol}//${location.host}/`
    }
    return `https://github.com/${username}`
}

document.addEventListener('DOMContentLoaded', () => {
    username.focus()

    username.addEventListener('keydown', (e) => {
        // prevent space
        if (e.keyCode === 32) return e.preventDefault()
        before = username.value.length
    })

    let keystrokeTimeout
    username.addEventListener('keyup', () => {
        clearInterval(keystrokeTimeout)

        // prevent opacity change on (for example) ctrl+a
        if (username.value.length === before) return

        previewImage.style.opacity = 0
        // set Profilator as default profile if there is no username
        if (username.value.length === 0) {
            toBeCopied = getMarkdown('Bellisario')
            previewLink.href = getLink('Bellisario')
            setTimeout(() => {
                previewImage.src = getImage('Bellisario')
            }, 150)
            return
        }

        toBeCopied = getMarkdown(username.value)
        keystrokeTimeout = setTimeout(() => {
            previewImage.src = getImage(username.value)
            previewLink.href = getLink(username.value)
        }, 500)
    })

    let copiedMsgTimeout
    markdown.addEventListener('click', () => {
        clearTimeout(copiedMsgTimeout)
        copyToClipboard(toBeCopied)
        markdown.classList.add('copying')
        // https://stackoverflow.com/a/4067488/14997578
        username.setSelectionRange(0, username.value.length)
        username.focus()
        copiedMsgTimeout = setTimeout(() => {
            markdown.classList.remove('copying')
        }, 1500)
    })
})
