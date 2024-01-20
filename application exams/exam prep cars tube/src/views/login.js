import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../data/authorization.js";
import { createSumbitHandler } from "../util.js";

//TODO Replace with actual view

const loginTemplate = (onLogin) => html`
<section id="login">
<div class="container">
    <form id="login-form" action="#" method="post" @submit=${onLogin}>
        <h1>Login</h1>
        <p>Please enter your credentials.</p>
        <hr>

        <p>Username</p>
        <input placeholder="Enter Username" name="username" type="text">

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn" value="Login">
    </form>
    <div class="signin">
        <p>Dont have an account?
            <a href="/register">Sign up</a>.
        </p>
    </div>
</div>
</section>
`;

export function loginPage(ctx){
    ctx.render(loginTemplate(createSumbitHandler(onLogin)));

//TODO change user object based on requirements

    async function onLogin({username, password}, form){
        if(username == "" || password == ""){
            return alert ('All fields are required')
        }
        await login(username, password);
        form.reset();

        //TODO use redirect location from requirements

        ctx.page.redirect('/catalog')
    }
}