import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllOffers } from "../data/offers.js";

//TODO Replace with actual view

const catalogTemplate = (offers) => html`
<section id="dashboard">
<h2>Collectibles</h2>
<ul class="card-wrapper">

${offers.length > 0 ? offers.map(offerCard) : html`
<h2>There are no items added yet.</h2>
`}
  
</ul>
</section>
`
const offerCard = (offer) => html`<li class="card">
<img src=${offer.imageUrl} />
<p>
  <strong>Brand: </strong><span class="brand">${offer.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${offer.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${offer.value}</span>$</p>
<a class="details-btn" href="/catalog/${offer._id}">Details</a>
</li>`

export  async function catalogPage(ctx){
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers));
}