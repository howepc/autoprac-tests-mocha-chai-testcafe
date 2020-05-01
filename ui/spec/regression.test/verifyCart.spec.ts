// Data
import { env } from "../data/environment.dat";
import { data } from "../data/test.dat";

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

test("Verify cart contains item: " + data.productName, async (t) => {
    await t.maximizeWindow();
    await signInPg.signInCustomer();
    await productPg.findItemDetail(data.productName);

    await t
    .click(productPg.addToCartButton)
    .click(productPg.closeButton)
    .click(productPg.cartButton)
    .expect(cartPg.cartItem(data.productName).visible).ok();
});
