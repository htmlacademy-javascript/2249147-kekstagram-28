const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger
// должно изменяться значение поля .scale__control--value
const scaleSmallerClick = () => {
  if (scaleControlValue.value.replace('%', '') > SCALE_MIN) {
    scaleControlValue.value = `${Number(scaleControlValue.value.replace('%', '')) - SCALE_STEP}%`;
    imagePreview.style.transform = `scale(${Number(scaleControlValue.value.replace('%', '')) / 100})`;
  }
};

const scaleBiggerClick = () => {
  if (scaleControlValue.value.replace('%', '') < SCALE_MAX) {
    scaleControlValue.value = `${Number(scaleControlValue.value.replace('%', '')) + SCALE_STEP}%`;
    imagePreview.style.transform = `scale(${Number(scaleControlValue.value.replace('%', '')) / 100})`;
  }
};

const resetScale = () => {
  imagePreview.style.transform = '';
};

export { scaleSmallerClick, scaleBiggerClick, resetScale };
