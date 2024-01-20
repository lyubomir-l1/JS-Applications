import { html } from "../../node_modules/lit-html/lit-html.js";


export const offerPriview = (offer) => html`
<li class="otherBooks">
<h3>${offer.title}</h3>
<p>Type: ${offer.type}</p>
<p class="img"><img src="${offer.imageUrl}"></p>
<a class="button" href="/details/${offer._id}">Details</a>
</li>
`