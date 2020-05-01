import { Selector, t } from "testcafe";

import { MainPg } from "./Main.pg";

export class AccountPg extends MainPg {
    // create account
    public emailNewInput = Selector("#email_create");
    public createAccountButton = Selector("#SubmitCreate");
    public titleOption = Selector("#id_gender2");
    public firstNameNewInput = Selector("#customer_firstname");
    public lastNameNewInput = Selector("#customer_lastname");
    public passwordInput = Selector("#passwd");
    public address1Input = Selector("#address1");
    public cityInput = Selector("#city");
    public stateDropdown = Selector("#id_state");
    public postalcodeInput = Selector("#postcode");
    public phoneMobileInput = Selector("#phone_mobile");
    public registerButton = Selector("#submitAccount");

    // my account
    public myPesonalInfoButton = Selector("li a[title=Information]");
    public firstNameEditInput = Selector("#firstname");
    public lastNameEditInput = Selector("#lastname");
    public emailEditInput = Selector("#email");

    public stateSelection(state: string) {
        return Selector("option").withText(state);
    }
}
