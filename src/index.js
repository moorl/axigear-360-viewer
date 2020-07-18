import 'core-js/features/array/for-each';
import 'core-js/features/array/filter';
import 'core-js/features/array/includes';
import AXIGEAR360Viewer from './axigear360.service';


function init() {
  const viewers = [];
  const view360Array = document.querySelectorAll('.axigear-360:not(.initialized)');

  [].slice.call(view360Array).forEach(container => { viewers.push(new AXIGEAR360Viewer(container)); });

  window.AXIGEAR360._viewers = viewers;
}

function destroy() {
  if (isNoViewers()) return;

  window.AXIGEAR360._viewers.forEach(viewer => { viewer.destroy(); });

  window.AXIGEAR360._viewers = [];
}

function getActiveIndexByID(id) {
  if (isNoViewers()) return;

  let currentViewer = window.AXIGEAR360._viewers.filter(viewer => viewer.id === id)[0];

  return currentViewer && (currentViewer.activeImage - 1);
}

function isNoViewers() {
  return !(window.AXIGEAR360._viewers && window.CI360._viewers.length > 0);
}

window.AXIGEAR360 = window.AXIGEAR360 || {};
window.AXIGEAR360.init = init;
window.AXIGEAR360.destroy = destroy;
window.AXIGEAR360.getActiveIndexByID = getActiveIndexByID;

if (!window.AXIGEAR360.notInitOnLoad) {
  init();
}