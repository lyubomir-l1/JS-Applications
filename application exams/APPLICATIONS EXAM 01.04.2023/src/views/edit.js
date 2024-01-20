import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { getById } from "../data/offers.js";
import { updateOffer } from "../data/offers.js";


const editTemplate = (offer, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name" .value=${offer.name}
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl" .value=${offer.imageUrl}
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description" .value=${offer.description}
                placeholder="Description"
                rows="10"
                cols="50"
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition" .value=${offer.nutrition}
                placeholder="Nutrition"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`

export async function editPage(ctx){

    const id = ctx.params.id;
    const offer = await getById(id);
    ctx.render(editTemplate(offer, createSumbitHandler(onEdit)))

    async function onEdit({
      name,
      imageUrl, 
      description, 
      nutrition
    
      } 
      ){
        if([name,
          imageUrl, 
          description, 
          nutrition
        ].some(f => f == '')){
                return alert('All fields are required')
            }
        await updateOffer(id, {
          name,
          imageUrl, 
          description, 
          nutrition
        
        })
        ctx.page.redirect('/catalog/' + id)
    }
}