import {isEscapeKey, isEnterKey} from './util.js';

const mainWindow = document.querySelector('body');
const bigPictureWindow = document.querySelector('.big-picture');
const bigPictureImage = bigPictureWindow.querySelector('.big-picture__img')
  .querySelector('img');
const bigPictureLikes = bigPictureWindow.querySelector('.likes-count');
const bigPictureComments = bigPictureWindow.querySelector('.comments-count');
const bigPictureDescription = bigPictureWindow.querySelector('.social__caption');

const fullPictureOpenElement = document.querySelector('.pictures');
const fullPictureCloseElement = document.querySelector('#picture-cancel');
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  // ----------------------------------------------------------------------------------------------------------???
  // Как мы используем функцию до её декларирования, почему это работает??? Точнее как в данном случае уйти от этой ошибки от линтера?
  }
};

const openFullPicture = (evt, dataArray) => {
  bigPictureWindow.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  // После открытия окна добавление тегу <body> класс modal-open,
  // чтобы контейнер с фотографиями позади не прокручивался при скролле.
  // При закрытии окна этот класс удаляется.
  mainWindow.classList.add('modal-open');

  // После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и
  // загрузки новых комментариев .comments-loader, добавив им класс hidden,
  // с ними мы разберёмся позже, в другом домашнем задании.
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Поиск элемента массива данных, на картинку которого произошёл клик по дата атрибуту ссылки
  const pictureId = evt.target.closest('.picture').dataset.id;
  const chooseObject = dataArray.find((object) => object.id === Number(pictureId));

  // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img
  bigPictureImage.src = chooseObject.url;
  bigPictureImage.alt = chooseObject.description;
  // Количество лайков likes подставьте как текстовое содержание элемента .likes-count
  bigPictureLikes.textContent = chooseObject.likes;
  // Количество комментариев comments подставьте как текстовое содержание элемента .comments-count
  bigPictureComments.textContent = chooseObject.comments.length;
  // Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments
  commentsList.innerHTML = '';
  for (let i = 0; i < chooseObject.comments.length; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const avatarComment = document.createElement('img');
    avatarComment.classList.add('social__picture');
    avatarComment.src = chooseObject.comments[i].avatar;
    avatarComment.alt = chooseObject.comments[i].name;
    avatarComment.width = '35';
    avatarComment.height = '35';
    newComment.append(avatarComment);

    const textComment = document.createElement('p');
    textComment.classList.add('social__text');
    textComment.textContent = chooseObject.comments[i].message;
    newComment.append(textComment);

    commentsList.append(newComment);
  }

  // Описание фотографии description вставьте строкой в блок .social__caption
  bigPictureDescription.textContent = chooseObject.description;
};

const closeFullPicture = () => {
  bigPictureWindow.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  // После открытия окна добавление тегу <body> класс modal-open,
  // чтобы контейнер с фотографиями позади не прокручивался при скролле.
  // При закрытии окна этот класс удаляется.
  mainWindow.classList.remove('modal-open');
  // 3. Прочая логика
};

const renderFullPicture = (dataArray) => {
  fullPictureOpenElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      openFullPicture (evt, dataArray);
    }
  });

  fullPictureOpenElement.addEventListener('keydown', (evt) => {
    // ----------------------------------------------------------------------------------------------------------???
    // Почему работает нажатие enter на картинке без обработчика keydown ??? Должно же только на button работать ???
    if (evt.target.closest('.picture')) {
      if (isEnterKey(evt)) {
        openFullPicture (evt, dataArray);
      }
    }
  });

  fullPictureCloseElement.addEventListener('click', () => {
    closeFullPicture ();
  });
};

export { renderFullPicture };
