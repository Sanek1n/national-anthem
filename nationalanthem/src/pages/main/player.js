export { Player }

import { anthemData } from "./content.js";

class Player {
  
  constructor(section, id) {
    this.sectionId = section;
    this.anthemId = id;
    this.interval = null;

    this.isPlay = false;
    this.anthem = new Audio();
    this.playButton = document.querySelector('.control__play');
    this.progressBar = document.querySelector('.progress__bar');
    this.volumeButton = document.querySelector('.volume__icon');
    
    this.volumeSlider = document.querySelector('.volume__slider');
    this.volume = document.querySelector('.volume__icon');
    this.volumeSet = document.querySelector('.volume__set');

    this.currentTime = document.querySelector('.progress__current');
    this.maxTime = document.querySelector('.progress__length');

    this.placeFlag = document.querySelector('.question__flag');
    this.placeNameCountry = document.querySelector('.question__title');

  }

  init() {
    this.playButton.addEventListener('click', () => {this.anthemPlayToggle()});

    this.progressBar.addEventListener("click", (event) => {
      const timelineWidth = window.getComputedStyle(event.target).width;
      const timeToSeek = event.offsetX / parseInt(timelineWidth) * this.anthem.duration;
      this.anthem.currentTime = timeToSeek;
    }, false);

    this.interval = window.setInterval(() => {
      this.progressBar.value = this.anthem.currentTime / (this.anthem.duration || 1) * 100;
      this.currentTime.textContent = this.getTime(this.anthem.currentTime);
    }, 100);

    this.initVolumeControl();

  }

  async anthemPlayToggle() {
    if (!this.anthem.src) {
      let response = await fetch(anthemData[this.sectionId][this.anthemId].audio);

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
    }

    if (this.isPlay) {
        this.anthem.pause();
        this.isPlay = false;
        this.playButton.classList.remove('pause');
    } else {
        this.isPlay = true;
        this.anthem.play();
        this.playButton.classList.add('pause');
    };
  }

  initVolumeControl() {
    this.volume.addEventListener('mouseover', () => {
      this.volumeSlider.classList.add('slider-up');
    });

    this.volume.addEventListener('mouseout', () => {
      this.volumeSlider.classList.remove('slider-up');
    });

    this.volumeSlider.addEventListener('mouseover', () => {
      this.volumeSlider.classList.add('slider-up');
    });

    this.volumeSlider.addEventListener('mouseout', () => {
      this.volumeSlider.classList.remove('slider-up');
    });

    this.volumeSlider.addEventListener('click', (event) => {
      const sliderWidth = window.getComputedStyle(this.volumeSlider).width;
      const newVolume = event.offsetX / parseInt(sliderWidth);
      this.anthem.volume = -(newVolume - 1);
      this.volumeSet.style.width = newVolume * 100 + '%';
    }, false);

    this.volumeButton.addEventListener('click', () => {
      this.anthem.muted = !this.anthem.muted;
          if (this.anthem.muted) {
            this.volumeButton.src="../../assets/images/svg/volume_off.svg";
          } else {
            this.volumeButton.src="../../assets/images/svg/volume_on.svg";
          }
      });
  }

  getTime(num) {
    let sec = parseInt(num);
    let min = parseInt(sec / 60);
    sec -= min * 60;
    return `${min}:${String(sec % 60).padStart(2, 0)}`;
  }
};