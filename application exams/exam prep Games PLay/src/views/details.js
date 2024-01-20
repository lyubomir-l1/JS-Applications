import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteOffer, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

//TODO Replace with actual view

const detailsTemplate = (offer, onDelete) => html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${offer.imageUrl} />
                    <h1>${offer.title}</h1>
                    <span class="levels">MaxLevel: ${offer.maxLevel}</span>
                    <p class="type">${offer.category}</p>
                </div>

                <p class="text">
                ${offer.summary}
                </p>

                ${offer.canEdit ? html`
                <div class="buttons">
                    <a href="/catalog/${offer._id}/edit" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
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
    ctx.page.redirect('/')
}

   }
}