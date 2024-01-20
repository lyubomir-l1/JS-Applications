import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { getById } from "../data/offers.js";
import { updateOffer } from "../data/offers.js";


const editTemplate = (offer, onEdit) => html`
<section id="edit-meme">
            <form id="edit-form" @submit=${onEdit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${offer.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">
                    ${offer.description}
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${offer.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`

export async function editPage(ctx){

    const id = ctx.params.id;
    const offer = await getById(id);
    ctx.render(editTemplate(offer, createSumbitHandler(onEdit)))

    async function onEdit({
      title,
      description,
      imageUrl
      } 
      ){
        if([ title,
          description,
          imageUrl].some(f => f == '')){
                return alert('All fields are required')
            }
        await updateOffer(id, {
          title,
          description,
          imageUrl
        })
        ctx.page.redirect('/catalog/' + id)
    }
}