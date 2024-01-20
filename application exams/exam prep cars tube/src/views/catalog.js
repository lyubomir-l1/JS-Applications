import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllOffers } from "../data/offers.js";

//TODO Replace with actual view

const catalogTemplate = (offers) => html`
<section id="car-listings">
<h1>Car Listings</h1>
<div class="listings">

    ${offers.length > 0 ? offers.map(offerCard) : html`
    <p class="no-cars">No cars in database.</p>
`}

</div>
</section>
`;

const offerCard = (offer) => html`
<div class="listing">
<div class="preview">
    <img src=${offer.imageUrl}>
</div>
<h2>${offer.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${offer.year}</h3>
        <h3>Price: ${offer.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href="/catalog/${offer._id}" class="button-carDetails">Details</a>
    </div>
</div>
</div>`

export  async function catalogPage(ctx){
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers));
}