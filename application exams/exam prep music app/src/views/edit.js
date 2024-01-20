import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { getById } from "../data/offers.js";
import { updateOffer } from "../data/offers.js";


const editTemplate = (offer, onEdit) => html`
<section class="editPage">
<form @submit=${onEdit}>
    <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
            <label for="name" class="vhide">Album name</label>
            <input id="name" name="name" class="name" type="text" .value=${offer.name}>

            <label for="imgUrl" class="vhide">Image Url</label>
            <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${offer.imgUrl}>

            <label for="price" class="vhide">Price</label>
            <input id="price" name="price" class="price" type="text" .value=${offer.price}>

            <label for="releaseDate" class="vhide">Release date</label>
            <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${offer.releaseDate}>

            <label for="artist" class="vhide">Artist</label>
            <input id="artist" name="artist" class="artist" type="text" .value=${offer.artist}>

            <label for="genre" class="vhide">Genre</label>
            <input id="genre" name="genre" class="genre" type="text" .value=${offer.genre}>

            <label for="description" class="vhide">Description</label>
            <textarea name="description" class="description" rows="10"
                cols="10">${offer.description}</textarea>

            <button class="edit-album" type="submit">Edit Album</button>
        </div>
    </fieldset>
</form>
</section>
`

export async function editPage(ctx){

    const id = ctx.params.id;
    const offer = await getById(id);
    ctx.render(editTemplate(offer, createSumbitHandler(onEdit)))

    async function onEdit({
      name,
      imgUrl,
      price,
      releaseDate,
      artist,
      genre,
      description
      } 
      ){
        if([ name,
          imgUrl,
          price,
          releaseDate,
          artist,
          genre,
          description].some(f => f == '')){
                return alert('All fields are required')
            }
        await updateOffer(id, {
          name,
          imgUrl,
          price,
          releaseDate,
          artist,
          genre,
          description
        })
        ctx.page.redirect('/catalog/' + id)
    }
}