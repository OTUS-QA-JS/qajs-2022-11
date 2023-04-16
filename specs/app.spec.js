import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/* 
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});
 */

describe('function nameIsValid coverage', () => {
    test('nameIsValid is true', () => {
        expect(nameIsValid('???')).toBe(true)
    });
    test('nameIsValid is false if length = 1', () => {
        expect(nameIsValid('?')).toBe(false)
    });
    test('nameIsValid is false if includes spaceButt', () => {
        expect(nameIsValid(' ')).toBe(false)
    });
});

describe('function fullTrim coverage', () => {
    test('fullTrim delete space from string', () => {
        expect(fullTrim(' ')).toBe('')
    });
    test('fullTrim delete two spaces from string with symbol', () => {
        expect(fullTrim(' ? ')).toBe('?')
    });
    test('fullTrim throws an error when get a number', () => {
        expect(() => fullTrim(1)).toThrow();
    });
})


/* 
describe('function getTotal parametric coverage', () => {
    test.each`
    price   | quantity      | result
    ${10}   | ${10}         |   ${100}
    ${10}   | ${1}          |   ${10}
    ${10}   | ${0}          |   ${0}
    ${0}    | ${10}          |   ${0}
    ${10}   | ${10}         |   ${100}
    ${-1}   | ${10}         |   ${10}
    ${-1}   | ${-1}         |   ${1}
    ${10}   | ${10}         |   ${'error'}
    ${'?'}   | ${-1}        |   ${'error'}
    ${100}   | ${'?'}       |   ${'error'}
    `('$function $quantity $result', ({price, quantity, result}) => {
        if(result === 'error') {
            expect(() => getTotal(price, '*', quantity)).toThrow
        } else {
            expect('amount of order', () => {
                expect(getTotal(price, '*', quantity)).toBe(result)
            })
        }
    })
    
})
// После написания теста выше, я понял что он вообще не работает
// и не проверяет работу getTotal впринципе.
// Вижу что items это массив с объектом и его параметрами, но как его
// разложить по параметрам, а потом это вызвать я понятия не имею.
// 
 */
