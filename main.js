const baseURL = `https://opentdb.com/api.php?amount=10&type=multiple`;

// Getters
const question = document.querySelector(`#question`);
const answers = document.querySelector(`#answers`);
const next = document.querySelector(`#next`);
const scoreSpan = document.querySelector(`.score`);
// console.log(question, answers, next)

// Variables
let updatedResults;
let index = 0;
let score = 0;

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
  //   fetch(baseURL)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(EvalError));
  const qs = await fetch(baseURL);
  const qsJson = await qs.json();
  //   console.log(qsJson);

  updatedResults = qsJson.results.map((q) => {
    q.incorrect_answers.push(q.correct_answer);
    return q;
  });

  //   console.log(updatedResults);
  updateQuestion();
};

next.addEventListener(`click`, () => {
  index++;

  if (index >= updatedResults.length) {
    question.innerHTML = `GAME OVER`;
    answers.innerHTML = ``;
  } else {
    answers.innerHTML = ``;
    updateQuestion();
  }
  answers.style.pointerEvents = `auto`;
});

answers.addEventListener(`click`, (event) => {
  console.log(event.target.innerHTML);
  console.log(updatedResults[index].correct_answer);
  if (event.target.innerHTML === updatedResults[index].correct_answer) {
    score += 10;
    scoreSpan.innerHTML = score;
    event.target.style.backgroundColor = `lightgreen`;
    event.target.style.border = `2px solid green`;
  } else {
    event.target.style.backgroundColor = `red`;
    event.target.style.border = `2px solid maroon`;
  }
  answers.style.pointerEvents = `none`;
});
getQuestions();
