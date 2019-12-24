function numWordTc(currency) {
    var currencyDigits = currency;
    var MAXIMUM_NUMBER = 99999999999.99;
    var CN_ZERO = "零";
    var CN_ONE = "壹";
    var CN_TWO = "貳";
    var CN_THREE = "叁";
    var CN_FOUR = "肆";
    var CN_FIVE = "伍";
    var CN_SIX = "陸";
    var CN_SEVEN = "柒";
    var CN_EIGHT = "捌";
    var CN_NINE = "玖";
    var CN_TEN = "拾";
    var CN_HUNDRED = "佰";
    var CN_THOUSAND = "仟";
    var CN_TEN_THOUSAND = "萬";
    var CN_HUNDRED_MILLION = "億";
    var CN_SYMBOL = "";
    var CN_DOLLAR = "元";
    var CN_TEN_CENT = "角";
    var CN_CENT = "分";
    var CN_INTEGER = "正";
    var integral;
    var decimal;
    var outputCharacters;
    var parts;
    var digits, radices, bigRadices, decimals;
    var zeroCount;
    var i, p, d;
    var quotient, modulus;

    currencyDigits = currencyDigits.toString();

    // validation
    // Empty input!
    if (currencyDigits == "") {
        return "Empty input!";
    }

    // do not include ",", "." and digit
    // Invalid characters in the input string!
    if (currencyDigits.match(/[^,.\d]/) != null) {
        return "Invalid characters in the input string!";
    }

    // check format
    // Illegal format of digit number!
    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
        return "Illegal format of digit number!";
    }

    // check max number, max is 11 digit.
    // Too large a number to convert!
    currencyDigits = currencyDigits.replace(/,/g, ""); // replace ","
    currencyDigits = currencyDigits.replace(/^0+/, ""); // replace the beginning of "0"
    if (Number(currencyDigits) > MAXIMUM_NUMBER) {
        return "Too large a number to convert!";
    }


    parts = currencyDigits.split(".");
    if (parts.length > 1) {
        integral = parts[0];
        decimal = parts[1];
        decimal = decimal.substr(0, 2);
    }
    else {
        integral = parts[0];
        decimal = "";
    }

    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
    decimals = new Array(CN_TEN_CENT, CN_CENT);
    outputCharacters = "";
    if (Number(integral) > 0) {
        zeroCount = 0;
        for (i = 0; i < integral.length; i++) {
            p = integral.length - i - 1;
            d = integral.substr(i, 1);
            quotient = p / 4;
            modulus = p % 4;
            if (d == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    outputCharacters += digits[0];
                }
                zeroCount = 0;
                outputCharacters += digits[Number(d)] + radices[modulus];
            }

            if (modulus == 0 && zeroCount < 4) {
                outputCharacters += bigRadices[quotient];
            }
        }
        outputCharacters += CN_DOLLAR;
    }

    if (decimal != "") {
        for (i = 0; i < decimal.length; i++) {
            d = decimal.substr(i, 1);
            if (d != "0") {
                outputCharacters += digits[Number(d)] + decimals[i];
            }
        }
    }

    if (outputCharacters == "") {
        outputCharacters = CN_ZERO + CN_DOLLAR;
    }

    if (decimal == "") {
        outputCharacters += CN_INTEGER;
    }
    outputCharacters = CN_SYMBOL + outputCharacters;

    return outputCharacters;

}


function numWord(currency) {
    var currencyDigits = currency;
    var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    var result = "";

    currencyDigits = currencyDigits.toString();
    currencyDigits = currencyDigits.replace(/[\, ]/g, '');

    // Empty input!
    if (currencyDigits == "") {
        return "Empty input!";
    }

    // check whether is number
    if (currencyDigits != parseFloat(currencyDigits)){
        return 'not a number';
    }

    // check format
    // Illegal format of digit number!
    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
        return "Illegal format of digit number!";
    }

    // check max number, max is 11 digit
    var x = currencyDigits.indexOf('.');
    if (x == -1)
        x = currencyDigits.length;
    if (x > 11)
        return 'too big';


    var parts = currencyDigits.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (parts[i] == '1') {
                str += tn[Number(parts[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (parts[i] != 0) {
                str += tw[parts[i] - 2] + ' ';
                sk = 1;
            }
        } else if (parts[i] != 0) {
            str += dg[parts[i]] + ' ';
            if ((x - i) % 3 == 0)
                str += 'Hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk)
                str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }

    // decimal
    if (x != currencyDigits.length) {
        var y = currencyDigits.length;
        
        str += 'point ';
        var limit = x + 2; // only 2 decimal points
        for (var i = x + 1; i < y; i++){
            str += dg[parts[i]] + ' ';

            if(i == limit) 
                break;
        }

    }
    result = str.replace(/\s+/g, ' ');
    result += "Dollars";


    return result;
}


var input = "999.999,123";

console.info(numWordTc(input));

console.info(numWord(input));