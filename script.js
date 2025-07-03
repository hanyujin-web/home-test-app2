document.addEventListener("DOMContentLoaded", () => {
  const progressBarInner = document.getElementById('progress-bar-inner');
  const startScreen = document.getElementById('start-screen');
  const questionScreen = document.getElementById('question-screen');
  const resultScreen = document.getElementById('result-screen');
  const startBtn = document.getElementById('start-btn');
  const backBtn = document.getElementById('back-btn');
  const questionText = document.getElementById('question-text');
  const questionImage = document.getElementById('question-image');
  const answerBtns = document.querySelectorAll('.answer-btn');
  const progressText = document.getElementById('progress-text');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  const restartBtn = document.getElementById('restart-btn');
  const counterEl = document.getElementById('counter');

  const questions = [
    { question: "나른한 햇살에 깬 주말 아침, <br>당신의 선택은?", answers: ["이불 속에서 뒹굴뒹굴 더 잔다", "친구를 만나러 갈 준비한다"], image: "img/question1.png" },
    { question: "약속 전날, 친구에게서 카톡이 왔다! <br>'미안.. 내일 못 놀 것 같아ㅠㅠ'", answers: ["오히려 좋아! 푹 쉬어야지", "괜찮아! 다른 약속이라도 잡아야지"], image: "img/question2.png" },
    { question: "새로 생긴 카페 소식에 당신은?", answers: ["사람 많은 곳은 딱히..", "당장 가야해 바로 공유해야겠다!"], image: "img/question3.png" },
    { question: "친구에게서 카톡이 왔다! <br>'지금 잠깐 나올래?'", answers: ["아… 갑자기? 미안… 안돼!", "어딘데? 당장 나갈게!"], image: "img/question4.png" },
    { question: "가장 많은 시간을 보내는 최애 공간은?", answers: ["침대, 소파 눕는 게 최고야", "핫플이 넘치는 집 밖이 최고야"], image: "img/question5.png" },
    { question: "다가오는 연휴, <br>3일 연속 쉬는 날이 생겼다!", answers: ["이런 날에는 무조건 집콕이지!", "하루가 아까워! 나가서 놀아야지"], image: "img/question6.png" }
  ];

  let currentQuestion = 0;
  let homeScore = 0;
  let outScore = 0;
  const answerHistory = [];

  function showQuestion() {
    const q = questions[currentQuestion];
    questionText.innerHTML = q.question;
    questionImage.src = q.image;
    answerBtns[0].textContent = q.answers[0];
    answerBtns[1].textContent = q.answers[1];
    progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
    progressBarInner.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    answerBtns.forEach((btn, i) => {
      btn.classList.remove('show');
      setTimeout(() => btn.classList.add('show'), 100 + i * 150);
    });
  }

  function animateCounter(element, start, end, duration) {
    let startTime = null;
    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentNumber = Math.floor(progress * (end - start) + start);
      element.textContent = currentNumber.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counterEl) animateCounter(counterEl, 0, 1357, 1000);

  function showResult() {
    questionScreen.style.display = 'none';
    document.getElementById('loading-screen').style.display = 'flex';

    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      resultScreen.style.display = 'block';
      resultScreen.classList.remove('result-mint', 'result-pink', 'result-vi');

      if (homeScore >= outScore + 2) {
        resultTitle.textContent = "초강력 집순이";
        resultDesc.textContent = "당신은 집과 하나 된 진정한 집순이!";
        document.querySelector(".result-image img").src = "img/result1.png";
        resultScreen.classList.add('result-mint');
        setGauges(40, 80, 20);
        setSummary(["이불 밖은 위험해 포근한 침대가 최고", "혼자서도 잘 놀아요. 혼자 놀기 마스터!", "갑작스러운 약속은 당황스러워요"]);
      } else if (outScore >= homeScore + 2) {
        resultTitle.textContent = "밖순이 모험러";
        resultDesc.textContent = "세상에 흥미가 넘쳐나는 진정한 밖순이!";
        document.querySelector(".result-image img").src = "img/result2.png";
        resultScreen.classList.add('result-pink');
        setGauges(80, 20, 70);
        setSummary(["하고 싶은 게 너무 많아! 사람 구경이 최고", "오늘은 어디가지? 맛집, 쇼핑 마스터!", "갑작스러운 약속도 오케이!"]);
      } else {
        resultTitle.textContent = "집밖 밸런서";
        resultDesc.textContent = "집도 좋고, 밖도 좋은 완벽한 밸런서!";
        document.querySelector(".result-image img").src = "img/result3.png";
        resultScreen.classList.add('result-vi');
        setGauges(70, 50, 50);
        setSummary(["집에도 잘 있고 밖에서도 잘 노는 맞춤형!", "내향과 외향 그 사이 어딘가", "뭐든 상관없어! 맞춰주는 게 편해요"]);
      }
    }, 2500);
  }

  function setGauges(energy, adventure, lightning) {
    const gauges = document.querySelectorAll(".gauge-fill");
    gauges.forEach(g => g.style.width = "0%");
    setTimeout(() => {
      gauges[0].style.width = `${energy}%`;
      gauges[1].style.width = `${adventure}%`;
      gauges[2].style.width = `${lightning}%`;
    }, 150);
  }

  function setSummary(texts) {
    document.querySelector(".result-summary").innerHTML = texts.map(line => `<p>· ${line}</p>`).join("");
  }

  startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    questionScreen.style.display = 'flex';
    showQuestion();
  });

  answerBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const selected = e.currentTarget.dataset.value;
      if (selected === "1") { homeScore++; answerHistory.push("home"); }
      else if (selected === "2") { outScore++; answerHistory.push("out"); }
      currentQuestion++;
      if (currentQuestion < questions.length) showQuestion();
      else { progressBarInner.style.width = `100%`; showResult(); }
    });
  });

  backBtn.addEventListener('click', () => {
    if (currentQuestion === 0) {
      questionScreen.style.display = 'none';
      startScreen.style.display = 'flex';
    } else {
      currentQuestion--;
      const lastAnswer = answerHistory.pop();
      if (lastAnswer === "home") homeScore--;
      else if (lastAnswer === "out") outScore--;
      showQuestion();
    }
  });

  restartBtn.addEventListener('click', () => {
    resultScreen.style.display = 'none';
    startScreen.style.display = 'flex';
    currentQuestion = 0;
    homeScore = 0;
    outScore = 0;
    answerHistory.length = 0;
  });
});

