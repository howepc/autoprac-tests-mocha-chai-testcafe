import { ClientFunction, Selector } from "testcafe";

export class MainPg {
    public topNavBar = Selector("nav");
    public logo = Selector(".logo");
    public searchField = Selector("#search_query_top");
    public searchButton = Selector(".button-search");
    public cartButton = Selector(".shopping_cart").find("b").withText("Cart");
    public signInMenu = this.topNavBar.find("a").withText("Sign in");
    public contactUsMenu = this.topNavBar.find("a").withText("Contact us");
    public signOutMenu = this.topNavBar.find("a").withText("Sign out");
    public validationMessage = Selector("div.alert").filterVisible();

    public getPageUrl() {
        return ClientFunction(() => window.location.href);
    }

    public getPageTitle() {
        return ClientFunction(() => document.title);
    }

    public navProdGroup(group: string) {
        return Selector("#block_top_menu").find("a").withText(group);
    }

    public async browserBack() {
        const goBack = ClientFunction(() => window.history.back());
        await goBack();
    }
}
