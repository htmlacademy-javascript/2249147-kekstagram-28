import { isEscapeKey, isActiveElement } from './util.js';
import { onScaleSmallerClick, onScaleBiggerClick, resetScale } from './scale.js';
import { onSelectedEffectChange, resetEffects } from './effects.js';
import { renderMessage } from './messages.js';
import { sendData } from './api.js';

// Ошибка заполнения поля #ХэшТэг: регулярное выражение и количество допустимых хэштегов
const HASH_TAGS_STANDART = /^#[a-zа-яё0-9]{1,19}$/i;
const HASH_TAGS_AMOUNT = 5;
const ACTIVE_ERROR_CLASS = '.error__inner';

// Допустимые типы файлов загружаемых изображений
const FILE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const SubmitButtonTexts = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляется...'
};

const mainWindow = document.querySelector('body');
const formLoadPicture = document.querySelector('.img-upload__form'); // Форма отправки изображения
const formOverlay = formLoadPicture.querySelector('.img-upload__overlay');
const formUpLoadPicture = document.querySelector('.img-upload__input');
const formCancelLoadPicture = formLoadPicture.querySelector('.img-upload__cancel');
const inputHashTag = formLoadPicture.querySelector('.text__hashtags'); // Поле ввода хэштега
const inputYourComment = formLoadPicture.querySelector('.text__description'); // Поле ввода комментария
const inputChoiseFile = document.querySelector('#upload-file');
const submitButton = formLoadPicture.querySelector('.img-upload__submit');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const effectSelection = document.querySelector('.img-upload__effects');

const pristine = new Pristine(formLoadPicture, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error-text',
});

// Получаем массив тегов из введённой строки в поле для хэштегов
const getArrayHashTags = (someHashTagsString) => someHashTagsString.toLowerCase().split(' ').filter((tag) => tag);

pristine.addValidator(
  inputHashTag,
  (value) => getArrayHashTags(value).every((tag) => HASH_TAGS_STANDART.test(tag)),
  'Ошибка формата #ХэшТэга!');

pristine.addValidator(
  inputHashTag,
  (value) => getArrayHashTags(value).length === new Set(getArrayHashTags(value)).size,
  'Один и тот же хэш-тег не может быть использован дважды!');

pristine.addValidator(
  inputHashTag,
  (value) => getArrayHashTags(value).length <= HASH_TAGS_AMOUNT,
  `Нельзя указать больше ${ HASH_TAGS_AMOUNT } хэш-тегов!`);

const closeFormLoadPicture = () => {
  formOverlay.classList.add('hidden');
  mainWindow.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  formCancelLoadPicture.removeEventListener('click', onCloseFormElementClick);
  scaleControlSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleBiggerClick);
  effectSelection.removeEventListener('change', onSelectedEffectChange);

  // Сброс значений при закрытии формы.
  // Сброс значения поля выбора файла #upload-file.
  inputChoiseFile.value = '';
  // Значение других полей формы также нужно сбрасывать
  resetScale();
  resetEffects();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isActiveElement(inputHashTag) && !isActiveElement(inputYourComment) && document.querySelector(ACTIVE_ERROR_CLASS) === null) {
    evt.preventDefault();
    closeFormLoadPicture();
  }
}

function onCloseFormElementClick() {
  closeFormLoadPicture();
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonTexts.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonTexts.IDLE;
};

const listenPictureUploadFormSubmit = (onSuccess) => {
  formLoadPicture.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          renderMessage('success');
        })
        .catch(
          () => {
            renderMessage('error');
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

const showSelectImage = () => {
  const file = formUpLoadPicture.files[0];
  const fileName = file.name.toLowerCase();
  const bigPictureImage = formLoadPicture.querySelector('.img-upload__preview img');
  const previewEffectsImages = formLoadPicture.querySelectorAll('.effects__preview');

  const matches = FILE_EXTENSIONS.some((fileExtension) => fileName.endsWith(fileExtension));

  if (matches) {
    bigPictureImage.src = URL.createObjectURL(formUpLoadPicture.files[0]);
    previewEffectsImages.forEach((image) => {
      image.style.backgroundImage = `url(${URL.createObjectURL(formUpLoadPicture.files[0])})`;
    });
  }
};

const listenUploadPicture = () => {
  formUpLoadPicture.addEventListener('change', () => {
    formOverlay.classList.remove('hidden');
    mainWindow.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
    formCancelLoadPicture.addEventListener('click', onCloseFormElementClick);
    scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleBiggerClick);
    effectSelection.addEventListener('change', onSelectedEffectChange);

    // Подставляем адрес выбранной картинки
    showSelectImage();
  });
};

export { listenUploadPicture, listenPictureUploadFormSubmit, closeFormLoadPicture };
