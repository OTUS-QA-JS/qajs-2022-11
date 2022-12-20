import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * Функция nameIsValid
 */
describe('app.js coverage', function() {
    test('"nameIsValid" является функцией и определена.', function() {
        expect(nameIsValid).toBeDefined();
        expect(typeof nameIsValid).toBe('function');
    });
    test('Слово "Dmitry" является именем.', function() {
        expect(nameIsValid('Dmitry')).toBe(true);
    });
    test('Фраза с пробелом не является именем.', function () {
        expect(nameIsValid('Brad Pitt')).toBe(false);
    });
    test('Имена, состоящие менее чем из двух букв не принимаются.', function () {
        expect(nameIsValid('A')).toBe(false);
    })
});

/**
 * Функция fullTrim
 */
describe('app.js coverage', function() {
    test('"fullTrim" является функцией и определена.', function() {
        expect(fullTrim).toBeDefined();
        expect(typeof fullTrim).toBe('function');
    });
    test('Для фразы с пробелом "Благо дарю" возвращается одно слово без пробела "Благодарю".', function() {
        expect(fullTrim('Благо дарю')).toBe('Благодарю');
    });
    test('Если пробелов несколько, то все они удаляются.', function() {
        expect(fullTrim('С С С Р')).toBe('СССР');
    });
    test('Если на вход функции передана НЕ строка, то происходит ошибка.', function() {
        expect(function() {
            return fullTrim(123)
        }).toThrow()
    });
});

/**
 * Функция getTotal
 */
describe('app.js coverage', function() {
    test('"getTotal" является функцией и определена.', function() {
        expect(getTotal).toBeDefined();
        expect(typeof getTotal).toBe('function');
    });
    test('Если на вход функции передано НЕ число, то выдаётся ошибка "Скидка должна быть числом".', function() {
        expect(function() {
            return getTotal([],'Большая скидка!')
        }).toThrow('Скидка должна быть числом')
    });
    test('При отрицательном значении скидки, выдаётся ошибка "Процент скидки не может быть отрицательным".', function() {
        expect(function() {
            return getTotal([],-5)
        }).toThrow('Процент скидки не может быть отрицательным')
    });
});

describe('Параметризированные тесты для getTotal', () => {
    test.each`
    price    | quantity | discount | expected
    ${10}    |  ${10}   |   ${10}  |  ${90}
    ${10}    |  ${10}   |   ${0}   |  ${100}
    ${300}   |  ${1234} |   ${100} |  ${0}
    ${99.99} |  ${1234} |   ${5}   |  ${117218.27699999999}
    `('$price * $quantity – $discount% = $expected', ({price, quantity, discount, expected}) => {
        if (expected === 'error') {
            expect(() => getTotal([{price, quantity}], discount)).toThrow();
        } else {
            expect(getTotal([{price, quantity}], discount)).toBe(expected);
        }
    });
});