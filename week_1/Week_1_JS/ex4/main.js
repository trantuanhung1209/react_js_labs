
const billValues = [275, 40, 430];

billValues.forEach(billValue => {
  const tip = billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;
  const total = billValue + tip;

  console.log(`The bill was ${billValue}, the tip was ${tip.toFixed(2)}, and the total value ${total.toFixed(2)}`);
});