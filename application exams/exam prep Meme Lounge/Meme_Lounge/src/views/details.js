import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteOffer, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

//TODO Replace with actual view

const detailsTemplate = (offer, onDelete) => html`
<section id="meme-details">
<h1>Meme Title: Bad code can present some problems

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${offer.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
        ${offer.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${offer.canEdit ? html`
        <a class="button warning" href="/catalog/${offer._id}/edit">Edit</a>
        <button class="button danger" @click=${onDelete} href="javascript:void(0)">Delete</button>
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
    ctx.page.redirect('/catalog')
}

   }
}