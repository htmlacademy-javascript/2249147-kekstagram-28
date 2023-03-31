import { isEscapeKey, isActiveElement } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const mainWindow = document.querySelector('body');
const formLoadPicture = document.querySelector('.img-upload__form'); // Форма отправки изображения
const formOverlay = formLoadPicture.querySelector('.img-upload__overlay');
const formUpLoadPictureElement = document.querySelector('.img-upload__input');
const formCancelLoadPictureElement = formLoadPicture.querySelector('.img-upload__cancel');
const inputHashTag = formLoadPicture.querySelector('.text__hashtags'); // Поле ввода хэштега
const inputYourComment = formLoadPicture.querySelector('.text__description'); // Поле ввода комментария
const inputChoiseFile = document.querySelector('#upload-file');

// Ошибка заполнения поля #ХэшТэг: регилярное выражение и количество допустимых хэштегов
const HASH_TAGS_STANDART = /^#[a-zа-яё0-9]{1,19}$/i;
const HASH_TAGS_AMOUNT = 5;


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

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if(pristine.validate()) {
    formLoadPicture.submit();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isActiveElement(inputHashTag) && !isActiveElement(inputYourComment)) {
    evt.preventDefault();
    closeformLoadPicture();
  // -----------------------------------------------------------------------------------------------------------------------------------???
  // Как мы используем функцию до её декларирования, почему это работает??? Точнее как в данном случае уйти от этой ошибки от линтера?
  }
};

const openformLoadPicture = () => {
  formOverlay.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  formLoadPicture.addEventListener('submit', onFormSubmit);
  // ---------------------------------------------------------------------------------------------------------------------------------------???
  // По сабмиту нужно снимать обработчик, также как и по кейдаун???
};

const closeformLoadPicture = () => {
  formOverlay.classList.add('hidden');
  mainWindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  formLoadPicture.removeEventListener('submit', onFormSubmit);

  // Сброс значений при закрытии формы.
  // Сброс значения поля выбора файла #upload-file.
  inputChoiseFile.value = '';
  // Значение других полей формы также нужно сбрасывать. Сброс значений при закрытии форм на ретро 17.35 9 глава.-----------------------???
  resetScale();
  resetEffects();

};


const renderFormLoadPicture = () => {
  formUpLoadPictureElement.addEventListener('change', () => {
    openformLoadPicture ();
  });

  formCancelLoadPictureElement.addEventListener('click', () => {
    closeformLoadPicture ();
  });

  // document.addEventListener('keydown', (evt) => {
  //   console.log('Тыдыщ');
  //   console.log('inputHashTag: ', isActiveElement(inputHashTag));
  //   console.log('inputYourComment: ',isActiveElement(inputYourComment));
  //   console.log('!||: ',!(isActiveElement(inputHashTag) || isActiveElement(inputYourComment)));
  //   console.log(isEscapeKey(evt) && !((isActiveElement(inputHashTag) || isActiveElement(inputYourComment))));
  // });
};

export { renderFormLoadPicture };
