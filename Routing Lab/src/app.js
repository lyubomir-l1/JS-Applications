import page from '../node_modules/page/page.mjs';
import { homePage } from './views/home.js';
import { addRender } from './middlewears/render.js';
import { catalogPage } from './views/catalog.js';
import { aboutPage } from './views/about.js';



page(addRender)
page('/index.html', '/')
page('/', homePage)
page('/catalog', catalogPage)
page('/about', aboutPage)

page.start()



