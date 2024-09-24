
/**
 * Сумма баллов по успеваемости
 *
 * @param {'nik': 'string', 'grade': 'number'} score
 * @returns {number}
 */
const getScore = () => {
    const scores = {
      Anna: 10,
      Olga: 9,
      Ivan: 8,
      Aleksey: 17,
      Evgenia: 11
    };
    let sumScores = 0;
    for (let key in scores) {
      sumScores = sumScores + scores[key];
    };
    return sumScores
  };