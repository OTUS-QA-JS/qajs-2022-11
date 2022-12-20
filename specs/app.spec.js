import { nameIsValid, fullTrim, getTotal } from '../src/app.js'


describe('tests for function nameIsValid', () => {

    test('is function' , () => {
        expect(typeof nameIsValid).toBe("function")
    })

    test('imports without error' , () => {
        expect(nameIsValid).toBeDefined()
    })

    describe('name length', () => {
        describe('' , () => {
            [
                { name: "Иа", expected: true},
                { name: "Кен", expected: true},
                { name: "М", expected: false},
                { name: " ", expected: false},
                { name: "", expected: false},
            ].forEach(({name, expected}) => {
                test(`name length ${name} = ${name.length} ${expected}` ,() => {
                    expect(nameIsValid(name)).toBe(expected)
                })
            })
        })
    })     
})

describe('tests for function fullTrim', () => {

    test('is function' , () => {
        expect(typeof fullTrim).toBe("function")
    })   

    test('imports without error' , () => {
        expect(fullTrim).toBeDefined()
    })

    describe('text trim', () => {
        describe('' , () => {
            [
                { text: "Иа", expected: "Иа"},
                { text: "К  ен", expected: "Кен"},
                { text: "  Мььь", expected: "Мььь"},
                { text: "уауауауауа    ", expected: "уауауауауа"},
                { text: "    ", expected: ""},
            ].forEach(({text, expected}) => {
                test(`text trim ${text} = ${expected}` ,() => {
                    expect(fullTrim(text)).toBe(expected)
                })
            })
        })
    }) 
})

describe('tests for function getTotal', () => {

    test('is function' , () => {
        expect(typeof getTotal).toBe("function")
    })   

    test('imports without error' , () => {
        expect(getTotal).toBeDefined()
    })
    test('The discount must be a number' , () => {
        expect(() => getTotal([{ price: 10, quantity: 10 }], '10')).toThrow()
    })
    test('The discount percentage cannot be negative' , () => {
        expect(() => getTotal([{ price: 10, quantity: 10 }], -10)).toThrow()
    })

    describe('The discount percentage cannot be negative', () => {
            [
                { name: "Киндер",           price: 100,  quantity: 1,  discount: 10,  expected: 90},
                { name: "Молочный шоколад", price: 90,   quantity: 2,  discount: 20,  expected: 144},
                { name: "Мороженое",        price: 70,   quantity: 10, discount: 0,   expected: 700},
                { name: "Пельмени",         price: 60,   quantity: 1,  discount: 200, expected: -60},
                { name: "Пельмени",         price: 60,   quantity: 1,  discount: -10, expected: 'error'},
            ].forEach(({name, price, quantity, discount, expected}) => {
                test(`${name}  ${price} * ${quantity} - ${discount}% = ${expected}` ,() => {
                    if (expected === 'error') {
                        expect(function () {
                            getTotal([{name: name, price: price, quantity: quantity }], discount);
                        }).toThrow();
                    } else {
                    expect(getTotal([{name: name, price: price, quantity: quantity}], discount)).toBe(expected)
                    }
                })
            })
    }) 
})