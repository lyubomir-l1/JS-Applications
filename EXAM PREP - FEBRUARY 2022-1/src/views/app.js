import page from "../../node_modules/page/page.mjs";
import { homeView } from "./homoeView.js";
import { loginView } from "./loginView.js";
import { renderNavigationMiddleware, renderContentMiddleware } from "./middlewares/renderMiddleware.js";

page(renderNavigationMiddleware);
page(renderContentMiddleware);
page('/', homeView);
page('/login', loginView)

page.start() 