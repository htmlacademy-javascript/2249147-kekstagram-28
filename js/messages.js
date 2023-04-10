import { isEscapeKey } from './util.js';

// Поиск тега для добавления сообщений
const documentBody = document.querySelector('body');

// Поиск шаблона разметки сообщений об успешной отправке данных
const successMessageTamplate = document.querySelector('#success')
  .content
  .querySelector('.success');
// Поиск шаблона разметки сообщений об ошибке запроса
const errorMessageTamplate = document.querySelector('#error')
  .content
  .querySelector('.error');
let newMessageTamplate = {};
let messageElement = {};
let messageCloseElement = {};

const closeMessage = () => {
  messageElement.remove();

  // messageCloseElement.removeEventListener('click', onMessageCloseElement);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onFreeAreaClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onMessageCloseElement() {
  closeMessage();
}

function onFreeAreaClick(evt) {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeMessage();
  }
}

const renderMessage = (message) => {
  switch(message) {
    case 'success':
      newMessageTamplate = successMessageTamplate;
      break;
    case 'error':
      newMessageTamplate = errorMessageTamplate;
      break;
  }
  documentBody.appendChild(newMessageTamplate.cloneNode(true));
  messageElement = documentBody.querySelector(`.${ message }`);
  messageCloseElement = documentBody.querySelector(`.${ message }__button`);

  messageCloseElement.addEventListener('click', onMessageCloseElement);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onFreeAreaClick);
};

export { renderMessage };
