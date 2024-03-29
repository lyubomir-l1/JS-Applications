import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSumbitHandler } from "../util.js"
import { createOffer } from "../data/offers.js"

const createTemplate = (onCreate) => html`
<section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form class="create-form" @submit=${onCreate}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`

export function createPage(ctx) {
  ctx.render(createTemplate(createSumbitHandler(onCreate)))

  async function onCreate({
    brand,
    model, 
    imageUrl, 
    release, 
    designer, 
    value
  
  }
  ) {
    if ([brand,
      model, 
      imageUrl, 
      release, 
      designer, 
      value
    ].some(f => f == '')) {
      return alert('All fields are required')
    }
    await createOffer({
      brand,
      model, 
      imageUrl, 
      release, 
      designer, 
      value    
    })
    ctx.page.redirect('/catalog')
  }
}