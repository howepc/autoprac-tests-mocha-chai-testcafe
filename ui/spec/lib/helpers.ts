import { readFileSync, unlinkSync, writeFileSync } from "fs";
import { Selector, t } from "testcafe";
import { env } from "../data/environment.dat";

/**
 * Generate a unique gmail address for an existing account
 * @param {string} gmailUser - an existing gmail account username
 * @example
 * import { getUniqueGmail } from "../lib/helpers";
 * await getUniqueGmail("autopract");
 */
export function getUniqueGmail(gmailUser?: string) {
    if (gmailUser == null) {
        gmailUser = env.custEmail.split("@")[0];
    }
    const gmailAddress = gmailUser + "+" + Date.now() + "@gmail.com";
    console.log("     Created Gmail address: " + gmailAddress);
    return gmailAddress;
}

/**
 * Select a value in a dropdown field
 * @param {Selector} dropdownObject - a reference to a dropdown page object
 * @param {string} value - value to select from the dropdown
 * @example
 * import { selectDropdown } from "../lib/helpers";
 * await selectDropdown(shoppingCartPage.stateDropdown, "Arizona");
 */
export async function selectDropdown(dropdownObject: Selector, value: string) {
    await t
    .click(dropdownObject)
    .click(dropdownObject.find("option").withText(value));
}

/**
 * Set a checkbox to checked (true) or unchecked (false)
 * @param {Selector} checkboxObject - a reference to a checkbox page object
 * @param {boolean} setChecked - true for checked, false for unchecked
 * @example
 * import { setCheckbox } from "../lib/helpers";
 * await setCheckbox(shoppingCartPage.billingAddressCheckbox, true);
 */
export async function setCheckbox(checkboxObject: Selector, setChecked: boolean) {
    // should become Checked
    if (setChecked === true) {
        if (await checkboxObject.parent().hasClass("checked") === false) {
            await t.click(checkboxObject);
        }
    } else {
        // should become Unchecked
        if (await checkboxObject.parent().hasClass("checked") === true) {
            await t.click(checkboxObject);
        }
    }
}

/**
 * Waits for a progress indicator to appear and then disappear
 * @param {Selector} progIndicator - a TestCafe Selector of the page load indicator
 * @example
 * * for any page that inherits from WebstorePage:
 * await myPage.waitForProgIndicator(myObjectSelector);
 */
export async function waitForProgIndicator(progIndicator: Selector) {
    // wait for page load indicator to appear and disappear
    const loader = await progIndicator.with({ visibilityCheck: true, timeout: 5000 })();
    if (loader != null) {
        await t.expect(progIndicator.visible).notOk();
    }
}

/**
 * Waits for an object to appear
 * @param {Selector} object - a TestCafe Selector of an object
 * @param {number} timeout - optional number of millisends to wait for visibility, defaults to 30000
 * @returns {boolean} true if visible within the timeout period, otherwise false
 * @example
 * await waitForObjectVisible(myObjectSelector, 10000);
 */
export async function waitForObjectVisible(object: Selector, timeout?: number): Promise<boolean> {
    if (timeout == null) { timeout = 30000; }
    let obj: any;
    try {
        obj = await object.with({ visibilityCheck: true, timeout })();
    } catch {
        obj = null;
    }
    if (obj == null) {
        return false;
    } else {
        return true;
    }
}

const sessionCustomerFile = "./sessionCust.txt";

/**
 * Creates a session customer file to store the current customer login
 * @param {string} customerEmail - customer email address to save for future use
 * @example
 * await addSessionCustomer(customerEmail);
 */
export function addSessionCustomer(customerEmail: string): void {
    try {  // attempt to delete the file first
        unlinkSync(sessionCustomerFile);
    } catch {
        // sessionCustomerFile does not exist. Continuing...
    } finally {
        try {  // then create the file with content
            writeFileSync(sessionCustomerFile, customerEmail);
        } catch (e) {
            console.log("     " + e);
        }
    }
}

/**
 * Reads a session customer file to get the current customer login email
 * @returns {string} customer email address to get for future use
 * @example
 * await getSessionCustomer();
 */
export function getSessionCustomer(): string {
    let customerEmail = env.custEmail; // default to environment.dat value
    try {
        customerEmail = readFileSync(sessionCustomerFile).toString();
        console.log("     Using Customer account: " + customerEmail);
    } catch (e) {
        if (e.message.includes("ENOENT")) {  // if a missing file error
            console.log("     Using default Customer account: " + customerEmail);
        } else {
            console.log("     " + e);
        }
    }
    return customerEmail;
}

/**
 * deletes a session customer file
 * @returns {string} customer email address to get for future use
 * @example
 * await delSessionCustomer();
 */
export function delSessionCustomer(): void {
    try {
        unlinkSync(sessionCustomerFile);
    } catch (e) {
        console.log("     " + e);
    }
}
