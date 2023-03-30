// CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.

const EFFECTS = {
  none: {
    effectFilter: 'none',
    showSlider: false,
    effectMin: 0,
    effectMax: 100,
    effectStart: 100,
    effectStep: 1,
    effectPostfix: ''
  },
  chrome: {
    effectFilter: 'grayscale',
    showSlider: true,
    effectMin: 0,
    effectMax: 1,
    effectStart: 1,
    effectStep: 0.1,
    effectPostfix: ''
  }
};

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const sliderElementContainer = document.querySelector('.img-upload__effect-level');
const effectSelection = document.querySelector('.img-upload__effects');

let selectedEffect = EFFECTS.none;

const showSlider = (objectEffect) => (objectEffect.showSlider) ? sliderElementContainer.classList.remove('hidden') : sliderElementContainer.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0, // EFFECT_MIN,
    max: 100, // EFFECT_MAX,
  },
  start: 50, // EFFECT_START,
  step: 1, // EFFECT_STEP,
  connect: 'lower', // Закрашивание слайдера с минимума до текущего значения
  // format: {
  //   to: function (value) {
  //     return `${value}%`;
  //   },
  //   from: function (value) {
  //     return parseFloat(value);
  //   }
  // }
});
showSlider(selectedEffect);

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  console.log(effectLevelValue.value);
  imagePreview.style.filter = `${selectedEffect.effectFilter}(${effectLevelValue.value})`;
});

effectSelection.addEventListener('change', (evt) => {
  // Определение выбранного эффекта
  selectedEffect = EFFECTS[evt.target.value];

  showSlider(selectedEffect);
  imagePreview.style.filter = `${selectedEffect.effectFilter}(${selectedEffect.effectStart})`;



  // const pictureId = evt.target.closest('.picture').dataset.id;
  // chooseObject = dataArray.find((object) => object.id === Number(pictureId));

  // showSlider();
});
