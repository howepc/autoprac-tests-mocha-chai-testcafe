import { isFunction } from "lodash";

// DATA-DRIVEN LOOP

export type DataSetGenerator<T> = () => Iterable<T>;
export type DataSet<T> = DataSetGenerator<T> | Iterable<T>;

export function using<T>(dataSet: DataSet<T>, func: (testData: T) => void) {
    let effectiveDataSet: Iterable<T>;

    if (isFunction(dataSet)) {
        // Call the function to get the array
        effectiveDataSet = dataSet();
    } else {
        effectiveDataSet = dataSet;
    }

    for (const testData of effectiveDataSet) {
        func(testData);
    }
}
