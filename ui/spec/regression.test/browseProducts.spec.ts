// Data
import { env } from "../data/environment.dat";
import { data } from "../data/test.dat";

// Page Objects
import {
    ProductPg,
} from "../pages/_index.pg";

const productPg = new ProductPg();

fixture `AutoPrac Product Browsing`
.page(env.url);

test("Browse to view item detail: " + data.productName, async (t) => {
    await t
    .maximizeWindow()
    .click(productPg.mainCategory(data.mainCategory))
    .click(productPg.subCategory(data.subCategory))
    .click(productPg.productName(data.productName))
    .expect(productPg.productDetailName.textContent).eql(data.productName);
});
