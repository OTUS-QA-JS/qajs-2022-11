import { TestScheduler } from 'jest';
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
describe('App test 100% coverage', () => {

    test('To make sure that the name is invalid', () => {
        expect(nameIsValid('Sergey Abramov')).toBe(false)
    });
    
    test('To make sure that the name is valid', () => {
        expect(nameIsValid('Sergey')).toBe(true)
    }); 
    
    test('To make sure that there are no spaces in the string', () => {
        expect(fullTrim('String without spaces')).toBe('Stringwithoutspaces')
    });

    test('To throw an error when discount is not a number', () => {
        expect(function () {
            getTotal([{ quantity: 10, price: 10, }], 'five percents')
        }).toThrow();
    });
    test('To throw an error when discount is < 0', () => {
        expect(function () {
            getTotal([{ quantity: 10, price: 10, }], -1)
        }).toThrow();
    });
    test('That Total is count correctly 10 * 10 = 100', () => {
        expect(getTotal([{ quantity: 10, price: 10 }])).toBe(100);
    });
    test('That Total is count correctly 10 * 10 = 100 - 10% = 90', () => {
        expect(getTotal([{ quantity: 10, price: 10 }], 10)).toBe(90);
    });
    test('That Total is count correctly 10 * 1 = 10', () => {
        expect(getTotal([{ quantity: 1, price: 10 }])).toBe(10);
    });
});
    test('That Total is count correctly 10 * 9 = 90', () => {
        expect(getTotal([{ quantity: 0, price: 10 }, {quantity: 10, price: 9}])).toBe(90);
});

describe('Параметризированный тест приложения', () => {
    test.each`
quantity | price | discount             | expected
${1}     | ${10} | ${0}                 | ${10}
${1}     | ${10} | ${50}                | ${5}
${10}    | ${10} | ${0}                 | ${100}
${10}    | ${1}  | ${0}                 | ${10}
${10}    | ${10} | ${10}                | ${90}
${10}    | ${10} | ${100}               | ${0}
${10}    | ${10} | ${'five percent'}    | ${'error'}
${10}    | ${10} | ${-1}                | ${'error'}
`('$quantity $price $discount = $expected', function ({ quantity, price, discount, expected }) {
    if (expected === 'error') {
        expect(function () {
            getTotal([{ quantity, price }], discount);
        }).toThrow();
    } else {
        expect(getTotal([{ quantity, price }], discount)).toBe(expected)
    }
});
})
// К сожалению, не удаётся добиться 100 % покрытия - выдаёт что 16-35 строки не покрыты тестами хотя я вроде тестирую что в стринге нет пробелов буду признателен за фидбек.=)