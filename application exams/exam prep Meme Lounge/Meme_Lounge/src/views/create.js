import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { createOffer } from "../data/offers.js"

const createTemplate = (onCreate) => html`
<section id="create-meme">
<form id="create-form" @submit=${onCreate}>
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>
`

export function createPage(ctx) {
  ctx.render(createTemplate(createSumbitHandler(onCreate)))

  async function onCreate({
    title,
    description,
    imageUrl
  
  }
  ) {
    if ([title,
      description,
      imageUrl
    ].some(f => f == '')) {
      return alert('All fields are required')
    }
    await createOffer({
      title,
      description,
      imageUrl
    
    })
    ctx.page.redirect('/catalog')
  }
}