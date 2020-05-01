// Data
import { env } from "../data/environment.dat";

// Page Objects
import { SignInPg } from "../pages/_index.pg";

const signInPg = new SignInPg();

fixture `AutoPrac Login`
.page(env.url);

test("Missing email address", async (t) => {
    const expectedError = "An email address required.";
    await t
    .maximizeWindow()
    .click(signInPg.signInMenu)
    .typeText(signInPg.passwordInput, env.custPassword, { replace: true })
    .click(signInPg.signInButton);

    await t.expect(signInPg.validationMessage.innerText).contains(expectedError);
});

test("Missing password", async (t) => {
    const expectedError = "Password is required.";
    await t
    .maximizeWindow()
    .click(signInPg.signInMenu)
    .typeText(signInPg.emailInput, env.custEmail, { replace: true })
    .click(signInPg.signInButton);

    await t.expect(signInPg.validationMessage.innerText).contains(expectedError);
});

test("Email address has incorrect format", async (t) => {
    const expectedError = "Invalid email address.";
    await t
    .maximizeWindow()
    .click(signInPg.signInMenu)
    .typeText(signInPg.emailInput, "notAnEmail", { replace: true })
    .typeText(signInPg.passwordInput, env.custPassword, { replace: true })
    .click(signInPg.signInButton);

    await t.expect(signInPg.validationMessage.innerText).contains(expectedError);
});

test("Invalid Credentials", async (t) => {
    const expectedError = "Authentication failed.";
    await t
    .maximizeWindow()
    .click(signInPg.signInMenu)
    .typeText(signInPg.emailInput, env.custEmail, { replace: true })
    .typeText(signInPg.passwordInput, env.custPassword + "x", { replace: true })
    .click(signInPg.signInButton);

    await t.expect(signInPg.validationMessage.innerText).contains(expectedError);
});

test("Successful Login", async (t) => {
    await t
    .maximizeWindow()
    .click(signInPg.signInMenu)
    .typeText(signInPg.emailInput, env.custEmail, { replace: true })
    .typeText(signInPg.passwordInput, env.custPassword, { replace: true })
    .click(signInPg.signInButton)
    .expect(signInPg.signOutMenu.visible).eql(true);
});
