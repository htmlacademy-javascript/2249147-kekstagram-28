import { isEscapeKey } from './util.js';

const MessageTypes = {
  SUCCESS: 'success',
  ERROR: 'error'
};

// Поиск тега для добавления сообщений
const documentBody = document.querySelector('body');

// Поиск шаблона разметки сообщений об успешной отправке данных
const successMessageTamplate = document.querySelector('#success')
  .content
  .querySelector(`.${MessageTypes.SUCCESS}`);
// Поиск шаблона разметки сообщений об ошибке запроса
const errorMessageTamplate = document.querySelector('#error')
  .content
  .querySelector(`.${MessageTypes.ERROR}`);
let newMessageTamplate = {};
let messageElement = {};
let messageCloseElement = {};

const closeMessage = () => {
  messageElement.remove();

  messageCloseElement.removeEventListener('click', onMessageCloseElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onFreeAreaClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onMessageCloseElementClick() {
  closeMessage();
}

function onFreeAreaClick(evt) {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeMessage();
  }
}

const renderMessage = (message) => {
  switch(message) {
    case MessageTypes.SUCCESS:
      newMessageTamplate = successMessageTamplate;
      break;
    case MessageTypes.ERROR:
      newMessageTamplate = errorMessageTamplate;
      break;
  }
  documentBody.appendChild(newMessageTamplate.cloneNode(true));
  messageElement = documentBody.querySelector(`.${ message }`);
  messageCloseElement = documentBody.querySelector(`.${ message }__button`);

  messageCloseElement.addEventListener('click', onMessageCloseElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onFreeAreaClick);
};

export { renderMessage };
