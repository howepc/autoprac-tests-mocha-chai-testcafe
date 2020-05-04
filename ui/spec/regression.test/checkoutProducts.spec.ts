// Data
import { env } from "../data/environment.dat";
import { getProducts, IProduct } from "../data/test.dat";

import { using } from "../lib/theory";
import { setCheckbox } from "../lib/helpers";

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
        await productPg.addItemToCart(product.productName);

        await t.click(cartPg.proceedToCheckoutCartButton);
        await setCheckbox(cartPg.useDelAddressForBillingCheckbox, true);
        await t.click(cartPg.proceedToCheckoutAddrButton);
        await setCheckbox(cartPg.agreeToTermsCheckbox, true);
        await t
        .click(cartPg.proceedToCheckoutShipButton)
        .click(cartPg.payByCheckButton)
        .click(cartPg.confirmOrderButton)
        .expect(cartPg.orderConfirmationText.textContent).contains("Your check must include:");
    });
});
