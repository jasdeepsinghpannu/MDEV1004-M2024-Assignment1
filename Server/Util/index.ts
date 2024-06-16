export function SanitizeArray(inputString: string): string[] {

    let unsantiziedArray = inputString.split(',');
    // Create a new Empty Array
    let sanitizedArray = Array<string>();
    // Iterate over the unsantizedArray and trim each string
    for (const unsantizedString of unsantiziedArray) {
        sanitizedArray.push(unsantizedString.trim());
    }
    return sanitizedArray;
}