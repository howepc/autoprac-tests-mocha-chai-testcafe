import { Selector } from "testcafe";

import { MainPg } from "./Main.pg";

export class CartPg extends MainPg {
    public proceedToCheckoutCartButton = Selector("#center_column").find("span").withText("Proceed to checkout");
    public proceedToCheckoutAddrButton = Selector("#center_column").find("span").withText("Proceed to checkout");
    public proceedToCheckoutShipButton = Selector("#form").find("span").withText("Proceed to checkout");

    public useDelAddressForBillingCheckbox = Selector("#addressesAreEquals");
    public agreeToTermsCheckbox  = Selector("#cgv");
    public payByCheckButton = Selector("a.cheque");
    public confirmOrderButton = Selector("span").withText("I confirm my order");
    public orderConfirmationText = Selector("div.box.order-confirmation");

    public cartItem(name: string) {
        return Selector("tr.cart_item").find("a").withText(name);
    }
}
