// Data
import { env } from "../data/environment.dat";
import { products, IProduct } from "../data/test.dat";

import { using } from "../lib/dataLoop";

// Page Objects
import { ProductPg } from "../pages/_index.pg";

const productPg = new ProductPg();

fixture `AutoPrac Product Browsing`
.page(env.url);

using (products(), (product: IProduct) => {

    test("Browse to view item detail: " + product.productName, async (t) => {
        await t
        .maximizeWindow()
        .click(productPg.mainCategory(product.mainCategory))
        .click(productPg.subCategory(product.subCategory))
        .click(productPg.productName(product.productName))
        .expect(productPg.productDetailName.textContent).eql(product.productName);
    });
});
