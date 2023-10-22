const getScore = () => {
  const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5,
    Aleksei: 7,
    Max: 3,
    Evgen: 9
  };
  let sumScores = 0;
  for (let key in scores) {
    sumScores = sumScores + scores[key];
  };
  return sumScores
};
getScore(scores)