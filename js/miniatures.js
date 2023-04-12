// Модуль, который отвечает за отрисовку миниатюр.
// На основе временных данных для разработки и шаблона #picture создаются DOM-элементы, соответствующие фотографиям с данными:
// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Поиск тега для добавления картинок пользователя в потомки
const picturesList = document.querySelector('.pictures');

// Поиск шаблона разметки картинок пользователя
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderMiniatures = (picturesArray) => {
  // Вставка создаваемых элементов через DocumentFragment
  const similarListFragment = document.createDocumentFragment();

  picturesArray.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(similarListFragment);
};

export { renderMiniatures };
