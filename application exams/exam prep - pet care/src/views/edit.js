import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { getById } from "../data/offers.js";
import { updateOffer } from "../data/offers.js";


const editTemplate = (offer, onEdit) => html`
<section id="editPage">
<form class="editForm" @submit=${onEdit}>
    <img src="./images/editpage-dog.jpg">
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" .value=${offer.name}>
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" .value=${offer.breed}>
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" .value=${offer.age}>
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" .value=${offer.weight}>
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" .value=${offer.image}>
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>

`

export async function editPage(ctx){

    const id = ctx.params.id;
    const offer = await getById(id);
    ctx.render(editTemplate(offer, createSumbitHandler(onEdit)))

    async function onEdit({
      name,
      breed,
      age,
      weight,
      image
      } 
      ){
        if([ name,
          breed,
          age,
          weight,
          image].some(f => f == '')){
                return alert('All fields are required')
            }
        await updateOffer(id, {
          name,
          breed,
          age,
          weight,
          image
        })
        ctx.page.redirect('/catalog/' + id)
    }
}