// Data
import { env } from "../data/environment.dat";
import { data } from "../data/test.dat";

// Page Objects
import {
    ProductPg,
} from "../pages/_index.pg";

const productPg = new ProductPg();

fixture `AutoPrac Product Social Media Sharing`
.page(env.url);

test("Verify social media sharing links", async (t) => {
    await t.maximizeWindow();
    await productPg.findItemDetail(data.productName);

    await t
    .expect(productPg.twitterButton.getAttribute("onclick"))
        .contains("socialsharing_twitter_click('")
    .expect(productPg.facebookButton.getAttribute("onclick"))
        .contains("socialsharing_facebook_click();")
    .expect(productPg.googlePlusButton.getAttribute("onclick"))
        .contains("socialsharing_google_click();")
    .expect(productPg.pinterestButton.getAttribute("onclick"))
        .contains("socialsharing_pinterest_click('http://automationpractice.com/img/p/");
});
