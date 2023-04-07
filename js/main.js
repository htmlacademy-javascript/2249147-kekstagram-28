// import { getObjectsArray } from './data.js';
import { renderMiniatures } from './miniatures.js';
import { renderFullPicture } from './fullPicture.js';
import { openformLoadPicture, onFormSubmit, closeformLoadPicture } from './formProcessingLoadPicture.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderFilteredMiniatures } from './filters.js';

// let objectsArray = getObjectsArray();

getData()
  .then((objectsArray) => {
    renderMiniatures(objectsArray);
    renderFullPicture(objectsArray);
    renderFilteredMiniatures(objectsArray);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

openformLoadPicture();
onFormSubmit(closeformLoadPicture);
