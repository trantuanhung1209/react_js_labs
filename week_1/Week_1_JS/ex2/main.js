let massMark = 78;
let heightMark = 1.95;
let massJohn = 95;
let heightJohn = 1.88;
let BMI;
let markHigherBMI;

function calculateBMI(mass, height) {
  BMI = mass / height ** 2;
  return BMI;
}

function compareBMI() {
  const Mark = calculateBMI(massMark, heightMark).toFixed(2);
  console.log("Mark's BMI is: " + Mark);
  const John = calculateBMI(massJohn, heightJohn).toFixed(2);
  console.log("John's BMI is: " + John);
  if (Mark > John) { 
    markHigherBMI = true;
    console.log("Mark's BMI is higher BMI than John's");
  } else {
    markHigherBMI = false;
    console.log(`John's BMI(${Mark}) is higher BMI(${John}) than Mark's`);
  }
}

compareBMI();