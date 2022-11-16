export {Game}

import { anthemData } from "./content.js";
import { Player } from "./player.js";
import {insertDescription, insertDescriptionText} from "./description.js";

class Game extends Player {
  constructor(sectionId, array) {
    super(sectionId, array[sectionId]);
    
    this.sectionId = sectionId;
    this.anthemId = array[sectionId];
    this.gameArray = array;
    this.mainPlayer = null;
    this.descPlayer = null;
    this.score = 0;
    this.scoreArray = [];
    this.scoreValue = 5;
    this.answerSet = null;
    this.isAnswer = false;
    this.isPlay = false;
    this.isClick = false;
    this.anthem = new Audio();

    this.nextButton = document.querySelector('.quiz__button');
  }

  initGame() {
    this.mainPlayer = new Player(this.sectionId, this.anthemId);
    this.mainPlayer.init();

    this.insertCountries();
    insertDescriptionText();

    this.answerSet = new Set();

  }

  insertCountries() {
    let node = document.querySelector('.answers__items');
    let insertArray = this.shuffleCountries();

    document.querySelectorAll('.answers__item').forEach((nodes) => {
      nodes.remove();
    });

    for (let i = 0; i < 6; i++) {
      let el = document.createElement('li');
      el.className = 'answers__item';
      el.setAttribute('data-id',insertArray[i]);
      el.innerHTML = `${anthemData[this.sectionId][insertArray[i]].country}`
      node.append(el);
      el.addEventListener('click', (event) => this.checkAnswer(event));
    }
  }

  async writeDescription(event) {

    let id = +event.target.dataset.id;

    this.placeFlag.style.backgroundImage = `url('${anthemData[this.sectionId][id].flag}')`;
    this.placeNameCountry.textContent = anthemData[this.sectionId][id].country;

    let response = await fetch(anthemData[this.sectionId][id].audio);

      if (response.ok) {
        let audio = await response.blob();
        this.anthem.src = URL.createObjectURL(audio);

        this.anthem.addEventListener("loadstart", () => {
          this.playButton.classList.add('load');
          }, false );
        
        this.anthem.addEventListener("loadeddata", () => {
          this.maxTime.textContent = this.getTime(this.anthem.duration);
          this.anthem.volume = .75;
          this.playButton.classList.remove('load');
          }, false );
      }

    document.querySelector('.description__name-rus').textContent = anthemData[this.sectionId][id].nameRussian;
    document.querySelector('.description__name-self').textContent = anthemData[this.sectionId][id].nameSelf;
    document.querySelector('.description__lang').textContent = anthemData[this.sectionId][id].langAnthem;
    document.querySelector('.description__autor').textContent = anthemData[this.sectionId][id].autorAnthem;
    document.querySelector('.description__composer').textContent = anthemData[this.sectionId][id].composer;
    document.querySelector('.description__date-write').textContent = anthemData[this.sectionId][id].dateWrite;
    document.querySelector('.description__date-accept').textContent = anthemData[this.sectionId][id].dateAccept;
  }

  checkAnswer(event) {
    if (!this.isClick) {
      insertDescription();
  
      this.playButton = document.querySelector('.answers__play');
      this.progressBar = document.querySelector('.answers__bar');
      this.volumeButton = document.querySelector('.answers__icon');
      
      this.volumeSlider = document.querySelector('.answers__slider');
      this.volume = document.querySelector('.answers__icon');
      this.volumeSet = document.querySelector('.answers__set');
  
      this.currentTime = document.querySelector('.answers__current');
      this.maxTime = document.querySelector('.answers__length');
  
      this.placeFlag = document.querySelector('.answers__flag');
      this.placeNameCountry = document.querySelector('.answers__title');
      this.init();
    }

    this.writeDescription(event);
    this.isPlay = false;
    let id = +event.target.dataset.id;

    
    if (!this.answerSet.has(id) && !this.isAnswer) {
      if (id === this.gameArray[this.sectionId]) {
          this.score += this.scoreValue;
          this.scoreArray.push(this.scoreValue);
          document.querySelector('.quiz__count').textContent = `Score: ${this.score}`;
          event.target.classList.add('right');
          this.isAnswer = true;
          this.mainPlayer.placeFlag.style.backgroundImage = `url('${anthemData[this.sectionId][id].flag}')`;
          this.mainPlayer.placeNameCountry.textContent = anthemData[this.sectionId][id].country;

          this.nextButton.addEventListener('click', () => this.nextArea());
          if (this.sectionId === 4) {
            this.nextButton.textContent = 'Завершить';
          }

      } else {
          this.scoreValue = (this.scoreValue) ? --this.scoreValue : this.scoreValue;
          event.target.classList.add('wrong');
      }
    }
    this.answerSet.add(id);
  } 

  resetContent() {

    document.querySelector('.control__play').remove();
    document.querySelector('.question__control').insertAdjacentHTML('beforeend','<button class="control__play"></button>');

    document.querySelector('.quiz__button').remove();
    document.querySelector('.quiz__wrapper').insertAdjacentHTML('beforeend','<button class="quiz__button">Дальше</button>');
    this.nextButton = document.querySelector('.quiz__button');

    this.mainPlayer.placeFlag.style.backgroundImage = "url('../../assets/images/flags/flag.png')";
    this.mainPlayer.placeNameCountry.textContent = '*******';

    this.placeFlag.style.backgroundImage = "url('../../assets/images/flags/flag.png')";
    this.placeNameCountry.textContent = '*******';

  }

  shuffleCountries() {
    let array = [this.anthemId];
    let id;

    for(let i = 0; i < 5; i++) {
      do {
        id = Math.floor(Math.random() * ((9-i) + 1))
      } while (array.includes(id))
      array.push(id);
    }

    return array.sort((a,b) => Math.random() - 0.5);
  }

  showQuestion() {
    this.placeFlag.style.backgroundImage = `url(${anthemData[this.sectionId][this.anthemId].flag})`;
    this.placeNameCountry.textContent = `${anthemData[this.sectionId][this.anthemId].country}`;
  }


  nextArea() {

    if (this.sectionId === 4) {
      localStorage.setItem('score', JSON.stringify(this.scoreArray));
      window.location.href = '../result/result.html';
    }

    clearInterval(this.interval);
    clearInterval(this.mainPlayer.interval);
    this.anthem.pause();
    this.anthem.src = '';
    this.mainPlayer.anthem.pause();
    this.mainPlayer.anthem.src = '';

    this.playButton.classList.remove('pause');
    this.mainPlayer.playButton.classList.remove('pause');

    this.mainPlayer.isPlay = false;


    this.scoreValue = 5;
    this.isClick = false;
    this.isPlay = false;
    this.isAnswer = false;
    this.resetContent();
    this.sectionId++;
    this.anthemId = this.gameArray[this.sectionId];
    this.mainPlayer.sectionId = this.sectionId;
    this.mainPlayer.anthemId = this.anthemId;
    this.initGame();
    console.log('end',this.sectionId);
  }

}