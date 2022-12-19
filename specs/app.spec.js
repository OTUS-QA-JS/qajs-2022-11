import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('nameIsValid', () => {
    it('function is defined' , () => {
        expect(nameIsValid()).toBeDefined()
    })
    it('nameIsValid is function' , () => {
        expect(typeof nameIsValid).toBe('function')
    })
    it('name is truthy' , () => {
        expect(nameIsValid(0)).toBeFalsy()
    })
    it('name length can be 2 letters' , () => {
        expect(nameIsValid('Al')).toBeTruthy()
    })
    it('name length can be 3 letters' , () => {
        expect(nameIsValid('Alш')).toBeTruthy()
    })
    it("name length can't be 1 letter" , () => {
        expect(nameIsValid('A')).toBeFalsy()
    })
    it('name is not includes space' , () => {
        expect(nameIsValid('A liyah')).toBeFalsy()
    })
})

describe('fullTrim', () => {
    it('function is defined' , () => {
        expect(fullTrim()).toBeDefined()
    })
    it('fullTrim is function' , () => {
        expect(typeof fullTrim).toBe('function')
    })
    describe('remove spaces from a string' , () => {
        [
            {text: 'qwer ', result: 'qwer'},
            {text: ' qwer', result: 'qwer'},
            {text: ' qwer ', result: 'qwer'},
            {text: ' ', result: ''},
            {text: '', result: ''},
            {text: 'qw er ', result: 'qwer'},

        ].forEach(({text, result}) => {
            it(`returns ${result} for ${text}`, () => {
                expect(fullTrim(text)).toBe(result);
              });
        })
    })

})

describe('getTotal', () => {
    it('function is defined' , () => {
        expect(getTotal()).toBeDefined()
    })
    it('getTotal is function' , () => {
        expect(typeof getTotal).toBe('function')
    })
    it('throws error if discount a string' , () => {
        expect(() => getTotal([{ price: 10, quantity: 10 }], '10')).toThrow()
    })
    it('throws error if discount less than 0' , () => {
        expect(() => getTotal([{ price: 10, quantity: 10 }], -10)).toThrow()
    })
    describe('' , () => {
        [
            { items : [{price: 10, quantity: 10 }], discount: 10, total: 90},
            { items : [{price: 10, quantity: 10 }], discount: 0, total: 100},
            { items : [{price: 10, quantity: 10 }], discount: 100, total: 0},
        ].forEach(({items, discount, total}) => {
            it(`returns total:${total} with discount:${discount}` ,() => {
                expect(getTotal(items, discount)).toEqual(total)
            })
        })
    })

})

