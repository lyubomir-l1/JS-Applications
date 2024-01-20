import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllOffers } from "../data/offers.js";

//TODO Replace with actual view

const catalogTemplate = (offers) => html`
<section id="dashboard">
<h2 class="dashboard-title">Services for every animal</h2>
<div class="animals-dashboard">
${offers.length > 0 ? offers.map(offerCard) : html`
    <div>
        <p class="no-pets">No pets in dashboard</p>
    </div>
`}   
</div>
</section>`;

const offerCard = (offer) => html`<div class="animals-board">
<article class="service-img">
    <img class="animal-image-cover" src=${offer.image}>
</article>
<h2 class="name">${offer.name}</h2>
<h3 class="breed">${offer.breed}</h3>
<div class="action">
    <a class="btn" href="/catalog/${offer._id}">Details</a>
</div>
</div>`

export  async function catalogPage(ctx){
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers));
}