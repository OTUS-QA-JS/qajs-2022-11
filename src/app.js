/**
 * Проверка имени пользователя
 * @param {string} name
 * @returns {boolean}
 */

export const nameIsValid = (name) => !!name && name.length >= 2 && !name.includes(' ');

/**
 * Удаление пробелов из строки
 *
 * @param {string} text
 * @returns {string}
 */

export const fullTrim = (text) => (text || '').replace(/\s/g, '');

/**
 * Подсчёт суммы заказа
 *
 * @param {[{quantity: number, name?: string, price: number}]} items
 * @param {number} discount
 * @example getTotal([{ price: 10, quantity: 10 }]) // 100
 * @example getTotal([{ price: 10, quantity: 1 }]) // 10
 * @example getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]) // 100
 * @example getTotal([{ price: 10, quantity: 0 }], { price: 10, quantity: 9 }) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 10) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 100) // 0
 */
export const getTotal = (items = [], discount = 0) => {
    if (typeof discount !== 'number') {
        throw new Error('Скидка должна быть числом')
    }
    if (discount < 0) {
        throw new Error('Процент скидки не может быть отрицательным')
    }
    const total = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0)
    return total - total * discount / 100;
}

const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5
}
/**
 * Подсчет суммы баллов всех пользователей
 * @param {{nikeName: number}} object
 * @example getScore({Anna: 10, Olga: 1, Ivan: 5}) // 16
 * @returns {number}
 */

function getScore1(object) {
    let score = 0
    for (let nickname in object) {
        score = score + object[nickname]
    }
    return score
}
