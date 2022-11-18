export { insertDescription, insertDescriptionText }

function insertDescription() {

  let block = document.querySelector('.quiz__block');
  document.querySelector('.question__wrapper').remove();
  let element = document.createElement('div');
  element.className = 'question__wrapper';
  element.insertAdjacentHTML('beforeend',
    `<div class="answers__block">
    <div class="answers__description">
      <div class="description__title">
        <div class="answers__flag"></div>
        <h2 class="answers__title">*******</h2>
      </div>
      <div class="answers__content">
        <div class="answers__control">
          <button class="answers__play"></button>
        </div>
        <div class="answers__progress">
              <input type="range" class="answers__bar" value="0">
              <label class="answers__current">0:00</label>
              <label class="answers__length">0:00</label>
        </div>
        <div class="answers__volume">
          <div class="answers__slider">
            <div class="answers__set"></div>
          </div>
          <img class="answers__icon" src="../../assets/images/svg/volume_on.svg" alt="volume">
        </div>
      </div>
    </div>
    <ul class="description__content">
      <li class="description__item">Название на русском: <span class="description__name-rus description__text"></span></li>
      <li class="description__item">Название на государственном языке: <span class="description__name-self description__text"></span></li>
      <li class="description__item">Язык гимна: <span class="description__lang description__text"></span></li>
      <li class="description__item">Автор текста гимна: <span class="description__autor description__text"></span></li>
      <li class="description__item">Композитор: <span class="description__composer description__text"></span></li>
      <li class="description__item">Дата написания: <span class="description__date-write description__text"></span></li>
      <li class="description__item">Дата принятия: <span class="description__date-accept description__text"></span></li>
    </ul>
    </div>`
  );

  block.append(element);
  }

  function insertDescriptionText() {
    let block = document.querySelector('.quiz__block');
    document.querySelector('.question__wrapper').remove();
    let element = document.createElement('div');
    element.className = 'question__wrapper';
    element.insertAdjacentHTML('beforeend', '<p class="question__text">Послушайте плеер.<br>Выберите страну из списка</p>');
    block.append(element);

  }