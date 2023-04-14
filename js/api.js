const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/123',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
};

const load = (route, method = Method.GET, errorText = null, body = null) => fetch(
  `${BASE_URL}${route}`,
  {
    method,
    body
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(errorText);
  });

const getData = () => load(Route.GET_DATA, Method.GET, ErrorText.GET_DATA, null);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, null , body);

export { getData, sendData };
