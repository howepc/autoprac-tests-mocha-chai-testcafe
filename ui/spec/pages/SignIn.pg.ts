import { Role, Selector, t } from "testcafe";

import { env } from "../data/environment.dat";
import { MainPg } from "./Main.pg";

export class SignInPg extends MainPg {
    public emailInput = Selector("#email");
    public passwordInput = Selector("#passwd");
    public signInButton = ("#SubmitLogin");

    // Roles for fast switching in and out of sign ins
    private customer = Role(env.url + "/index.php?controller=authentication", async () => {
        await t
        .typeText(this.emailInput, env.custEmail)
        .typeText(this.passwordInput, env.custPassword)
        .click(this.signInButton);
    });

    // Functions
    public async signIn(username: string, password: string) {
        await t
        .typeText(this.emailInput, username, { replace: true })
        .typeText(this.passwordInput, password, { replace: true })
        .click(this.signInButton);
    }

    public async signInCustomer() {
        await t
        .useRole(this.customer)
        .expect(this.signOutMenu.visible).eql(true);
    }

    public async signOutUser() {
        await t.click(this.signOutMenu);
    }
}
