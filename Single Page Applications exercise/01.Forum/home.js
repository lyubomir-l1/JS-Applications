// showHome = > home element shown
// load posts
// create post function => post functionality
// cancel functionality

import { createElements } from "./untils.js";

export async function showHome(e){
    e.preventDefault();
    localStorage.clear()
    window.location = './index.html'
    
}
loadPost();
function showComments(e){
    let postId;
    if(e.target.tagName === "a"){
        postId = e.target.dataset.id
    }else{
        postId = e.target.parentElement.getAttribute('dataset.id');
    }
    localStorage.setItem('postId', postId)
    window.location = './theme-content.html'
}

async function loadPost(){
    let topicDivElement = document.querySelector('.topic-title');
    topicDivElement.replaceChildren();
    try {
        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        if(!response.ok){
            let error = await response.json();
            throw new Error(error.message)
        }
        let posts = await response.json();
        for (const [postId, post] of Object.entries(posts)) {
            let topicConteinerDivElement = createElements('div', '', topicDivElement, {'class': "topic-container"});
            let topicNameWrapperDivElement = createElements('div', '', topicConteinerDivElement, {'class': "topic-name-wrapper"});
            let topicNameDivElement = createElements('div', '', topicNameWrapperDivElement, {'class': "topic-name"});
            let anchorElement = createElements('a', '', topicNameDivElement, {
                'href': "#",
                'dataset.id': postId,
                'class': "normal"
            });
            // anchorElement.addEventListener('click', showComents)
            createElements('h2', post.title, anchorElement, {})
            let columnsDivElement = createElements('div', '', topicNameDivElement, {'class': "columns"});
            let divElement = createElements('div', '', columnsDivElement, {})
            let dateParagraphElement = createElements('p', 'Date:', divElement, {})
            createElements('time', post.createdDate, dateParagraphElement, {})
            let nickNameDivElement = createElements('div', '', divElement, {
                'Class': "nick-name"
            })
            let userNameParagraphElement = createElements('p', 'Username: ', nickNameDivElement, {})
            createElements('span', post.username, userNameParagraphElement, {})

        }
    } catch (error) {
        alert(error.message)
    }
}

export async function createPost(e){
    e.preventDefault();
    let formElement = document.querySelector('form');
    let formData = new FormData(formElement)
    let title = formData.get('topicName').trim();
    let username = formData.get('userName').trim();
    let content = formData.get('postText').trim();
    let createDate = new Date()

    try {
        if(!title){
            throw new Error('Title is required!')
        }else if(!username){
            throw new Error('Username is required!')
        }else if(!content){
            throw new Error('Content is required!')
        }
        let res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({title, username, content, createDate})
    })
    if(!res.ok){
const error = await res.json();
throw new Error(error.message)
    }
    formElement.reset();
    await loadPost()

    } catch (error) {
        alert(error.message)
    }
}

export function onClose(e){
    e.preventDefault()
    const  formElement = document.querySelector('form')
    formElement.reset()
 }