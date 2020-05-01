// Data
import { env } from "../data/environment.dat";

// Page Objects
import {
    AccountPg,
    SignInPg,
} from "../pages/_index.pg";

import {
    getUniqueGmail,
    selectDropdown,
} from "../lib/helpers";

const accountPg = new AccountPg();
const signInPg = new SignInPg();

fixture `AutoPrac`
.page(env.url);

test("Create Account", async (t) => {
    env.custEmail = getUniqueGmail();

    await t
    .click(accountPg.signInMenu)
    .typeText(accountPg.emailNewInput, env.custEmail)
    .click(accountPg.createAccountButton)
    .click(accountPg.titleOption)
    .typeText(accountPg.firstNameNewInput, "Auto")
    .typeText(accountPg.lastNameNewInput, "Prac")
    .typeText(accountPg.passwordInput, "password")
    .typeText(accountPg.address1Input, "MyStreet")
    .typeText(accountPg.cityInput, "MyCity");
    // .click(accountPg.stateDropdown)
    // .click(accountPg.stateSelection("North Carolina"))
    selectDropdown(accountPg.stateDropdown, "North Carolina");
    await t
    .typeText(accountPg.postalcodeInput, "27500")
    .typeText(accountPg.phoneMobileInput, "5555551234")
    .click(accountPg.registerButton);
});

test("Login and verify account info", async (t) => {
    await t
        .click(signInPg.signInMenu)
        .typeText(signInPg.emailInput, env.custEmail)
        .typeText(signInPg.passwordInput, env.custPassword)
        .click(signInPg.signInButton)
        .click(accountPg.myPesonalInfoButton)
        .expect(accountPg.firstNameEditInput.value).eql("Auto")
        .expect(accountPg.lastNameEditInput.value).eql("Prac")
        .expect(accountPg.emailEditInput.value).eql(env.custEmail);
});
