'use strict';
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '世界で一番キモいのは?', c: ['koh', 'ネズミ', 'ゴキブリ']},
    {q: 'この中で科学的に最も汚いのは?', c: ['くうあのベッド', '山中の口の中', 'ゴキブリ']},
    {q: '一番幸せなのは?', c: ['マッチョ', 'ネッチョ', 'パリピニート']},
    {q: '三笠ホテルカレーパンの値段は?', c: ['350円', '290円', '210円']},
    {q: '常連といえば?', c: ['ブルーチーズのガーデンサラダとアイスコーヒー', 'バナナキャラメルフレンチトーストのバニラアイストッピング', '三笠ホテルカレーとレモネード']},
  ]);
  let currentNum = 0;
  let isAnsered;
  let score = 0;


  function shuffle(arr) {

    for (let i = arr.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i +1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnsered) {
      return;
    }
    isAnsered = true;
    if(li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled')
  }

  function setQuiz() {
    isAnsered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffleChoices = shuffle([...quizSet[currentNum].c]);
    // console.log(quizSet[currentNum].c);
    shuffleChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'show score';
    };
  }
  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `${quizSet.length}問中${score}問正解　ざまあｗ`;
      result.classList.remove('hidden');
    } else {
          currentNum++;
    setQuiz();
    }

  });
  }
