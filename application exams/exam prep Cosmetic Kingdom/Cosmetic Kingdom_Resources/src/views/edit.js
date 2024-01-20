import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { getById } from "../data/offers.js";
import { updateOffer } from "../data/offers.js";


const editTemplate = (offer, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name" .value=${offer.name}
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl" .value=${offer.imageUrl}
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category" .value=${offer.category}
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description" .value=${offer.description}
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price" .value=${offer.price}
                id="product-price"
                placeholder="Price"
              />
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
      category, 
      description, 
      price
      } 
      ){
        if([name,
          imageUrl, 
          category, 
          description, 
          price].some(f => f == '')){
                return alert('All fields are required')
            }
        await updateOffer(id, {
          name,
          imageUrl, 
          category, 
          description, 
          price
        })
        ctx.page.redirect('/catalog/' + id)
    }
}