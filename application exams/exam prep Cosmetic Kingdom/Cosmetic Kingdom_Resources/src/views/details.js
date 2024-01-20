import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteOffer, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

//TODO Replace with actual view

const detailsTemplate = (offer, onDelete) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${offer.imageUrl} alt="example1" />
  <p id="details-title">${offer.name}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-price">
    Price: <span id="price-number">${offer.price}</span>$</p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Bought: <span id="buys">${offer.category}</span> times.</h4>
      <span
        >${offer.description}</span
      >
    </div>
  </div>

  ${offer.canEdit ? html`
  <div id="action-buttons">
    <a href="/catalog/${offer._id}/edit" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>

    <!--Bonus - Only for logged-in users ( not authors )-->
    <a href="" id="buy-btn">Buy</a>
  </div>
  ` : null}
</div>
</section>
`


export  async function detailsPage(ctx){
  const id = ctx.params.id;
  const offer = await getById(id);
  const userData = getUserData();
  if(userData && userData._id == offer._ownerId){
      offer.canEdit = true
  }
  ctx.render(detailsTemplate(offer, onDelete));

 async function onDelete(){
const choice = confirm('Are you sure?')
if(choice){
  await deleteOffer(id);
  ctx.page.redirect('/catalog')
}

 }
}