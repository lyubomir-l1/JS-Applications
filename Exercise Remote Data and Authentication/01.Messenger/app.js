function attachEvents() {
    document.getElementById('submit').addEventListener('click', addComment);
    document.getElementById('refresh').addEventListener('click', displayAllComments);

}

const messangerUrl = 'http://localhost:3030/jsonstore/messenger';

function addComment() {
    const autorName = document.querySelector('[name="author"]')
    const messageText = document.querySelector('[name="content"]')
    if (!autorName.value || !messageText.value) return;
    fetch(messangerUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            author: autorName.value.trim(),
            content: messageText.value.trim(),
        })
    }).then(res => {
        if (!res.ok) throw new Error('Error');
        return res.json();
    }).catch(e => alert(e.message))
}

function displayAllComments() {
    fetch(messangerUrl)
        .then(res => {
            if (!res.ok) throw new Error('Error')
            return res.json()
        }).then(addCommentToTextArea).catch(e => alert(e.message))

}
function addCommentToTextArea(data) {
    const textArea = document.querySelector('#messages');
    const allComents = [];
    Object.values(data).forEach(c => allComents.push(`${c.author}: ${c.content}`));
    textArea.value = allComents.join('\n')

}


attachEvents();