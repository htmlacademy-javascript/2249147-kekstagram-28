import { isEscapeKey, isActiveElement } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { renderMessage } from './messages.js';
import { sendData } from './api.js';

// Ошибка заполнения поля #ХэшТэг: регилярное выражение и количество допустимых хэштегов
const HASH_TAGS_STANDART = /^#[a-zа-яё0-9]{1,19}$/i;
const HASH_TAGS_AMOUNT = 5;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляется...'
};

const mainWindow = document.querySelector('body');
const formLoadPicture = document.querySelector('.img-upload__form'); // Форма отправки изображения
const formOverlay = formLoadPicture.querySelector('.img-upload__overlay');
const formUpLoadPictureElement = document.querySelector('.img-upload__input');
const formCancelLoadPictureElement = formLoadPicture.querySelector('.img-upload__cancel');
// const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
// const previewEffectsImages = formLoadPicture.querySelectorAll('.effects__preview');
const inputHashTag = formLoadPicture.querySelector('.text__hashtags'); // Поле ввода хэштега
const inputYourComment = formLoadPicture.querySelector('.text__description'); // Поле ввода комментария
const inputChoiseFile = document.querySelector('#upload-file');
const submitButton = formLoadPicture.querySelector('.img-upload__submit');

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

const closeformLoadPicture = () => {
  formOverlay.classList.add('hidden');
  mainWindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  formCancelLoadPictureElement.removeEventListener('click', onCloseFormElement);

  // Надо ли отписываться от обработчика отправки формы--------------------------------------------------------------------------------------------???
  // formLoadPicture.removeEventListener('submit', onFormSubmit);

  // Сброс значений при закрытии формы.
  // Сброс значения поля выбора файла #upload-file.
  inputChoiseFile.value = '';
  // Значение других полей формы также нужно сбрасывать. Сброс значений при закрытии форм на ретро, свериться 17.35 9 глава.-----------------------!!!
  resetScale();
  resetEffects();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isActiveElement(inputHashTag) && !isActiveElement(inputYourComment)) {
    evt.preventDefault();
    closeformLoadPicture();
  }
}

function onCloseFormElement() {
  closeformLoadPicture();
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmit = (onSuccess) => {
  formLoadPicture.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(pristine.validate()) {
      // const formData = new FormData(evt.target);
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          renderMessage('success');
        })
        // .then(renderMessage('success'))
        .catch(
          () => {
            renderMessage('error');
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

const openformLoadPicture = () => {
  formUpLoadPictureElement.addEventListener('change', () => {
    formOverlay.classList.remove('hidden');
    mainWindow.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    formCancelLoadPictureElement.addEventListener('click', onCloseFormElement);

    // Подставляем адрес выбранной картинки-------------------------------------------------------------------Разобраться!!!
    // console.log(formUpLoadPictureElement.value); // и ничего не работает...
    // imagePreview.src = window.URL.createObjectURL(uploadFile.files[0]);
    // previewEffectsImages.forEach((image) => {
    //   image.style.backgroundImage = 'url(${URL.createObjectURL(fileImage)})';
    // });
  });
};

export { openformLoadPicture, onFormSubmit, closeformLoadPicture };
