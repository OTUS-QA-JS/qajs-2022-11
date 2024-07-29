/**
 * Функция для подсчета суммы баллов по успеваемости студентов.
 * @param {Object} scores - Объект, в котором ключи представляют собой имена студентов, а значения - их успеваемость.
 * @returns {number} - Сумма всех баллов.
 */
function getScore(scores) {
  let sum = 0;
  for (let key in scores) {
    sum += scores[key];
  }
  return sum;
}

const scores = {
  Anna: 10,
  Olga: 1,
  Ivan: 5,
};
getScore(scores); // 16
