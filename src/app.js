/**
 * Проверка имени пользователя
 * @param {string} name
 * @returns {boolean}
 */

export const nameIsValid = (name) =>
  !!name && name.length >= 2 && !name.includes(" ");

/**
 * Удаление пробелов из строки
 *
 * @param {string} text
 * @returns {string}
 */

export const fullTrim = (text) => (text || "").replace(/\s/g, "");

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
  if (typeof discount !== "number") {
    throw new Error("Скидка должна быть числом");
  }
  if (discount < 0) {
    throw new Error("Процент скидки не может быть отрицательным");
  }
  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  return total - (total * discount) / 100;
};

/**
 * Calculates the total score of all students from a given object
 *
 * @param {Object} students - An object where keys are student names and values are their scores (integers between 1 and 10)
 * @returns {number} The total score of all students
 *
 * @example
 *
 * const studentsScores = {
 *   Alice: 8,
 *   Bob: 7,
 *   Charlie: 9,
 *   Dave: 6
 * };
 *
 * const total = getScore(studentsScores);
 * console.log(total);  // 30
 *
 */
export const getScore = (students) => {
  let totalScore = 0;

  for (let student in students) {
    const score = students[student];
    if (typeof score === "number" && score >= 1 && score <= 10) {
      totalScore += score;
    } else {
      console.error(
        `Invalid score for student ${student}. Scores must be integers between 1 and 10.`,
      );
    }
  }

  return totalScore;
};
