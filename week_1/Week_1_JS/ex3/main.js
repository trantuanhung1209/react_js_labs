
const dolphinsData = [96, 108, 89];
const koalasData = [98, 98, 110];
const dolphinDataBonus = [98, 115, 101];
const koalasDataBonus = [109, 220, 123];

function calculateAverage(scores) {
  const sum = scores.reduce((acc, cur) => acc + cur, 0);
  return sum / scores.length;
}

const dolphinsAverage = calculateAverage(dolphinsData);
const koalasAverage = calculateAverage(koalasData);

if (dolphinsAverage > koalasAverage) {
  console.log(`Dolphins ${dolphinsAverage} win Koalas ${koalasAverage}`);
} else if (koalasAverage > dolphinsAverage) {
  console.log(`Koalas ${koalasAverage} win Dolphins ${dolphinsAverage}`);
} else   
 {
  console.log(`It's a draw`);
}

const dolphinsScoreValid = dolphinDataBonus.every(score => score >= 100);
const koalasScoreValid = koalasDataBonus.every(score => score >= 100);

if (dolphinsAverage > koalasAverage && dolphinsScoreValid) {
  console.log(`Dolphins win with an average score of ${dolphinsAverage}`);
} else if (koalasAverage > dolphinsAverage && koalasScoreValid) {
  console.log(`Koalas win with an average score of ${koalasAverage}`);
} else if (dolphinsAverage === koalasAverage && dolphinsScoreValid && koalasScoreValid) {
  console.log(`It's a draw`);
} else {
  console.log(`No team wins`);
}