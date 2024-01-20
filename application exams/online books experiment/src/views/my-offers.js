import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyOffers } from "../data/offers.js";
import { getUserData } from "../util.js";


const myOffersTemplate = (offers) => html`
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>

            <ul class="my-books-list">
            ${offers.length > 0 ? offers.map(offerCard) : html`
            <p class="no-books">No books in database!</p>
            `}
            </ul>
            
        </section>

`
const offerCard = (offer) => html`
                <li class="otherBooks">
                    <h3>${offer.title}</h3>
                    <p>Type: ${offer.type}</p>
                    <p class="img"><img src=${offer.imageUrl}></p>
                    <a class="button" href="/catalog/${offer._id}>Details</a>
                </li>`
export async function myOffersPage(ctx){
    const userData = getUserData()
    const offers = await getMyOffers(userData._id)
    ctx.render(myOffersTemplate(offers))
}