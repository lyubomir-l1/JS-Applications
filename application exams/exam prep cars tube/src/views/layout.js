import { html } from "../../node_modules/lit-html/lit-html.js"


//TODO Replace with actual layout
export const layoutTemplate = (userData, content) => html`
<header>
<nav>
    <a class="active" href="/">Home</a>
    <a href="/catalog">All Listings</a>
    <a href="/search">By Year</a>
    ${userData ? html`
    <div id="profile">
        <a>Welcome ${userData.name}</a>
        <a href="/my-listings">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="/logout">Logout</a>
    </div>
    ` : html`
    <div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    </div>
    `}
</nav>
</header>
<main>
${content}
</main>
`