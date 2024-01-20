import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllBooks } from "../data/services.js";
import { bookPriview } from "./common.js";

//TODO Replace with actual view

const homeTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${
  books.length == 0 
  ? html`<p class="no-books">No books in database!</p>` 
  : html`<ul class="other-books-list">
   ${books.map(bookPriview)}
  </ul>`
}
</section>

`;

export async function homePage(ctx){
  const books = await getAllBooks();
  console.log(books);
    ctx.render(homeTemplate(books));
}