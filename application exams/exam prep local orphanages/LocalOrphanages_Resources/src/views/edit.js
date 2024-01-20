import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { getById } from "../data/offers.js";
import { updateOffer } from "../data/offers.js";


const editTemplate = (offer, onEdit) => html`
<section id="edit-page" class="auth">
<form id="edit" @submit=${onEdit}>
    <h1 class="title">Edit Post</h1>

    <article class="input-group">
        <label for="title">Post Title</label>
        <input type="title" name="title" id="title" .value=${offer.title}>
    </article>

    <article class="input-group">
        <label for="description">Description of the needs </label>
        <input type="text" name="description" id="description" .value=${offer.description}>
    </article>

    <article class="input-group">
        <label for="imageUrl"> Needed materials image </label>
        <input type="text" name="imageUrl" id="imageUrl" .value=${offer.imageUrl}>
    </article>

    <article class="input-group">
        <label for="address">Address of the orphanage</label>
        <input type="text" name="address" id="address" .value=${offer.address}>
    </article>

    <article class="input-group">
        <label for="phone">Phone number of orphanage employee</label>
        <input type="text" name="phone" id="phone" .value=${offer.phone}>
    </article>

    <input type="submit" class="btn submit" value="Edit Post">
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
      imageUrl,
      address,
      phone
      } 
      ){
        if([title,
          description,
          imageUrl,
          address,
          phone].some(f => f == '')){
                return alert('All fields are required')
            }
        await updateOffer(id, {
          title,
          description,
          imageUrl,
          address,
          phone
        })
        ctx.page.redirect('/catalog/' + id)
    }
}