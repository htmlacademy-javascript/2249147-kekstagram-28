// CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.

const Effects = {
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
  },
  sepia: {
    effectFilter: 'sepia',
    showSlider: true,
    effectMin: 0,
    effectMax: 1,
    effectStart: 1,
    effectStep: 0.1,
    effectPostfix: ''
  },
  marvin: {
    effectFilter: 'invert',
    showSlider: true,
    effectMin: 0,
    effectMax: 100,
    effectStart: 100,
    effectStep: 1,
    effectPostfix: '%'
  },
  phobos: {
    effectFilter: 'blur',
    showSlider: true,
    effectMin: 0,
    effectMax: 3,
    effectStart: 3,
    effectStep: 0.1,
    effectPostfix: 'px'
  },
  heat: {
    effectFilter: 'brightness',
    showSlider: true,
    effectMin: 1,
    effectMax: 3,
    effectStart: 3,
    effectStep: 0.1,
    effectPostfix: ''
  }
};

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const sliderElementContainer = document.querySelector('.img-upload__effect-level');
const effectSelection = document.querySelector('.img-upload__effects');

let selectedEffect = Effects.none;

const showSlider = (objectEffect) => (objectEffect.showSlider) ? sliderElementContainer.classList.remove('hidden') : sliderElementContainer.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: selectedEffect.effectMin,
    max: selectedEffect.effectMax,
  },
  start: selectedEffect.effectStart,
  step: selectedEffect.effectStep,
  connect: 'lower', // Закрашивание слайдера с минимума до текущего значения
});
showSlider(selectedEffect);

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  imagePreview.style.filter = `${selectedEffect.effectFilter}(${effectLevelValue.value}${selectedEffect.effectPostfix})`;
});

const renderImagePreview = (objectEffect) => {
  // Переопределяем настройки слайдера
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: objectEffect.effectMin,
      max: objectEffect.effectMax,
    },
    start: objectEffect.effectStart,
    step: objectEffect.effectStep,
  });
  showSlider(objectEffect);

  imagePreview.className = '';
  imagePreview.style.filter = '';
  imagePreview.style.filter = `${selectedEffect.effectFilter}(${selectedEffect.effectStart}${selectedEffect.effectPostfix})`;
};

effectSelection.addEventListener('change', (evt) => {
  // Определение выбранного эффекта
  selectedEffect = Effects[evt.target.value];
  imagePreview.classList.add(`effects__preview--${evt.target.value}`);
  renderImagePreview(selectedEffect);
});

const resetEffects = () => {
  selectedEffect = Effects.none;
  renderImagePreview(selectedEffect);
};

export { resetEffects };
