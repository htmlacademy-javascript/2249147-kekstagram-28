import { renderMiniatures } from './miniatures.js';
import { getArrayRandElement, debounce } from './util.js';

// Максимальное количество случайно(!!!) выводимых элементов
const AMMOUNT_FILTERED_PICTURES = 10;
const INACTIVE_FILTERS_BUTTONS_SELECTOR = 'img-filters--inactive';
const ACTIVE_FILTERS_BUTTON_SELECTOR = 'img-filters__button--active';
const IMG_FILTERS_BUTTON_SELECTOR = '.img-filters__button';

const FilterClasses = {
  DEFAULT: '#filter-default',
  RANDOM: '#filter-random',
  DISCUSSED: '#filter-discussed'
};

// После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него скрывающий класс.
const filtersButtonsModule = document.querySelector('.img-filters');
const filtersButtons = filtersButtonsModule.querySelectorAll('.img-filters__button');
const fiterButtonDefault = filtersButtonsModule.querySelector('#filter-default');
const fiterButtonRandom = filtersButtonsModule.querySelector('#filter-random');
const fiterButtonDiscussed = filtersButtonsModule.querySelector('#filter-discussed');
let actualArray = {};

// Функция сортировки массива изображений в случайном порядке
const filterRandom = (picturesArray) => {
  const workArray = picturesArray.slice();
  const randomArray = [];
  let newElements = [];
  let newElementIndex = 0;

  for (let i = workArray.length; i > 0; i--) {
    newElements = getArrayRandElement(workArray);
    randomArray.push(newElements);
    newElementIndex = workArray.indexOf(newElements);
    workArray.splice(newElementIndex, 1);
  }

  return randomArray.slice(0, AMMOUNT_FILTERED_PICTURES);
};

// Функция сортировки массива изображений по количеству комментариев
const compareAmmountComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
const filterDiscussed = (picturesArray) => picturesArray.slice().sort(compareAmmountComments);

const reRenderMiniatures = (picturesArray) => {
  // Удаление всех отрисованных ссылок с миниатюрами до добавления отфильтрованных
  document.querySelector('.pictures').querySelectorAll('.picture').forEach((picture) => picture.remove());
  renderMiniatures(picturesArray);
};

const renderFilteredMiniatures = (picturesArray) => {
  filtersButtonsModule.classList.remove(INACTIVE_FILTERS_BUTTONS_SELECTOR);
  const reRenderMiniaturesDebounced = debounce(reRenderMiniatures);

  filtersButtonsModule.addEventListener('click', (evt) => {
    if (evt.target.closest(IMG_FILTERS_BUTTON_SELECTOR)) {
      filtersButtons.forEach((button) => button.classList.remove(ACTIVE_FILTERS_BUTTON_SELECTOR));
    } else {
      return;
    }

    if (evt.target.closest(FilterClasses.DEFAULT)) {
      fiterButtonDefault.classList.add(ACTIVE_FILTERS_BUTTON_SELECTOR);
      actualArray = picturesArray;
    } else if (evt.target.closest(FilterClasses.RANDOM)) {
      fiterButtonRandom.classList.add(ACTIVE_FILTERS_BUTTON_SELECTOR);
      actualArray = filterRandom(picturesArray);
    } else if (evt.target.closest(FilterClasses.DISCUSSED)) {
      fiterButtonDiscussed.classList.add(ACTIVE_FILTERS_BUTTON_SELECTOR);
      actualArray = filterDiscussed(picturesArray);
    }

    reRenderMiniaturesDebounced(actualArray);
  });
};

export { renderFilteredMiniatures };
