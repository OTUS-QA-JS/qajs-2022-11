import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

describe('Проверка имени пользователя', () => {
    test('Нормальное имя', () => {
        expect(nameIsValid('Alex')).toBe(true)
    });

    test('Больше одного символа в строке>', () => {
        expect(nameIsValid('Al')).toBe(true)
    });

    test('Пустая строка', () => {
        expect(nameIsValid('')).toBe(false)
    });

    test('Пробел', () => {
        expect(nameIsValid(' ')).toBe(false)
    });

    test('Один символ в строке', () => {
        expect(nameIsValid('A')).toBe(false)
    });

    test('Одна цифра', () => {
        expect(nameIsValid(1)).toBe(false)
    });

    test('Больше одной цифры', () => {
        expect(nameIsValid(12)).toBe(false)
    });

    test('Булево значение', () => {
        expect(nameIsValid(false)).toBe(false)
    })
})

describe('Проверка имени пользователя с параметризацией', () => {
    test.each`
        name      | expected
        ${'Alex'} | ${true}
        ${'Al'}   | ${true}
        ${''}     | ${false}
        ${' '}    | ${false}
        ${'A'}    | ${false}
        ${1}      | ${false}
        ${12}     | ${false}
        ${false}  | ${false}
    `('$name = $expected', ({ name, expected }) => {
        expect(nameIsValid(name)).toBe(expected)
    })
})


describe('Удаление пробелов из строки', () => {
    test('Удаление пробола', () => {
        expect(fullTrim('Удалить проблел из строки')).toBe('Удалитьпроблелизстроки')
    });

    test('Удаление только пробела', () => {
        expect(fullTrim(' ')).toBe('')
    });

    test('Пустая строка', () => {
        expect(fullTrim('')).toBe('')
    });

    test('Цифра', () => {
        expect(() => {
            fullTrim(4).toThrow(TypeError)
        })
    });

    test('Булево значение true', () => {
        expect(() => {
            fullTrim(true).toThrow(TypeError)
        })
    })
})

describe('Удаление пробелов из строки с параметризацией', () => {
    test.each`
        str    | expected
        ${' '} | ${''}
        ${''}  | ${''}
        `('$str = $expected', ({ str, expected }) => {
        expect(fullTrim(str)).toBe(expected)
    })
})

describe('Удаление пробелов из строки с параметризацией негативные', () => {
    test.each`
        str
        ${4}
        ${true}
        `('$str = $expected', ({ str }) => {
        expect(() => {
            fullTrim(str).toThrow()
        })
    })
})

describe('Подсчёт суммы заказа', () => {
    test('Использование значения discount по умолчанию 0', () => {
        expect(getTotal([{ price: 10, quantity: 10 }])).toBe(100)
    }),

    test('Несколько item', () => {
        expect(getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }])).toBe(100)
    }),

    test('Использование значения discount не по умолчанию 0', () => {
        expect(getTotal([{ price: 10, quantity: 10 }], 100)).toBe(0)
    })
})

describe('Подсчёт суммы заказа с параметризацией', () => {
    test.each`
    items                                                       | discount | expected
    ${[{ price: 10, quantity: 10 }]}                            | ${0}     | ${100}
    ${[{ price: 10, quantity: 0 }, { price: 10, quantity: 9 }]} | ${0}     | ${90}
    ${[{ price: 10, quantity: 10 }]}                            | ${100}   | ${0}
    `('$items $discount = $expected', ({ items, discount, expected }) => {
        expect(getTotal(items, discount)).toBe(expected)
    })
})
