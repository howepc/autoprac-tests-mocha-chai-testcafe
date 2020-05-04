// Data
import { env } from "../data/environment.dat";
import { getProducts, IProduct } from "../data/test.dat";

import { using } from "../lib/theory";

// Page Objects
import {
    CartPg,
    SignInPg,
    ProductPg,
} from "../pages/_index.pg";

const cartPg = new CartPg();
const signInPg = new SignInPg();
const productPg = new ProductPg();

fixture `AutoPrac Shopping Cart`
.page(env.url);

using (getProducts(), (product: IProduct) => {

    test("Verify cart contains item: " + product.productName, async (t) => {
        await t.maximizeWindow();
        await signInPg.signInCustomer();
        await productPg.findItemDetail(product.productName);

        await t
        .click(productPg.addToCartButton)
        .click(productPg.closeButton)
        .click(productPg.cartButton)
        .expect(cartPg.cartItem(product.productName).visible).ok();
    });
});
