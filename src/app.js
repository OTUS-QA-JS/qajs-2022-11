const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5,
    }

    const getScore=(scores) => {
    let sum = 0;
    for (let key in scores) {
        sum += scores[key];
}
    }
    console.log(getScore=(scores));