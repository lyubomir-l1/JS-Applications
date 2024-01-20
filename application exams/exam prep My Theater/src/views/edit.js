import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { getById } from "../data/offers.js";
import { updateOffer } from "../data/offers.js";


const editTemplate = (offer, onEdit) => html`
<section id="editPage">
            <form class="theater-form" @submit=${onEdit}>
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" .value=${offer.title}>
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${offer.date}>
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                    .value=${offer.author}>
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">.value=${offer.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                    .value=${offer.imageUrl}>
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`

export async function editPage(ctx){

    const id = ctx.params.id;
    const offer = await getById(id);
    ctx.render(editTemplate(offer, createSumbitHandler(onEdit)))

    async function onEdit({
      title,
      date,
      author,
      imageUrl,
      description
      } 
      ){
        if([title,
          date,
          author,
          imageUrl,
          description].some(f => f == '')){
                return alert('All fields are required')
            }
        await updateOffer(id, {
          title,
          date,
          author,
          imageUrl,
          description
        })
        ctx.page.redirect('/catalog/' + id)
    }
}