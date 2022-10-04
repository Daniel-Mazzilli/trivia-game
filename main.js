// Fetch url
const baseURL = `https://opentdb.com/api.php?amount=10`;
let category;
const multiChoice = `&type=multiple`;

// Getters
const question = document.querySelector(`#question`);
const answers = document.querySelector(`#answers`);
const select = document.querySelector(`select`);
const form = document.querySelector(`form`);

// Variables
let updatedResults;
let index = 0;
let score = 0;

// Game functionality
form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  getQuestions();
});

const updateQuestion = () => {
  question.innerHTML = updatedResults[index].question;
  for (let i = 0; i < 4; i++) {
    const div = document.createElement(`div`);
    const randomNum = Math.floor(
      Math.random() * updatedResults[index].incorrect_answers.length
    );
    div.innerHTML = updatedResults[index].incorrect_answers.splice(
      randomNum,
      1
    );
    answers.append(div);
  }
};

const getQuestions = async () => {
  if (select.value) {
    category = `&category=` + select.value;
  } else {
    category = ``;
  }
  const qs = await fetch(baseURL + category + multiChoice);
  const qsJson = await qs.json();

  updatedResults = qsJson.results.map((q) => {
    q.incorrect_answers.push(q.correct_answer);
    return q;
  });
  updateQuestion();
};

// next.addEventListener(`click`, () => {
//   index++;

//   if (index >= updatedResults.length) {
//     question.innerHTML = `GAME OVER`;
//     answers.innerHTML = ``;
//   } else {
//     answers.innerHTML = ``;
//     updateQuestion();
//   }
//   answers.style.pointerEvents = `auto`;
// });

answers.addEventListener(`click`, (event) => {
  console.log(event.target.innerHTML);
  console.log(updatedResults[index].correct_answer);
  if (event.target.innerHTML === updatedResults[index].correct_answer) {
    score += 10;
    scoreSpan.innerHTML = score;
    event.target.style.backgroundColor = `lightgreen`;
  } else {
    event.target.style.backgroundColor = `red`;
  }
  answers.style.pointerEvents = `none`;
});
