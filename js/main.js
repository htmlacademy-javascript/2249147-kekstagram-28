import { getData } from './api.js';
import { listenUploadPicture, listenPictureUploadFormSubmit, closeFormLoadPicture } from './form-processing-load-picture.js';
import { renderMiniatures } from './miniatures.js';
import { renderFullPicture } from './full-picture.js';
import { renderFilteredMiniatures } from './filters.js';
import { showAlert } from './util.js';

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

listenUploadPicture();
listenPictureUploadFormSubmit(closeFormLoadPicture);
