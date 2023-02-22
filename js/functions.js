
// Функция для проверки длины строки.
// Она принимает
// строку, которую нужно проверить, и максимальную длину
// и возвращает
// true, если строка меньше или равна указанной длине,
// и false, если строка длиннее.
//  Эта функция нам пригодится для валидации формы. Примеры использования функции:
// Cтрока короче 20 символов
// isLenghtString('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
// isLenghtString('проверяемая строка', 18); // true
// Строка длиннее 10 символов
// isLenghtString('проверяемая строка', 10); // false
const isLenghtString = (testString, amountCharacters) => testString.length <= amountCharacters;

// Функция для проверки, является ли строка палиндромом.
// Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
// Например:
// // Строка является палиндромом
// isPalindrome('топот'); // true
// // Несмотря на разный регистр, тоже палиндром
// isPalindrome('ДовОд'); // true
// // Это не палиндром
// isPalindrome('Кекс');  // false
// isPalindrome('Лёша на полке клопа нашёл '); // true
const isPalindrome = (testString) => {
  testString = testString
    .toLowerCase()
    .replaceAll(' ', '');
  let reverseString = '';
  for (let i = 0; i < testString.length; i++) {
    reverseString = testString[i] + reverseString;
  }
  return testString === reverseString;
};

// Функция, которая принимает строку,
// извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN:
// getNumbers('2023 год');            // 2023
// getNumbers('ECMAScript 2022');     // 2022
// getNumbers('1 кефир, 0.5 батона'); // 105
// getNumbers('агент 007');           // 7
// getNumbers('а я томат');           // NaN
// getNumbers(2023); // 2023
// getNumbers(-1);   // 1
// getNumbers(1.5);  // 15
const getNumbers = (testString) => {
  testString = testString.toString();
  let numbers = '';
  for (let i = 0; i < testString.length; i++) {
    numbers = !isNaN(parseInt(testString[i], 10)) ? numbers + testString[i] : numbers; //Проверка, является ли символ числом через приведение символа строки к числу и проверка на NaN
  }
  return parseInt(numbers, 10);
};

// Функция, которая принимает три параметра:
// исходную строку,
// минимальную длину и
// строку с добавочными символами —
// и возвращает
// исходную строку, дополненную указанными символами до заданной длины.
// Символы добавляются в начало строки.
// Если исходная строка превышает заданную длину, она не должна обрезаться.
// Если «добивка» слишком длинная, она обрезается с конца.
// // Добавочный символ использован один раз
// addsLineLength('1', 2, '0');      // '01'
// // Добавочный символ использован три раза
// addsLineLength('1', 4, '0');      // '0001'
// // Добавочные символы обрезаны с конца
// addsLineLength('q', 4, 'werty');  // 'werq'
// // Добавочные символы использованы полтора раза
// addsLineLength('q', 4, 'we');     // 'wweq'
// // Добавочные символы не использованы, исходная строка не изменена
// addsLineLength('qwerty', 4, '0'); // 'qwerty'
const addsLineLength = (originalString, minLenght, addsString) => {
  let resultAdds = '';
  let i = 0;
  let resultString = originalString;
  while ((resultAdds + resultString).length < minLenght) {
    resultAdds += addsString[i];
    if (i < addsString.length - 1) {
      i++;
    } else {
      resultString = resultAdds + resultString;
      resultAdds = '';
      i = 0;
    }
  }
  return resultAdds + resultString;
};
