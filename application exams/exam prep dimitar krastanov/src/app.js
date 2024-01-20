import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { login, logout } from './data/authorization.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
// import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPageView } from './views/create.js';
import { editPage } from './views/edit.js';
import { myBooksPage } from './views/my-books.js';



// import * as api from './data/applications.js'
// window.api = api

//TODO change render root depending on project HTML structure

const root = document.getElementById('container')

page(decorateContext)
page('index.html', '/');
page('/', homePage);
page('/create', createPageView);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/my-books', myBooksPage);
page('/details/:id', detailsPage);
page(`/edit/:id`, editPage)



page.start();

function decorateContext(ctx, next){
ctx.render = renderView;

    next();
}

// TODO inject dependencies

function renderView(content){
    const userData = getUserData()
render(layoutTemplate(userData, content), root)
}

function logoutAction(ctx){
    logout();
    ctx.page.redirect('/')
}