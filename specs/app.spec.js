import { nameIsValid, fullTrim, getTotal } from '../src/app.js'



describe ('checking nameIsValid function', () => {
    it ('load without error', () => {
        expect (nameIsValid()).toBeDefined ()
    })
    it ('false if username = 1 symbol', () => {
        expect (nameIsValid('u')).toBeFalsy ()
    })
    it ('false if username include space', () => {
        expect (nameIsValid('us er')).toBeFalsy ()
    })
    it ('true if username = 3 symbols', () => {
        expect (nameIsValid('use')).toBeTruthy ()
    })
});

describe ('checking fullTrim function', () => { 
    it ('delete space before word', () => {
        expect (fullTrim(' user')).toBe ('user')
    })
    it ('delete space after word', () => {
        expect (fullTrim('user ')).toBe ('user')
    })
    it ('delete space between words', () => {
        expect (fullTrim('us er')).toBe ('user')
    })
    it ('replace spaces to empty string', () => {
        expect (fullTrim('    ')).toBe ('')
    })
});

describe('ckecking getTotal function', () => {
    it('work with all arguments', () => {
        expect(getTotal([{name: 'milk', price: 10, quantity: 10}], 10)).toBe(90)
    })
    it('work without name', () => {
        expect(getTotal([{price: 10, quantity: 10}], 10)).toBe(90)
    })
    it('work without discount ', () => {
        expect(getTotal([{price: 10, quantity: 10}])).toBe(100)
    })
    it('work if discount = 0', () => {
        expect(getTotal([{price: 10, quantity: 10}], 0)).toBe(100)
    })
    it('error if discount is not number', () => {
        expect(function() {
            getTotal([{price: 10, quantity: 10}], 'ten')
        }).toThrowError('Скидка должна быть числом')
    })
    it('error if discount < = 0', () => {
        expect(function() {
            getTotal([{price: 10, quantity: 10}], -10)
        }).toThrowError('Процент скидки не может быть отрицательным')
    })
    it.each`
    name         | price | quantity | discount | expected
    ${'milk'}    | ${10} | ${10}    | ${10}    | ${90}
    ${'bananas'} | ${5}  | ${5}     | ${0}     | ${25}
    ${'beef'}    | ${50} | ${10}    | ${50}    | ${250}   
    `('$name: $price * $quantity - $discount% = $expected', ({ name, price, quantity, discount, expected }) => {
        expect(getTotal([{name: name, price: price, quantity: quantity}], discount)).toBe(expected);
    })
})