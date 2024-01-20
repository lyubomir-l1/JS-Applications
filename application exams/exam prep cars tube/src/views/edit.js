import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { getById } from "../data/offers.js";
import { updateOffer } from "../data/offers.js";


const editTemplate = (offer, onEdit) => html`
<section id="edit-listing">
<div class="container">

    <form id="edit-form" @submit=${onEdit}>
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" .value=${offer.brand}>

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" .value=${offer.model}>

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" .value=${offer.description}>

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" .value=${offer.year}>

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${offer.imageUrl}>

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" .value=${offer.price}>

        <hr>
        <input type="submit" class="registerbtn" value="Edit Listing">
    </form>
</div>
</section>
`

export async function editPage(ctx){

    const id = ctx.params.id;
    const offer = await getById(id);
    ctx.render(editTemplate(offer, createSumbitHandler(onEdit)))

    async function onEdit({
      brand,
      model,
      description,
      year,
      imageUrl,
      price
    
      } 
      ){
        if([brand,
          model,
          description,
          year,
          imageUrl,
          price
        ].some(f => f == '')){
                return alert('All fields are required')
            }
        await updateOffer(id, {
          brand,
          model,
          description,
          year,
          imageUrl,
          price
        
        })
        ctx.page.redirect('/catalog/' + id)
    }
}