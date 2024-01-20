import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../data/authorization.js";
import { createSumbitHandler } from "../util.js";

//TODO Replace with actual view

const loginTemplate = (onLogin) => html`
<section id="loginaPage">
<form class="loginForm" @submit=${onLogin}>
    <h2>Login</h2>
    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>
    <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Login</button>

    <p class="field">
        <span>If you don't have profile click <a href="/register">here</a></span>
    </p>
</form>
</section>

`;

export function loginPage(ctx){
    ctx.render(loginTemplate(createSumbitHandler(onLogin)));

//TODO change user object based on requirements

    async function onLogin({email, password}, form){
        if(email == "" || password == ""){
            return alert ('All fields are required')
        }
        await login(email, password);
        form.reset();

        //TODO use redirect location from requirements

        ctx.page.redirect('/')
    }
}