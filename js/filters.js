import { renderMiniatures } from './miniatures.js';
import { getArrayRandElement, debounce } from './util.js';

// Максимальное количество случайно(!!!) выводимых элементов
const AMMOUNT_FILTERED_PICTURES = 10;

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
  let newElement = [];
  let newElementIndex = 0;

  for (let i = workArray.length; i > 0; i--) {
    newElement = getArrayRandElement(workArray);
    randomArray.push(newElement);
    newElementIndex = workArray.indexOf(newElement);
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
  filtersButtonsModule.classList.remove('img-filters--inactive');

  filtersButtonsModule.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button')) {
      filtersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    } else {
      return;
    }

    if (evt.target.closest('#filter-default')) {
      fiterButtonDefault.classList.add('img-filters__button--active');
      actualArray = picturesArray;
    } else if (evt.target.closest('#filter-random')) {
      fiterButtonRandom.classList.add('img-filters__button--active');
      actualArray = filterRandom(picturesArray);
    } else if (evt.target.closest('#filter-discussed')) {
      fiterButtonDiscussed.classList.add('img-filters__button--active');
      actualArray = filterDiscussed(picturesArray);
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------???
    // По факту получилась функция, которая откладывает выполнение reRender. Т.е. если один раз нажать на кнопку, то перерисовка произойдёт через 500мс, а
    // не сразу. При этом, если в течении некоторого времени нажимать на разные кнопки быстро, то сначала отрисовка не будет происходить, а потом всё начинает
    // быстро перерисовываться. Не понимаю, где я не так примених debounce ?
    debounce(() => reRenderMiniatures(actualArray))();
  });
};

export { renderFilteredMiniatures };
