import { getObjectsArray } from './data.js';
import { renderMiniatures } from './miniatures.js';
import { renderFullPicture } from './fullPicture.js';

const objectsArray = getObjectsArray();

renderMiniatures(objectsArray);
renderFullPicture(objectsArray);
