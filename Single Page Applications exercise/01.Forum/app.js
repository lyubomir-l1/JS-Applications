import { createPost, onClose, showHome } from "./home.js";

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener("click", showHome)
const buttonsElements = document.querySelectorAll('button');

let cancelButtonElement = buttonsElements[0];
cancelButtonElement = addEventListener('click', onClose)
let createPostButttonElement = buttonsElements[1]
createPostButttonElement.addEventListener('click', createPost)