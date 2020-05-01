// Data
import { env } from "../data/environment.dat";
import { data } from "../data/test.dat";

// Page Objects
import {
    CartPg,
    SignInPg,
    ProductPg,
} from "../pages/_index.pg";

import { setCheckbox } from "../lib/helpers";

const cartPg = new CartPg();
const signInPg = new SignInPg();
const productPg = new ProductPg();

fixture `AutoPrac Shopping Cart`
.page(env.url);

test("Verify cart contains item: " + data.productName, async (t) => {
    await t.maximizeWindow();
    await signInPg.signInCustomer();
    await productPg.addItemToCart(data.productName);

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
