/**
 * Takes all functions/objects from the source scope and adds them to target scope.
 * Credit: https://stackoverflow.com/a/59205794/7913061
 * 
 * @param {object} sourceScope
 * @param {object} targetScope
 */
function importAll(sourceScope, targetScope) {
    for (let name in sourceScope) {
      targetScope[name] = sourceScope[name];
    }
}

/**
 * Prototype function to get all colums of an MDC data table.
 * 
 * @returns {[[any]]}
 */
window.mdc.dataTable.MDCDataTable.prototype.getCols = function() {
    return zip(this.getRows().map(r => $(r).children().toArray()));
}

/**
 * Zips any amount of lists together, Python-style.
 * 
 * @param {[[any]]} rows 
 * @returns {[[any]]}
 */
function zip(rows) {
    return rows[0].map((_,c) => rows.map(row => row[c]))
}

/**
 * Returns a random integer between the min and max (exclusive of upper bound).
 * 
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
 function randInt(min, max) {
    if (!Number.isInteger(min)) throw new TypeError('min must be an integer!');
    if (!Number.isInteger(max)) throw new TypeError('max must be an integer!');
    if (min > max) throw new RangeError('min must be less than or equal to max!');

    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Converts an integer to Roman numerals (or a stringified integer).
 * 
 * @param {number} num
 * @returns {string}
 */
function intToRomanNumerals(num) {
    if (!Number.isInteger(num)) throw new TypeError('num must be an integer!');
    if (num < 1 || num > 3999) {
        console.warn(`Value '${num}' was outside of range [1, 3999]!`);
        return num.toString();
    }

    let roman = '',
        romanNumeral = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
        romanValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    for (let i = 0; i < romanNumeral.length; i++) {
        while (num >= romanValue[i]) {
            roman += romanNumeral[i];
            num -= romanValue[i];
        }
    }

    return roman;
}

/**
 * Converts Roman numerals (or a stringified integer) to an integer.
 * 
 * @param {string} roman
 * @returns {number}
 */
function romanNumeralsToInt(roman) {
    if (typeof roman !== 'string') throw new TypeError('roman must be a string!');
    if (roman.length === 0) return 0;

    // If the original value was > 3999 we would have the stringified version
    // of the original digits and should return those.
    if ($.isNumeric(roman)) return parseInt(roman);

    let num = 0,
        romanNumeral = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
        romanValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    for (let i = 0; i < romanNumeral.length; i++) {
        while (roman.startsWith(romanNumeral[i])) {
            num += romanValue[i];
            roman = roman.substring(romanNumeral[i].length);
        }
    }

    return num;
}

/**
 * Applies the given validator to the contents of the given input element.
 * 
 * @param {object} inputElement 
 * @param {function(object): any|null} parser
 * @param {function(number)} validator
 * @returns {boolean}
 */
 function validateInputElement(event, parser, validator) {
    let parsed = parser($(event.target));
    if (parsed === null || !validator(parsed)) $(event.target).val('');
}

/**
 * Attempt to extract a number from the contents of an input element. Returns null on failure.
 * 
 * @param {object} inputElement
 * @returns {number|null}
 */
function numOfInputElement(inputElement) {
    let num;
    try { num = Number.parseFloat(inputElement.val()); }
    catch (_) { return null; }
    return Number.isNaN(num) ? null : num;
}

/**
 * Validates a numerical value against the range (0, inf).
 * 
 * @param {number} num 
 * @returns {number}
 */
function posIntInputValidator(num) { return Number.isInteger(num) && num > 0; }

/**
 * Validates a numerical value against the range [0, inf).
 * 
 * @param {number} num 
 * @returns {number}
 */
function zeroOrPosIntInputValidator(num) { return Number.isInteger(num) && num >= 0; }

/**
 * Validates a numerical value against the range (0.0, inf).
 * 
 * @param {number} num 
 * @returns {number}
 */
function posNumInputValidator(num) { return Number.isFinite(num) && num > 0; }

/**
 * Validates a numerical value against the range [0.0, inf).
 * 
 * @param {number} num 
 * @returns {number}
 */
function zeroOrPosNumInputValidator(num) { return Number.isFinite(num) && num >= 0; }

export {
    importAll,
    zip, randInt,
    intToRomanNumerals, romanNumeralsToInt,
    validateInputElement, numOfInputElement,
    posIntInputValidator, zeroOrPosIntInputValidator, posNumInputValidator, zeroOrPosNumInputValidator
};