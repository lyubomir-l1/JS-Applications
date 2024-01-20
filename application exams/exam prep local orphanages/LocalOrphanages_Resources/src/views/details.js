import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteOffer, getById } from "../data/offers.js";
import { getUserData } from "../util.js";

//TODO Replace with actual view

const detailsTemplate = (offer, onDelete) => html`
<section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src=${offer.imageUrl} alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${offer.title}</h2>
                        <p class="post-description">Description: ${offer.description}</p>
                        <p class="post-address">Address: ${offer.address}</p>
                        <p class="post-number">Phone number: ${offer.phone}</p>
                        <p class="donate-Item">Donate Materials: ${offer.materials}</p>

                        <!--Edit and Delete are only for creator-->
                        ${offer.canEdit ? html`
                        <div class="btns">
                            <a href="/catalog/${offer._id}/edit" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>

                            <!--Bonus - Only for logged-in users ( not authors )-->
                            <a href="#" class="donate-btn btn">Donate</a>
                        </div>
                        ` : null}
                    </div>
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