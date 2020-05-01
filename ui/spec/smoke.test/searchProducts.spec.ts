// Data
import { env } from "../data/environment.dat";
import { data } from "../data/test.dat";

// Page Objects
import {
    ProductPg,
} from "../pages/_index.pg";

const productPg = new ProductPg();

fixture `AutoPrac Product Searching`
.page(env.url);

test("Search for item: " + data.productName, async (t) => {
    await t
    .maximizeWindow()
    .typeText(productPg.searchField, data.productName)
    .click(productPg.searchButton)
    .click(productPg.productName(data.productName))
    .expect(productPg.productDetailName.textContent).eql(data.productName);
});
