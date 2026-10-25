const questions = [
  { q: "Which language is used to style web pages?", options: ["HTML", "CSS", "Python", "SQL"], answer: 1 },
  { q: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Making Language"], answer: 0 },
  { q: "Which keyword defines a function in Python?", options: ["function", "func", "def", "define"], answer: 2 },
  { q: "Which symbol starts a comment in Python?", options: ["//", "#", "/*", "--"], answer: 1 },
  { q: "Which command saves your changes into Git history?", options: ["git push", "git add", "git commit", "git clone"], answer: 2 },
  { q: "Which JavaScript method selects an element by its id?", options: ["getElementById", "querySelectorAll", "getElementsByTag", "selectId"], answer: 0 },
  { q: "What is the output of len([1, 2, 3]) in Python?", options: ["2", "3", "4", "Error"], answer: 1 }
];

let current = 0;
let score = 0;
let answered = false;

const $ = (id) => document.getElementById(id);

function showQuestion() {
  answered = false;
  const item = questions[current];
  $("progressText").textContent = `Question ${current + 1} of ${questions.length}`;
  $("scoreText").textContent = `Score: ${score}`;
  $("question").textContent = item.q;
  $("feedback").textContent = "";
  $("nextBtn").hidden = true;
  $("nextBtn").textContent = current === questions.length - 1 ? "See result" : "Next";

  const box = $("options");
  box.textContent = "";
  item.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(index));
    box.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  const correct = questions[current].answer;
  const buttons = $("options").children;

  Array.from(buttons).forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.classList.add("correct");
  });

  if (index === correct) {
    score++;
    $("feedback").textContent = "Correct!";
  } else {
    buttons[index].classList.add("wrong");
    $("feedback").textContent = "Wrong. The right answer is highlighted.";
  }
  $("scoreText").textContent = `Score: ${score}`;
  $("nextBtn").hidden = false;
}

function showResult() {
  $("quizBox").hidden = true;
  $("resultBox").hidden = false;
  $("finalScore").textContent = `${score} / ${questions.length}`;
  const pct = score / questions.length;
  $("message").textContent =
    pct === 1 ? "Perfect score!" : pct >= 0.6 ? "Good job! Keep practising." : "Keep learning and try again.";
}

$("nextBtn").addEventListener("click", () => {
  current++;
  if (current < questions.length) showQuestion();
  else showResult();
});

$("restartBtn").addEventListener("click", () => {
  current = 0;
  score = 0;
  $("resultBox").hidden = true;
  $("quizBox").hidden = false;
  showQuestion();
});

showQuestion();
