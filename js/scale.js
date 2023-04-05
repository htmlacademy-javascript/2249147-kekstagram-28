const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger
// должно изменяться значение поля .scale__control--value
const scaleSmaller = () => {
  if (scaleControlValue.value.replace('%', '') > SCALE_MIN) {
    scaleControlValue.value = `${Number(scaleControlValue.value.replace('%', '')) - SCALE_STEP}%`;
    imagePreview.style.transform = `scale(${Number(scaleControlValue.value.replace('%', '')) / 100})`;
  }
};

scaleControlSmaller.addEventListener('click', scaleSmaller);

const scaleBigger = () => {
  if (scaleControlValue.value.replace('%', '') < SCALE_MAX) {
    scaleControlValue.value = `${Number(scaleControlValue.value.replace('%', '')) + SCALE_STEP}%`;
    imagePreview.style.transform = `scale(${Number(scaleControlValue.value.replace('%', '')) / 100})`;
  }
};

scaleControlBigger.addEventListener('click', scaleBigger);

const resetScale = () => {
  imagePreview.style.transform = '';
  scaleControlSmaller.removeEventListener('click', scaleSmaller);
  scaleControlBigger.removeEventListener('click', scaleBigger);
};

export { resetScale };