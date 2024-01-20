import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllOffers } from "../data/offers.js";

//TODO Replace with actual view

const catalogTemplate = (offers) => html`
<h2>Products</h2>
<section id="dashboard">
${offers.length > 0 ? offers.map(offerCard) : html`<h2>No products yet.</h2>
`}

</section>`
const offerCard = (offer) => html`
<div class="product">
    <img src="${offer.imageUrl}" alt="example1" />
    <p class="title">
    ${offer.name}
    </p>
    <p><strong>Price:</strong><span class="price">${offer.price}</span>$</p>
    <a class="details-btn" href="/catalog/${offer._id}">Details</a>
  </div>
`

export  async function catalogPage(ctx){
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers));
}