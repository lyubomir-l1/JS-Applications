import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllOffers } from "../data/offers.js";

//TODO Replace with actual view

const catalogTemplate = (offers) => html`
<section id="meme-feed">
      <h1>All Memes</h1>
        <div id="memes">
            ${offers.length > 0 ? offers.map(offerCard) : html`
            <p class="no-memes">No memes in database.</p>
            `}
			  </div>
</section>
`;

const offerCard = (offer) => html`
<div class="meme">
<div class="card">
    <div class="info">
        <p class="meme-title">Debugging</p>
        <img class="meme-image" alt="meme-img" src=${offer.imageUrl}>
    </div>
    <div id="data-buttons">
        <a class="button" href="/catalog/${offer._id}">Details</a>
    </div>
</div>
</div>`

export  async function catalogPage(ctx){
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers));
}