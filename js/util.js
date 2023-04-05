const ALERT_SHOW_TIME = 5000;

// Функция генерации для получения уникальных целых чисел из указанного диапазона
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//Функция генерации уникальных идентификаторов
const createIdGenerator = (start) => {
  let lastGeneratedId = start;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// Функция для получения случайного элемента массива, которая
// принимает в качестве параметра один массив, а
// возвращает его случайное значение.
const getArrayRandElement = (array) => array[getRandomInteger(0, array.length - 1)];

// Проверка нажатия клавиши ESC и ENTER
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

// Проверка активного элемента в DOM
const isActiveElement = (el) => el === document.activeElement;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { createIdGenerator, getRandomInteger, getArrayRandElement, isEscapeKey, isEnterKey, isActiveElement, showAlert };
