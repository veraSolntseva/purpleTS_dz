var makeOrdinal = require('./makeOrdinal');
var isFiniteNumber = require('./isFinite');
var isSafeNumber = require('./isSafeNumber');

function toWords(number: number | string, asOrdinal: boolean): string {
    let words: string = '';
    const num = parseInt(String(number), 10);
    if (!isFiniteNumber(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }

    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

const LESS_THAN_TWENTY: readonly string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED: readonly string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

enum Runks {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1000,
    ONE_MILLION = 1000000,
    ONE_BILLION = 1000000000,           //         1.000.000.000 (9)
    ONE_TRILLION = 1000000000000,       //     1.000.000.000.000 (12)
    ONE_QUADRILLION = 1000000000000000, // 1.000.000.000.000.000 (15)
    MAX = 9007199254740992,             // 9.007.199.254.740.992 (15)
}

function generateWords(number: number, words?: string[]): string {
    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    let word: string = '';
    let remainder: number = 0;

    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];

    } else if (number < Runks.ONE_HUNDRED) {
        remainder = number % Runks.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / Runks.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (number < Runks.ONE_THOUSAND) {
        remainder = number % Runks.ONE_HUNDRED;
        word = generateWords(Math.floor(number / Runks.ONE_HUNDRED)) + ' hundred';

    } else if (number < Runks.ONE_MILLION) {
        remainder = number % Runks.ONE_THOUSAND;
        word = generateWords(Math.floor(number / Runks.ONE_THOUSAND)) + ' thousand,';

    } else if (number < Runks.ONE_BILLION) {
        remainder = number % Runks.ONE_MILLION;
        word = generateWords(Math.floor(number / Runks.ONE_MILLION)) + ' million,';

    } else if (number < Runks.ONE_TRILLION) {
        remainder = number % Runks.ONE_BILLION;
        word = generateWords(Math.floor(number / Runks.ONE_BILLION)) + ' billion,';

    } else if (number < Runks.ONE_QUADRILLION) {
        remainder = number % Runks.ONE_TRILLION;
        word = generateWords(Math.floor(number / Runks.ONE_TRILLION)) + ' trillion,';

    } else if (number <= Runks.MAX) {
        remainder = number % Runks.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / Runks.ONE_QUADRILLION)) +
            ' quadrillion,';
    }

    if (word !== undefined)
        words.push(word);

    return generateWords(remainder, words);
}
