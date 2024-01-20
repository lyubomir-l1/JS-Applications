import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteOffer, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

//TODO Replace with actual view

const detailsTemplate = (offer, onDelete) => html`
<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${offer.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${offer.name}</h1>
            <h3>Breed: ${offer.breed}</h3>
            <h4>Age: ${offer.age}</h4>
            <h4>Weight: ${offer.weight}</h4>
            <h4 class="donation">Donation: 0$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->
        
        <div class="actionBtn">
        ${offer.canEdit ? html`
            <a href="/catalog/${offer._id}/edit" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            <!--(Bonus Part) Only for no creator and user-->
            <a href="#" class="donate">Donate</a>
        </div>
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
    ctx.page.redirect('/')
}

   }
}