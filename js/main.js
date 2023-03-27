import { getObjectsArray } from './data.js';
import { renderMiniatures } from './miniatures.js';
import { renderFullPicture } from './fullPicture.js';
import { renderFormLoadPicture } from './formProcessingLoadPicture.js';

const objectsArray = getObjectsArray();

renderMiniatures(objectsArray);
renderFullPicture(objectsArray);
renderFormLoadPicture();
