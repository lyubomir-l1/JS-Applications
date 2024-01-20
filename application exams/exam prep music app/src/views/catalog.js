import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllOffers } from "../data/offers.js";

//TODO Replace with actual view

const catalogTemplate = (offers) => html`
<section id="catalogPage">
<h1>All Albums</h1>
${offers.length > 0 ? offers.map(offerCard) : html`
<p>No Albums in Catalog!</p>
`}

</section>
`;

const offerCard = (offer) => html`
<div class="card-box">
<img src=${offer.imgUrl}>
<div>
    <div class="text-center">
        <p class="name">Name: ${offer.name}</p>
        <p class="artist">Artist: ${offer.artist}</p>
        <p class="genre">Genre: ${offer.genre}</p>
        <p class="price">Price: ${offer.price}</p>
        <p class="date">Release Date: ${offer.releaseDate}</p>
    </div>
    <div class="btn-group">
        <a href="/catalog/${offer._id}" id="details">Details</a>
    </div>
</div>
</div>`

export  async function catalogPage(ctx){
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers));
}