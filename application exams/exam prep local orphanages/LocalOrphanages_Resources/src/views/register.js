import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../data/authorization.js";
import { createSumbitHandler } from "../util.js";

//TODO Replace with actual view

const registerTemplate = (onRegister) => html`
<section id="register-page" class="auth">
            <form id="register" @submit=${onRegister}>
                <h1 class="title">Register</h1>

                <article class="input-group">
                    <label for="register-email">Email: </label>
                    <input type="email" id="register-email" name="email">
                </article>

                <article class="input-group">
                    <label for="register-password">Password: </label>
                    <input type="password" id="register-password" name="password">
                </article>

                <article class="input-group">
                    <label for="repeat-password">Repeat Password: </label>
                    <input type="password" id="repeat-password" name="repeatPassword">
                </article>

                <input type="submit" class="btn submit-btn" value="Register">
            </form>
        </section>
`;

export function registerPage(ctx){
    ctx.render(registerTemplate(createSumbitHandler(onRegister
    )));

//TODO change user object based on requirements

    async function onRegister({email, password, 'repeatPassword': repass}, form){

        if(email == "" || password == "" || repass == ""){
            return alert ('All fields are required')
        }

        if(password != repass){
            return alert('Password do not match')
        }

        await register(email, password);
        form.reset();

        //TODO use redirect location from requirements

        ctx.page.redirect('/catalog')
    }
}