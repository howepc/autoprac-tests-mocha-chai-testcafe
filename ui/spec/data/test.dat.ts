// NOTE: Add new data type field and default data as you see fit.
// These will be available in intellisense as properties of the interface object.

export interface IProduct {
	mainCategory: string;
	subCategory: string;
	productName: string;
}

const defaultProduct: IProduct = {
    mainCategory: "DRESSES",
    subCategory: "SUMMER DRESSES",
    productName: "Printed Chiffon Dress",
};


import { readCSV } from "../lib/helpers";

export function products(): IProduct[] {

    let records: any;
    const csvFile = ("./spec/data/" + process.env.TEST_DATA_CSV || "none");
    if (csvFile === "none") {
        records = [defaultProduct];
    } else {
        records = readCSV(csvFile);
    }
    return records;
}
