import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllOffers } from "../data/offers.js";

//TODO Replace with actual view

const catalogTemplate = (offers) => html`
<section id="dashboard-page">
<h1 class="title">All Posts</h1>
<div class="all-posts">
${offers.length > 0 ? offers.map(offerCard) : html`
<h1 class="title no-posts-title">No posts yet!</h1>
`}
</div>
</section>
`;

const offerCard = (offer) => html`
<div class="post">
<h2 class="post-title">${offer.title}</h2>
<img class="post-image" src=${offer.imageUrl} alt="Material Image">
<div class="btn-wrapper">
    <a href="/catalog/${offer._id}" class="details-btn btn">Details</a>
</div>
</div>`

export  async function homePage(ctx){
    const offers = await getAllOffers()
    ctx.render(catalogTemplate(offers));
}