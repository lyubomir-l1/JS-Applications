import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../data/authorization.js";
import { createSumbitHandler } from "../util.js";

//TODO Replace with actual view

const loginTemplate = (onLogin) => html`
<section id="login-page" class="login">
<form @submit=${onLogin} id="login-form" action="" method="">
    <fieldset>
        <legend>Login Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Login">
    </fieldset>
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