import { html } from "../../node_modules/lit-html/lit-html.js"
import { recent } from "../data/offers.js";

//TODO Replace with actual view

const homeTemplate = (offers) => html`
<section id="welcome-world">

            <div class="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero">

            <div id="home-page">
                <h1>Latest Games</h1>

                <!-- Display div: with information about every game (if any) -->
                ${offers.length > 0 ? offers.map(homeofferCard) : html`
                <p class="no-articles">No games yet</p>
                `}
                
            </div>
        </section>

`;

const homeofferCard = (offer) => html` 
                <div class="game">
                    <div class="image-wrap">
                        <img src=${offer.imageUrl}>
                    </div>
                    <h3>${offer.title}</h3>
                    <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div class="data-buttons">
                        <a href="/catalog/${offer._id}" class="btn details-btn">Details</a>
                    </div>
                </div>`

export  async function homePage(ctx){
    const offers = await recent()
    ctx.render(homeTemplate(offers));
}