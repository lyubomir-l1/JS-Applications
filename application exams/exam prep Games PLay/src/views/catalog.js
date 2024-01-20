import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllOffers } from "../data/offers.js";

//TODO Replace with actual view

const catalogTemplate = (offers) => html`
<section id="catalog-page">
<h1>All Games</h1>
<!-- Display div: with information about every game (if any) -->
${offers.length > 0 ? offers.map(offerCard) : html`
<h3 class="no-articles">No articles yet</h3>
`}
</section>
`;

const offerCard = (offer) => html` 
<div class="allGames">
<div class="allGames-info">
<img src=${offer.imageUrl}>
<h6>${offer.category}</h6>
<h2>${offer.title}</h2>
<a href="/catalog/${offer._id}" class="details-button">Details</a>
</div>
</div>`

export  async function catalogPage(ctx){
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers));
}