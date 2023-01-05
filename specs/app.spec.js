import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/**
 * Для проверки, что jest настроен правильно. Можно удалить
 */
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

/**
 * Тесты для функции проверки имени nameIsValid
 */
describe('tests for nameIsValid function', () => {
    it('is function nameIsValid imported', () => {
        expect(nameIsValid).toBeDefined();
        expect(typeof nameIsValid).toBe('function');
    });
    test.each`
        name            |result 
        ${'Ян'}         |${true}
        ${'Вася'}       |${true}
        ${'A'}          |${false}
        ${''}           |${false}
        ${2}            |${false}
        ${'An '}        |${false}
        ${' An'}        |${false}
        ${'Anna Maria'} |${false}
    `('check name ${name}', ({name, result}) => {
        expect(nameIsValid(name)).toBe(result);
    });
})

/**
 * Тесты для функции удаления пробелов fullTrim
 */
describe('tests for fullTrim function', () => {
    it('is function fullTrim imported', () => {
        expect(fullTrim).toBeDefined();
        expect(typeof fullTrim).toBe('function');
    })
    test.each`
        text                    |result
        ${'Мир, Труд, Май!'}    |${'Мир,Труд,Май!'}
        ${' Hello'}             |${'Hello'}
        ${'Hi '}                |${'Hi'}
        ${' '}                  |${''}
        ${'=^_^='}              |${'=^_^='}
    `('delete spases from ${text}', ({text, result}) => {
        expect(fullTrim(text)).toBe(result);
        }
    );
})

/**
 * Тест для функции подсчёта суммы getTotal
 */
describe('tests for getTotal function', () =>{
    it('is function fullTrim imported', () => {
        expect(getTotal).toBeDefined();
        expect(typeof getTotal).toBe('function');
    })
    test.each([
        {items: [], discount: 'skip', result: 0},
        {items: [{ price: 44, quantity: 1 }], discount: 'skip', result: 44},
        {items: [{ price: 10, quantity: 2 }], discount: 10, result: 18 },
        {items: [{ price: 10, quantity: 2 }, { price: 2, quantity: 5 }], discount: 10, result: 27 },
        {items: [{ price: 10, quantity: 2 }], discount: 100, result: 0 },
        {items: [], discount: 10, result: 0 },
        {items: [{ price: 10, quantity: 2 }], discount: 110, result: -2 },
        {items: [{ price: 10, quantity: 0 }], discount: 10, result: 0 }
    ])('test for getTotal function', ({items, discount, result}) => {
        if(discount === 'skip'){
            expect(getTotal(items)).toBe(result)
        }
        if(discount !== 'skip'){
            expect(getTotal(items, discount)).toBe(result)
        }    
    })
    test.each([
        {items: [{ price: 10, quantity: 2 }], discount: '10', result: 'Скидка должна быть числом' },
        {items: [{ price: 10, quantity: 2 }], discount: -10, result: 'Процент скидки не может быть отрицательным' }
    ])('tests for incorrect discount', ({items, discount, result}) => {
        expect(() => getTotal(items, discount)).toThrow(result);
    })
})