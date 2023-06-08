// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

// function createNumbersArray(count) {

// }

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

// function shuffle(arr) {

// }

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

// function startGame(count) {

// }

(function () {

  document.addEventListener('DOMContentLoaded', function () {

    // создаем стартовое модальное окно
    function createModalStart() {
      const modalStart = document.createElement('div');
      const modalStartWrap = document.createElement('div');
      const modalStartTitle = document.createElement('h2');
      const modalStartBtnWrap = document.createElement('div');
      const modalStartBtnEasy = document.createElement('button');
      const modalStartBtnNorm = document.createElement('button');
      const modalStartBtnHard = document.createElement('button');

      modalStart.classList.add('modal-start');
      modalStartWrap.classList.add('modal-start__wrap');
      modalStartTitle.classList.add('modal-start__title');
      modalStartBtnWrap.classList.add('modal-start__btn-wrap');
      modalStartBtnEasy.classList.add('modal-start__btn', 'btn-easy');
      modalStartBtnNorm.classList.add('modal-start__btn', 'btn-norm');
      modalStartBtnHard.classList.add('modal-start__btn', 'btn-hard');

      modalStartTitle.textContent = 'PICK THE GAME LEVEL';
      modalStartBtnEasy.textContent = 'EASY (4 cards)';
      modalStartBtnNorm.textContent = 'NORM (16 cards)';
      modalStartBtnHard.textContent = 'HARD (36 cards)';

      modalStartBtnEasy.setAttribute('data-value', '4');
      modalStartBtnNorm.setAttribute('data-value', '16');
      modalStartBtnHard.setAttribute('data-value', '36');

      modalStartWrap.append(modalStartTitle);
      modalStartBtnWrap.append(modalStartBtnEasy);
      modalStartBtnWrap.append(modalStartBtnNorm);
      modalStartBtnWrap.append(modalStartBtnHard);
      modalStartWrap.append(modalStartBtnWrap);
      modalStart.append(modalStartWrap);

      return {
        modalStart,
        modalStartTitle,
        modalStartBtnEasy,
        modalStartBtnNorm,
        modalStartBtnHard,
      };
    }

    // создаем финальное модальное окно
    function createModalFinal() {
      let modalFinal = document.createElement('div');
      const modalFinalWrap = document.createElement('div');
      const modalFinalTitle = document.createElement('h2');
      const modalFinalBtn = document.createElement('button');

      modalFinal.classList.add('modal-final');
      modalFinalWrap.classList.add('modal-final__wrap');
      modalFinalTitle.classList.add('modal-final__title');
      modalFinalBtn.classList.add('modal-final__btn');

      modalFinalTitle.textContent = '';
      modalFinalBtn.textContent = 'PLAY AGAIN';

      modalFinalWrap.append(modalFinalTitle);
      modalFinalWrap.append(modalFinalBtn);
      modalFinal.append(modalFinalWrap);

      return {
        modalFinal,
        modalFinalTitle,
        modalFinalBtn,
      };
    }

    // создаем игровое поле
    function createPlayArea() {
      const playArea = document.createElement('div');
      playArea.classList.add('play-area');
      return playArea;
    }

    // создаем карты
    function createPlayCard() {
      const cardWrap = document.createElement('div');
      const cardFront = document.createElement('div');
      const cardBack = document.createElement('div');

      cardWrap.classList.add('play-area__card', 'card');
      cardFront.classList.add('card__front');
      cardBack.classList.add('card__back');

      cardWrap.append(cardFront);
      cardWrap.append(cardBack);

      return {
        cardWrap,
        cardFront,
        cardBack,
      };

    }


    function createTimer() {
      let timer = document.createElement('time');
      timer.classList.add('timer');
      timer.textContent = '';
      return timer;
    }


    // создаем игру
    function createGame(container) {

      // показываем стартовое модальное окно и предлагаем выбрать уровень сложности
      const start = createModalStart();
      document.body.append(start.modalStart)
      document.querySelector('.modal-start').classList.add('active');

      const modalStartBtns = document.querySelectorAll('.modal-start__btn');
      let getLevel;
      // после выбранного уровня и очистки контейнера от предыдущей игры(если была), начинаем новую игру
      function chooseLevel() {
        document.querySelector('.modal-start').classList.remove('active');
        if (this.classList.contains('modal-start__btn')) {
          container.innerHTML = '';
          getLevel = +this.dataset.value;
          startGame();
          // console.log(typeof (getLevel));
        }
        // подгоняем ширину контейнера под кол-во карт
        if (this.classList.contains('btn-easy')) {
          container.setAttribute('style', 'width:200px; padding-top: 60px;');
        } else if (this.classList.contains('btn-norm')) {
          container.setAttribute('style', 'width:400px; padding-top: 40px;');
        } else if (this.classList.contains('btn-hard')) {
          container.setAttribute('style', 'width:600px; padding-top: 20px;');
        }
      }
      modalStartBtns.forEach(btn => btn.addEventListener('click', chooseLevel));


      // показываем финальное модальное окно, после завершения игры
      const final = createModalFinal();
      document.body.append(final.modalFinal);

      document.querySelector('.modal-final__btn').addEventListener('click', () => {
        final.modalFinal.classList.remove('active');
        setTimeout(() => {
          start.modalStart.classList.add('active');
        }, 300);
      });


      // создаем игру, исходя из выбранного уровня сложности в стартовом модальном окне
      function startGame() {

        // настраиваем таймер, в зависимости от уровня сложности и пушим в body
        const playTime = createTimer();
        let min = Math.trunc(getLevel / 10);
        let sec = 59;
        timer = setInterval(function () {
          if (sec < 10) {
            playTime.textContent = `0${min}:0${sec}`;
          } else {
            playTime.textContent = `0${min}:${sec}`;
          }
          sec--;
          if (sec == 0) {
            setTimeout(() => {
              min--;
              sec = 59;
            }, 1000);
          }
          if (sec == -1 && min == 0) {
            clearInterval(timer);
            document.querySelector('.timer').remove();
            document.querySelector('.modal-final').classList.add('active');
            document.querySelector('.modal-final__title').textContent = 'TIME IS OUT :(';
          }
        }, 1000);
        document.body.append(playTime);


        const area = createPlayArea();
        // создаем массив парных чисел и перемешиваем
        let count = [];
        let halfCardSet;
        let amountOfCards = getLevel / 2;

        function shuffle(count) {
          count.sort(() => Math.random() - 0.5);
        }
        for (halfCardSet = 1; halfCardSet <= amountOfCards; halfCardSet++) {
          count.push(halfCardSet, halfCardSet);
          shuffle(count);
        }

        // создаи карты в соответствии со значениями из массива
        for (let numCard = 0; numCard < count.length; numCard++) {
          let card = createPlayCard();
          card.cardFront.textContent = count[numCard];
          // добавляем data-атрибут самой карте со значением карты(будем использовать для сравнения пар карт)
          card.cardWrap.setAttribute('data-value', card.cardFront.textContent);
          area.append(card.cardWrap);
        }
        // пушим в контейнер новую игру
        container.append(area);

        gamePlay();
      }
    }


    function gamePlay() {

      const closeCards = document.querySelectorAll('.card');

      // создаем условную пару карт и boolean-маркеры для отслеживания и работы с реальными парами карт
      let waitSecondCard = false;
      let turnPairOnly = false;
      let firstCard;
      let secondCard;

      function turnAndCheck() {
        // останавливаем функцию, если нажатая карта первая, либо более двух карт
        if (turnPairOnly || this === firstCard) return;
        // переворачиваем карты
        this.classList.add('turned');
        // если первая карта уже перевернута и в режиме ожидания второй, то данная перевернутая карта будет второй в паре
        if (!waitSecondCard) {
          waitSecondCard = true;
          firstCard = this;
          return;
        }
        secondCard = this;
        // проверяем перевернутую пару карт на совпадение
        if (firstCard.dataset.value === secondCard.dataset.value) {
          //  если есть совпадение отключаем клики на совпавшей паре
          firstCard.removeEventListener('click', turnAndCheck);
          secondCard.removeEventListener('click', turnAndCheck);
          // сбрасываем режим ожидания и маркеры
          [waitSecondCard, turnPairOnly] = [false, false];
          [firstCard, secondCard] = [null, null];

          // создаем массив для сверки кол-ва открытых карт
          const openCards = document.querySelectorAll('.turned');
          // console.log(openCards);
          // если массивы идентичны, показываем финальное модальное окно
          setTimeout(() => {
            if (closeCards.length === openCards.length) {
              clearInterval(timer);
              document.querySelector('.timer').remove();
              document.querySelector('.modal-final').classList.add('active');
              document.querySelector('.modal-final__title').textContent = 'GOOD JOB :)';
            }
          }, 600);
        } else {
          turnPairOnly = true;
          // закрываем несовпавшую пару с задержкой 1 сек., чтобы юзер успел увидеть значение карты
          setTimeout(() => {
            // возвращаем несовпавшую пару в исходное состояние
            firstCard.classList.remove('turned');
            secondCard.classList.remove('turned');
            // сбрасываем режим ожидания и маркеры
            [waitSecondCard, turnPairOnly] = [false, false];
            [firstCard, secondCard] = [null, null];
          }, 1000);
        }
      }
      closeCards.forEach(card => card.addEventListener('click', turnAndCheck));
    }

    createGame(container);
  });
})();
