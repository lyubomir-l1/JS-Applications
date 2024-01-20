import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteOffer, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

//TODO Replace with actual view

const detailsTemplate = (offer, onDelete) => html`
<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${offer.title}</h1>
        <div>
            <img src=${offer.imageUrl} />
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${offer.description}</p>
        <h4>Date: ${offer.date}</h4>
        <h4>Author: ${offer.author}</h4>
        ${offer.canEdit ? html`
        <div class="buttons">
      
            <a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
            <a class="btn-edit" href="/catalog/${offer._id}/edit">Edit</a>
            <a class="btn-like" href="#">Like</a>
        </div>
        <p class="likes">Likes: 0</p>
        ` : null}
    </div>
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
    ctx.page.redirect('/profile')
}

   }
}