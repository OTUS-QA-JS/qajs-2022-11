import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

//nameIsValid()========================================
describe ('Функция Проверки имени пользователя', () => {

    test ('принимает корректное имя', () => {
        expect(nameIsValid('Сима')).toBe(true);
    })

    test ('не принимает несуществующее имя', () => {
        expect(nameIsValid('')).toBe(false);
    }) 

    test ('не принимает имя короче двух символов', () => {
        expect(nameIsValid('С')).toBe(false);
    })

})

//fullTrim()===========================================
describe ('Функция Удаления пробелов', () => {

    test ('не меняет текст при отсутсвии пробелов', () => {
        expect(fullTrim('Сима')).toBe('Сима');
    })

    test ('удаляет один пробел', () => {
        expect(fullTrim('С има')).toBe('Сима');
    }) 

    test ('удаляет несколько пробелов, включая идущие подряд', () => {
        expect(fullTrim('С и м    а')).toBe('Сима');
    })

})

//getTotal()===========================================
describe ('Функция Подсчёта суммы заказа', () => {

    test.each ([
        [[{price: 10, quantity: 10}], 0, 100],
        [[{price: 20, quantity: 1}], 10, 18],
        [[{price: 0, quantity: 10}], 0, 0],
        [[{price: 10, quantity: 10}, {price: 10, quantity: 10}], 10, 180],
        [[{price: 20, quantity: 1}, {price: 10, quantity: 10}], 90, 12],
    ]) ('корректно считает сумму заказа с учетом скидки и по нескольким товарам', (items, discount, expected) => {
        expect(getTotal(items, discount)).toBe(expected);
    })

    test ('не принимает строковую скидку', () => {
        expect(getTotal([{price: 10, quantity: 10}], '10')).toThrow(Error('Скидка должна быть числом'));
    })

    test ('не принимает отрицательную скидку', () => {
        expect(getTotal([{price: 10, quantity: 10}], -10)).toThrow(Error('Процент скидки не может быть отрицательным'));
    })
})
