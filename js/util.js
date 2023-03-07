//Функция генерации уникальных идентификаторов
function createIdGenerator (start) {
  let lastGeneratedId = start;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

// Функция генерации для получения уникальных целых чисел из указанного диапазона
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Функция для получения случайного элемента массива, которая
// принимает в качестве параметра один массив, а
// возвращает его случайное значение.
const getArrayRandElement = (array) => array[getRandomInteger(0, array.length - 1)];

export { createIdGenerator, getRandomInteger, getArrayRandElement };
