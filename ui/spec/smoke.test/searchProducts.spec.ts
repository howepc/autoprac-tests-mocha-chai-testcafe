// Data
import { env } from "../data/environment.dat";
import { products, IProduct } from "../data/test.dat";

import { using } from "../lib/dataLoop";

// Page Objects
import {
    ProductPg,
} from "../pages/_index.pg";

const productPg = new ProductPg();

fixture `AutoPrac Product Searching`
.page(env.url);

using (products(), (product: IProduct) => {

    test("Search for item: " + product.productName, async (t) => {
        await t
        .maximizeWindow()
        .typeText(productPg.searchField, product.productName)
        .click(productPg.searchButton)
        .click(productPg.productName(product.productName))
        .expect(productPg.productDetailName.textContent).eql(product.productName);
    });
});
