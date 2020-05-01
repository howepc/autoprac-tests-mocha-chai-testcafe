import { Selector, t } from "testcafe";

import { MainPg } from "./Main.pg";

export class ProductPg extends MainPg {
    public quickView = Selector("a.quick-view").find("span").withText("Quick view");
    public productDetailName = Selector("h1[itemprop=name]");
    public twitterButton = Selector("button.btn-twitter");
    public facebookButton = Selector("button.btn-facebook");
    public googlePlusButton = Selector("button.btn-google-plus");
    public pinterestButton = Selector("button.btn-pinterest");
    public addToCartButton = Selector("button.exclusive");
    public closeButton = Selector(".cross");

    public mainCategory(name: string) {
        return Selector("ul.sf-menu").find("a").withText(name);
    }

    public subCategory(name: string) {
        return Selector("li").withText(name).find(".replace-2x");
    }

    public productName(name: string) {
        return Selector("div.product-container").find("a.product-name").withText(name);
    }

    public productImage(name: string) {
        // return Selector("a.product-name").withText(name);
        return Selector("img[title='" + name + "']");
    }

    // Functions for repetitive tasks outside of a test's scope
    public async findItemDetail(item: string) {
        await t
        .typeText(this.searchField, item)
        .click(this.searchButton)
        .click(this.productName(item))
        .expect(this.productDetailName.textContent).eql(item);
    }

    public async addItemToCart(item: string) {
        await this.findItemDetail(item);
        await t
        .click(this.addToCartButton)
        .click(this.closeButton)
        .click(this.cartButton);
    }
}
