const get360ViewProps = (image) => ({
  folder: attr(image, 'folder') || attr(image, 'data-folder') || '/',
  filename: attr(image, 'filename') || attr(image, 'data-filename') || 'image-{index}.jpg',
  imageList: attr(image, 'image-list') || attr(image, 'data-image-list') || null,
  indexZeroBase: parseInt(attr(image, 'index-zero-base') || attr(image, 'data-index-zero-base') || 0, 10),
  amount: parseInt(attr(image, 'amount') || attr(image, 'data-amount') || 36, 10),
  speed: parseInt(attr(image, 'speed') || attr(image, 'data-speed') || 80, 10),
  dragSpeed: parseInt(attr(image, 'drag-speed') || attr(image, 'data-drag-speed') || 150, 10),
  keys: isTrue(image, 'keys'),
  rotateIcon: isTrue(image, 'rotate-icon'),
  boxShadow: attr(image, 'box-shadow') || attr(image, 'data-box-shadow'),
  autoplay: isTrue(image, 'auto-play'),
  autoplayReverse: isTrue(image, 'autoplay-reverse'),
  fullScreen: isTrue(image, 'full-screen'),
  magnifier: ((attr(image, 'magnifier') !== null) || (attr(image, 'data-magnifier') !== null)) &&
    parseInt(attr(image, 'magnifier') || attr(image, 'data-magnifier'), 10),
  ratio: parseFloat(attr(image, 'ratio') || attr(image, 'data-ratio') || 0) || false,
  spinReverse: isTrue(image, 'spin-reverse'),
  controlReverse: isTrue(image, 'control-reverse'),
  stopAtEdges: isTrue(image, 'stop-at-edges'),
  autoLoading: isTrue(image, 'auto-loading'),
  playIcon: isTrue(image, 'play-icon'),
  playIconUrl: attr(image, 'play-icon-url'),
  magnifierIconUrl: attr(image, 'magnifier-icon-url'),
  fullScreenIconUrl: attr(image, 'full-screen-icon-url'),
  closeFullScreenIconUrl: attr(image, 'close-full-screen-icon-url'),
  rotateIconUrl: attr(image, 'rotate-icon-url'),
  image360IconUrl: attr(image, 'image-360-icon-url'),
  image360IconBackgroundColor: attr(image, 'image-360-icon-background-color'),
  responsive: attr(image, 'responsive') || attr(image, 'data-responsive') || null
});

const isTrue = (image, type) => {
  const imgProp = attr(image, type);
  const imgDataProp = attr(image, `data-${type}`);

  return (imgProp !== null && imgProp !== 'false') || (imgDataProp !== null && imgDataProp !== 'false');
};

const attr = (element, attribute) => element.getAttribute(attribute);


const setInnerBoxStyles = (viewInnerBox) => {
  viewInnerBox.style.backgroundColor = 'rgb(255,255,255)';
};

const set360ViewIconStyles = (view360Icon) => {
  view360Icon.style.position = 'absolute';
  view360Icon.style.top = 'calc(50% - 50px)';
  view360Icon.style.bottom = '0';
  view360Icon.style.left = 'calc(50% - 50px)';
  view360Icon.style.right = '0';
  view360Icon.style.width = '100px';
  view360Icon.style.height = '100px';
  view360Icon.style.margin = '0px';
  view360Icon.style.backgroundColor = 'rgba(255,255,255,0.8)';
  view360Icon.style.borderRadius = '50%';
  view360Icon.style.boxShadow = 'rgb(0, 0, 0, 0.5) 0px 0px 10px';
  view360Icon.style.transition = '0.5s all';
  view360Icon.style.color = 'rgb(80,80,80)';
  view360Icon.style.fontSize = '30px';
  view360Icon.style.textAlign = 'center';
  view360Icon.style.lineHeight = '100px';
  view360Icon.style.zIndex = '100';
  view360Icon.style.cursor = 'pointer';
  view360Icon.style.transition = '0.5s all';
};

const setView360Icon = (view360Icon, image360IconUrl, image360IconBackgroundColor) => {

  if (image360IconUrl) {
    view360Icon.style.background = `rgba(255,255,255,0.8) url('` + image360IconUrl + `')`;
  } else {
    view360Icon.style.background = `rgba(255,255,255,0.8) url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='185.21mm' height='89.944mm' clip-rule='evenodd' fill-rule='evenodd' image-rendering='optimizeQuality' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' version='1.1' viewBox='0 0 1628 790' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C!%5BCDATA%5B .fil1 %7Bfill:none%7D .fil0 %7Bfill:%23727271;fill-rule:nonzero%7D %5D%5D%3E%3C/style%3E%3C/defs%3E%3Cpath class='fil0' d='m303 209c-36 61-85 201 19 293 28 24 59 42 92 58 49 23 100 39 152 51 29 7 58 12 87 16 28 4 57 7 86 9 24 1 48 2 72 2 25 0 59-1 83-3l-13-48 183 80-171 105 7-49c-26 2-62 3-89 3-22 0-43-1-65-2-27-2-53-4-79-7-28-3-57-7-85-13-20-4-40-8-60-13-25-7-48-14-72-22-18-6-35-13-52-20-16-8-32-15-47-23-13-8-26-15-38-23s-22-15-33-24c-9-7-18-15-26-23-7-7-14-15-20-22-5-7-10-13-15-20-4-6-8-13-12-20-4-6-7-13-10-19-3-8-6-16-8-25l-3-12-3-21c-6-91 52-161 120-208zm1017 0c64 45 120 109 120 194 0 127-141 218-238 263v-103c12-5 23-11 34-17 32-18 64-40 88-68 76-71 53-177-4-269zm-683 121c0 20-3 38-10 54-8 15-18 28-30 39-13 10-28 18-46 24-18 5-37 8-58 8-13 0-25-1-36-3s-21-4-29-7c-9-3-16-6-22-10-5-3-9-5-11-7-1-1-3-3-4-5 0-2-1-5-2-8-1-2-1-6-1-10-1-4-1-9-1-15 0-10 1-17 3-21 1-4 3-6 7-6 1 0 5 2 10 4 4 3 10 6 18 9 7 4 15 6 25 9s21 4 34 4c10 0 20-1 28-4 8-2 15-6 21-11 5-5 10-11 12-18 3-6 5-14 5-23s-2-17-5-25c-4-7-9-13-16-19-6-5-15-9-25-12s-22-4-35-4h-33c-2 0-5 0-6-1-2-1-3-2-5-5-1-2-2-5-2-9-1-4-1-9-1-16 0-6 0-11 1-15 0-3 1-6 2-8s3-4 4-5c2-1 4-1 6-1h33c11 0 21-1 29-4 9-3 16-7 22-12s10-12 13-19c4-7 5-16 5-25 0-6-1-13-3-19s-5-11-9-16c-5-4-10-8-16-10-7-3-15-4-24-4s-19 1-28 4c-9 4-17 7-24 11s-12 7-17 11c-5 3-9 5-11 5s-3-1-4-1c-1-1-2-2-3-5-1-2-1-5-2-9v-15-13c0-3 0-6 1-8 1-3 1-5 2-6 1-2 2-4 4-6s6-5 12-9 14-7 23-11 19-7 31-10c12-2 25-3 39-3 18 0 34 2 48 7 14 4 25 11 35 19 9 9 17 19 22 32s7 27 7 43c0 12-1 23-4 34-3 10-7 20-13 28s-13 15-21 21-18 10-29 13v1c13 2 25 5 35 11 11 5 20 12 27 21 7 8 13 17 16 28 4 10 6 21 6 33zm308-16c0 20-3 39-9 56-5 17-14 32-25 45-11 12-25 22-41 29-17 7-36 11-57 11-18 0-33-2-46-6-13-5-24-11-33-19-10-8-17-17-23-29-6-11-11-24-15-38-3-15-6-30-7-47s-2-35-2-54c0-15 1-32 2-49 2-17 4-34 8-51 5-16 10-32 18-47 7-15 17-28 29-40 12-11 26-20 43-26 17-7 37-10 60-10 7 0 15 0 22 1 8 1 15 2 21 4 6 1 12 3 16 5 5 1 7 3 9 4 1 2 2 3 3 5s2 3 2 5c1 2 1 5 1 8v10 16c0 4-1 8-2 10 0 3-1 4-3 5-1 1-3 2-5 2s-5-1-9-2c-3-2-8-3-13-5-5-1-11-3-18-4s-16-2-25-2c-15 0-29 3-39 9-11 7-20 15-27 26-6 11-11 23-14 37-4 14-5 29-5 45 4-3 9-6 14-9 6-3 12-5 18-7 7-2 14-4 21-5 8-2 16-2 24-2 19 0 35 2 49 8 13 6 24 14 33 24s15 23 19 38c4 14 6 31 6 49zm-75 7c0-10 0-19-2-27s-5-15-9-20c-3-6-9-10-15-13s-14-4-23-4c-6 0-11 1-16 2s-10 2-15 4l-15 6c-5 3-9 6-13 9 0 22 1 40 4 55 2 15 5 26 10 35 4 9 10 15 17 19 7 3 15 5 24 5s17-2 23-5c7-4 12-9 17-15 4-7 8-14 10-23 2-8 3-18 3-28zm377-76c0 32-2 61-7 87s-13 48-24 66c-11 19-25 33-42 42-18 10-39 15-64 15-26 0-47-5-64-14-17-10-30-23-40-41s-17-39-21-65c-4-25-6-54-6-87 0-32 3-61 8-86 5-26 13-49 23-67 11-18 26-32 43-42 17-9 39-14 64-14 26 0 47 4 64 14 17 9 30 23 40 40 10 18 16 40 20 65 4 26 6 55 6 87zm-76 4c0-19-1-35-2-50s-2-27-4-38-5-20-8-27c-3-8-6-14-11-18-4-5-9-8-14-10-6-1-12-2-18-2-12 0-21 3-29 8-7 6-13 15-17 27-5 12-8 26-10 44-1 18-2 38-2 61 0 29 1 53 3 71 2 19 5 34 10 45s10 19 18 23c7 5 15 7 26 7 7 0 14-1 20-4 5-2 10-6 15-11 4-6 8-12 11-20s5-17 7-27c2-11 3-22 4-35 0-13 1-28 1-44zm274-151c0 11-2 22-6 32s-10 19-17 26c-7 8-16 13-26 18-10 4-20 6-32 6s-23-2-33-6c-9-4-18-9-25-16s-12-16-16-25c-3-10-5-21-5-32 0-12 2-23 6-33s10-18 17-26c7-7 15-13 25-17s21-7 33-7 23 2 32 6c10 4 18 10 25 17 7 6 12 15 16 24 4 10 6 21 6 33zm-50 1c0-5-1-9-2-14-2-4-4-8-7-11-2-3-6-6-9-7-4-2-9-3-13-3s-8 1-12 3-7 4-9 7c-3 3-5 7-7 11-1 4-2 9-2 14s1 9 2 14c2 4 4 8 7 11s6 6 10 7c4 2 8 3 12 3s8-1 12-3c4-1 7-4 10-7 2-3 4-7 6-11 1-4 2-9 2-14z'/%3E%3Crect class='fil1' width='1628' height='790'/%3E%3C/svg%3E")`;
  }

  if (image360IconBackgroundColor) view360Icon.style.backgroundColor = image360IconBackgroundColor;
  view360Icon.style.backgroundPosition = 'center';
  view360Icon.style.backgroundSize = '100%';
  view360Icon.style.backgroundRepeat = 'no-repeat';
}

const setRotateIconStyles = (view360CircleIcon, rotateIconUrl) => {
  view360CircleIcon.style.position = 'absolute';
  view360CircleIcon.style.top = 'auto';
  view360CircleIcon.style.bottom = '5px';
  view360CircleIcon.style.right = '5px';
  view360CircleIcon.style.width = '40px';
  view360CircleIcon.style.height = '40px';
  view360CircleIcon.style.margin = 'auto';
  view360CircleIcon.style.transition = '0.5s all';
  view360CircleIcon.style.zIndex = '2';

  if (rotateIconUrl) {
    view360CircleIcon.style.background = `url('` + rotateIconUrl + `')`;
  } else {
    view360CircleIcon.style.background = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='52.917mm' height='52.917mm' clip-rule='evenodd' fill-rule='evenodd' image-rendering='optimizeQuality' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' version='1.1' viewBox='0 0 1633 1633' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C!%5BCDATA%5B .fil0 %7Bfill:%23727271;fill-rule:nonzero%7D %5D%5D%3E%3C/style%3E%3C/defs%3E%3Cpath class='fil0' d='m1146 749c-17 4-34-5-39-22s5-35 22-40l17 62zm22-7-22 7-17-62 21-7 18 62zm76-50-32 56-2-1-1-1-2-1h-1l-1-1h-2l-1-1h-1l-1-1h-2l-1-1h-1-2-1l-1-1h-1-2-1-1-2-1-1-2-1-1-2l-1 1h-2-1-2l-1 1h-2l-18-62h3l6-2h3l3-1h3l3-1h3 3 3 3 4 3 3 3 3l3 1h3l2 1 3 1h3l18 6 2 2 6 2 2 2 3 1zm57 81-64 5-1-1v-1-1-1-1l-1-1v-1-1h-1v-1l-1-1v-1l-1-1v-1l-3-3v-1l-5-5-2-1-3-3-2-1-2-2h-2l-1-1 32-56 3 2 2 1 3 2 2 1 2 2 3 2 4 4 3 2 6 6 3 2 2 2 2 3 2 2 2 3 2 2 1 3 4 6 1 3 2 3 3 9 2 4v3l1 3 1 4v3l1 4zm-34 384-30-379 64-5 30 379-64 5zm-8 109-18-62h1l4-2h1l2-1 3-3 2-1 4-4 1-2 2-2 1-2v-2l1-1 2-4v-2l1-1v-2-2l1-2v-3-2-2-2-2-3l64-5v5l1 4v5l-1 4v5l-1 4v5l-2 8-1 5-2 4-1 4-10 20-3 4-2 3-3 4-3 3-4 3-3 4-4 3-3 2-8 6-4 2-5 2-4 2-5 2-4 1zm-318 25 300-87 18 62-300 87-18-62zm-119 21 49-42 2 2 1 2 2 2 2 1 4 4 4 2 2 2 10 5h3l4 2h2l3 1h2 2l3 1h2 2 3 2l3-1h2 3l2-1h3l2-1 18 62-5 1-4 1-10 2h-4l-5 1h-5-5-4-5l-5-1h-4l-5-1-4-1-5-1-4-1-5-2-4-1-4-2-5-2-12-6-4-3-4-2-4-3-3-3-8-6-3-4-7-7zm0 0c-11-13-10-33 4-45 13-12 33-10 45 3l-49 42zm-210-340 259 298-49 42-259-298 49-42zm-49 42c-11-13-10-34 3-45 14-12 34-11 46 3l-49 42zm-2-97 50 40v1h-1v1 1h-1v1 1 1 1 1 1 1 1h1v1 1h1v1l1 1-49 42-2-3-2-2-4-6-1-3-2-3-2-6-2-3-1-3v-3l-2-6v-4-3-3-3-4-3-3l2-6v-4l2-6 2-3 1-3 2-3 1-3 2-3 2-2 2-3zm60 27-10 13-50-40 10-13 50 40zm-50-40c11-14 31-16 45-5s16 31 5 45l-50-40zm87-24-23 60h-1-1l-1-1h-1-1-1-1v1h-1-1l-1 1h-1v1h-1l-2 2-50-40 4-4 2-3 4-4 3-2 2-2 3-1 2-2 3-1 2-2 9-3 2-1 9-3h3l3-1h3 3 3 3 3l3 1h3l3 1h3l9 3zm120 114-143-54 23-60 143 54 19 22-42 38zm23-60c16 7 24 25 18 42-6 16-25 25-41 18l23-60zm-122-466 141 488-62 17-141-488 62-17zm-1-93 18 62h-1l-1 1h-2l-1 1h-1l-1 1h-1l-3 3v1l-3 3v1l-1 1v1l-1 1v1l-1 1v1 1l-1 2v1 1 1 1 2 1 1l1 1v2l-62 17-2-8-1-5v-4-5-4-4-5l2-8 1-5 2-8 4-8 2-3 4-8 3-3 2-4 9-9 4-3 3-2 4-3 4-2 3-2 4-2 5-2 4-2 4-1zm45 54-27 8-18-62 27-8 18 62zm92-1-61 18-1-1v-1l-1-2v-1l-2-2v-1l-2-2h-1l-1-1v-1l-2-2h-1l-1-1h-2l-1-1h-1l-1-1h-1-1l-1-1h-2-1-1-1-1-2-1l-1 1h-1l-18-62 4-1 5-1 4-1h4 5 4 5 4l4 1 5 1 8 2 4 2 4 1 8 4 3 2 4 2 3 3 4 3 3 2 6 6 3 4 3 3 4 8 3 3 2 5 1 4 2 4 1 4zm45 387-106-369 61-18 107 370-62 17zm62-17c5 17-5 34-22 39s-35-4-40-22l62-17z'/%3E%3Cpath class='fil0' d='m1058 780c5 17-5 35-22 40s-34-5-39-22l61-18zm-19-67 19 67-61 18-20-67 62-18zm-91 1-18-61 4-2h4l5-1 4-1h5 4 4l5 1h4l12 3 4 2 4 1 8 4 3 2 4 3 3 2 4 3 3 2 3 3 3 4 3 3 2 3 3 4 2 3 6 12 2 5 1 4-62 18v-1l-1-2v-1l-1-1v-1l-1-1v-1l-2-2h-1l-1-1v-1l-1-1h-1l-2-2h-1l-1-1h-1-2l-1-1h-1-1-1l-1-1h-1-2-1l-1 1h-1-1-1zm-95-39 77-22 18 61-77 22-18-61zm18 61c-17 5-35-4-40-21-5-18 5-35 22-40l18 61z'/%3E%3Cpath class='fil0' d='m1190 765c5 17-5 34-22 39s-35-4-40-22l62-17zm-9-31 9 31-62 17-9-30 62-18zm-121-14-18-62 6-2 5-1 6-1h5l6-1h6l5 1h6l10 2 6 1 25 10 4 3 5 3 8 6 16 16 3 4 6 10 3 4 2 5 2 6 4 10-62 18v-2l-1-2-1-3-2-4-2-2-2-4-2-1-1-2-2-2-2-1-2-2-2-1-1-1-2-1-3-1-8-4h-3l-2-1h-2-2-3-2-2-3-2l-3 1-2 1zm-70-47 52-15 18 62-52 15-18-62zm18 62c-17 4-35-5-40-22s5-35 22-40l18 62z'/%3E%3Cpath class='fil0' d='m888 532c-18 0-32-15-32-33 0-17 14-32 32-32v65zm144 0h-144v-65h144v65zm-20-157 227 124-227 125v-249zm20 92c17 0 32 15 32 32 0 18-15 33-32 33v-65z'/%3E%3Cpath class='fil0' d='m565 467c18 0 32 15 32 32 0 18-14 33-32 33v-65zm-143 0h143v65h-143v-65zm19 157-226-125 226-124v249zm-19-92c-18 0-32-15-32-33 0-17 14-32 32-32v65z'/%3E%3Cpath class='fil0' d='m816 90v-90l42 1 42 3 40 5 41 8 39 9 39 11 38 13 37 14 36 17 35 18 35 19 33 21 32 23 30 24 30 26 28 27 27 28 26 30 24 31 23 32 21 33 20 34 18 35 16 37 15 37 13 38 11 38 9 40 7 40 5 41 3 41 2 42h-90l-1-37-3-37-5-36-6-36-8-35-10-35-12-33-13-33-14-33-16-31-36-60-42-56-23-26-24-25-25-24-27-23-27-22-29-20-29-19-31-17-31-16-32-15-33-13-34-11-34-10-35-8-36-7-36-4-37-3-38-1zm-726 726h-90l1-42 3-41 5-41 8-40 9-40 11-38 13-38 14-37 17-37 18-35 19-34 21-33 23-32 24-31 26-30 27-28 28-27 30-26 31-24 32-23 33-21 34-19 35-18 37-17 37-14 38-13 38-11 40-9 40-8 41-5 41-3 42-1v90l-37 1-37 3-36 4-36 7-35 8-35 10-33 11-33 13-33 15-31 16-30 17-30 19-28 20-28 22-26 23-25 24-24 25-23 26-22 28-20 28-19 30-17 30-16 31-15 33-13 33-11 33-10 35-8 35-7 36-4 36-3 37-1 37zm726 727v90l-42-2-41-3-41-5-40-7-40-9-38-11-38-13-37-15-37-16-35-18-34-20-33-21-32-23-31-24-30-26-28-27-27-28-26-30-24-30-23-32-21-33-19-35-18-35-17-36-14-37-13-38-11-39-9-39-8-41-5-40-3-42-1-42h90l1 38 3 37 4 36 7 36 8 35 10 34 11 34 13 33 15 32 16 31 17 31 19 29 20 29 22 27 23 27 24 25 25 24 26 23 56 42 60 36 31 16 33 14 33 13 33 12 35 10 35 8 36 6 36 5 37 3 37 1zm727-727h90l-2 42-3 42-5 40-7 41-9 39-11 39-13 38-15 37-16 36-18 35-20 35-21 33-23 32-24 30-26 30-27 28-28 27-30 26-30 24-32 23-33 21-35 20-35 18-36 16-37 15-38 13-39 11-39 9-41 7-40 5-42 3-42 2v-90l38-1 37-3 36-5 36-6 35-8 34-10 34-12 33-13 32-14 31-16 31-18 29-18 29-21 27-21 27-23 25-24 24-25 23-27 21-27 21-29 18-29 18-31 16-31 14-32 13-33 12-34 10-34 8-35 6-36 5-36 3-37 1-38z'/%3E%3C/svg%3E%0A")`;
  }
  view360CircleIcon.style.backgroundPosition = 'center';
  view360CircleIcon.style.backgroundSize = 'contain';
  view360CircleIcon.style.backgroundRepeat = 'no-repeat';
};

const setLoaderStyles = (loader) => {
  loader.className = 'cloudimage-360-loader';
  loader.style.position = 'absolute';
  loader.style.zIndex = '100';
  loader.style.top = '0';
  loader.style.left = '0';
  loader.style.right = '0';
  loader.style.width = '0%';
  loader.style.height = '8px';
  loader.style.background = 'rgb(165,175,184)';
};

const setBoxShadowStyles = (boxShadow, boxShadowValue) => {
  boxShadow.className = 'cloudimage-360-box-shadow';
  boxShadow.style.position = 'absolute';
  boxShadow.style.zIndex = '99';
  boxShadow.style.top = '0';
  boxShadow.style.left = '0';
  boxShadow.style.right = '0';
  boxShadow.style.bottom = '0';
  boxShadow.style.boxShadow = boxShadowValue;
};

const setMagnifyIconStyles = (magnifyIcon, fullScreen, magnifierIconUrl) => {
  magnifyIcon.style.position = 'absolute';
  magnifyIcon.style.top = fullScreen ? '5px' : '5px';
  magnifyIcon.style.right = '5px';
  magnifyIcon.style.width = '40px';
  magnifyIcon.style.height = '40px';
  magnifyIcon.style.zIndex = '101';
  magnifyIcon.style.cursor = 'pointer';

  if (magnifierIconUrl) {
    magnifyIcon.style.background = `url('` + magnifierIconUrl + `')`;
  } else {
    magnifyIcon.style.background = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='52.917mm' height='52.917mm' clip-rule='evenodd' fill-rule='evenodd' image-rendering='optimizeQuality' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' version='1.1' viewBox='0 0 31102 31102' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C!%5BCDATA%5B .fil0 %7Bfill:%23727271;fill-rule:nonzero%7D %5D%5D%3E%3C/style%3E%3C/defs%3E%3Cpath class='fil0' d='m15551 1714v-1714l799 20 790 60 778 99 766 137 753 174 738 209 723 245 706 278 689 312 671 343 651 375 631 404 610 434 587 461 564 489 540 515 515 540 489 564 461 587 434 610 404 631 375 651 343 671 312 689 278 706 245 723 209 738 174 753 137 766 99 778 60 790 20 799h-1714l-18-713-54-703-88-692-122-682-154-669-186-656-218-643-247-628-277-612-306-597-333-579-360-562-386-542-411-523-435-502-458-481-481-458-502-435-523-411-542-386-562-360-579-333-597-306-612-277-628-247-643-218-656-186-669-155-682-121-692-88-703-54-713-18zm-13837 13837h-1714l20-799 60-790 99-778 137-766 174-753 209-738 245-723 278-706 312-689 343-671 375-651 404-631 434-610 461-587 489-564 515-540 540-515 564-489 587-461 610-434 631-404 651-375 671-343 689-312 706-278 723-245 738-209 753-174 766-137 778-99 790-60 799-20v1714l-713 18-703 54-692 88-682 121-669 155-656 186-643 218-628 247-612 277-597 306-579 333-562 360-542 386-523 411-502 435-481 458-458 481-435 502-411 523-386 542-360 562-333 579-306 597-277 612-247 628-218 643-186 656-155 669-121 682-88 692-54 703-18 713zm13837 13837v1714l-799-20-790-60-778-99-766-137-753-174-738-209-723-245-706-278-689-312-671-343-651-375-631-404-610-434-587-461-564-489-540-515-515-540-489-564-461-587-434-610-404-631-375-651-343-671-312-689-278-706-245-723-209-738-174-753-137-766-99-778-60-790-20-799h1714l18 713 54 703 88 692 121 682 155 669 186 656 218 643 247 628 277 612 306 597 333 579 360 562 386 542 411 523 435 502 458 481 481 458 502 435 523 411 542 386 562 360 579 333 597 306 612 277 628 247 643 218 656 186 669 154 682 122 692 88 703 54 713 18zm13837-13837h1714l-20 799-60 790-99 778-137 766-174 753-209 738-245 723-278 706-312 689-343 671-375 651-404 631-434 610-461 587-489 564-515 540-540 515-564 489-587 461-610 434-631 404-651 375-671 343-689 312-706 278-723 245-738 209-753 174-766 137-778 99-790 60-799 20v-1714l713-18 703-54 692-88 682-122 669-154 656-186 643-218 628-247 612-277 597-306 579-333 562-360 542-386 523-411 502-435 481-458 458-481 435-502 411-523 386-542 360-562 333-579 306-597 277-612 247-628 218-643 186-656 154-669 122-682 88-692 54-703 18-713z'/%3E%3Cpath class='fil0' d='m18977 12575h-1714l-7-252-18-249-31-244-43-240-55-236-66-232-76-226-88-222-97-216-108-210-118-204-127-199-136-191-145-185-153-177-162-170-170-162-177-153-185-145-191-136-199-127-204-118-210-108-216-97-222-88-226-76-232-66-236-55-240-42-244-32-249-18-252-7v-1714l339 9 335 25 330 42 325 58 319 74 314 89 306 103 300 119 293 132 284 146 277 159 267 171 259 184 249 196 239 207 229 218 218 229 207 239 196 249 184 259 172 267 158 277 146 284 132 293 119 300 103 306 89 314 74 319 58 325 42 330 26 335 8 339zm-6597 6597v-1715l252-6 249-19 244-31 240-43 236-54 232-66 226-77 222-87 216-98 210-107 204-118 199-127 191-136 185-145 177-154 170-162 162-170 153-177 145-184 136-192 127-198 118-204 108-211 97-216 88-221 76-227 66-231 55-236 43-241 31-244 18-248 7-252h1714l-8 338-26 335-42 330-58 325-74 320-89 313-103 307-119 300-132 292-146 285-158 276-172 268-184 258-196 249-207 240-218 228-229 219-239 207-249 196-259 183-267 172-277 159-284 146-293 132-300 118-306 104-314 89-319 74-325 58-330 42-335 25-339 9zm-6597-6597h1715l6 252 19 248 31 244 43 241 54 236 66 231 77 227 87 221 98 216 108 211 117 204 127 198 136 192 145 184 154 177 162 170 170 162 177 154 184 145 192 136 198 127 205 117 210 108 216 98 221 87 227 77 231 66 236 54 241 43 244 31 248 19 252 6v1715l-338-9-335-25-330-42-325-58-320-74-313-89-307-104-300-118-292-132-285-146-276-159-268-172-258-183-249-196-239-207-229-219-219-228-207-240-196-249-183-258-172-268-159-276-146-285-132-292-118-300-104-307-89-313-74-320-58-325-42-330-25-335-9-338zm6597-6597v1714l-252 7-248 18-244 32-241 42-236 55-231 66-227 76-221 88-216 97-210 108-205 118-198 127-192 136-184 145-177 153-170 162-162 170-154 177-145 185-136 191-127 199-117 204-108 210-98 216-87 222-77 226-66 232-54 236-43 240-31 244-19 249-6 252h-1715l9-339 25-335 42-330 58-325 74-319 89-314 104-306 118-300 132-293 146-284 159-277 172-267 183-259 196-249 207-239 219-229 229-218 239-207 249-196 258-184 268-171 276-159 285-146 292-132 300-119 307-103 313-89 320-74 325-58 330-42 335-25 338-9z'/%3E%3Cpath class='fil0' d='m15833 17239c-335-334-335-877 0-1212 335-334 877-334 1212 0l-1212 1212zm6402 6403-6402-6403 1212-1212 6402 6403-1212 1212zm1212-1212c335 334 335 877 0 1212-334 335-877 335-1212 0l1212-1212z'/%3E%3C/svg%3E%0A")`;
  }

  magnifyIcon.style.backgroundPosition = 'center';
  magnifyIcon.style.backgroundSize = 'contain';
  magnifyIcon.style.backgroundRepeat = 'no-repeat';
};

const setFullScreenModalStyles = (fullScreenModal) => {
  fullScreenModal.style.position = 'fixed';
  fullScreenModal.style.top = '0';
  fullScreenModal.style.bottom = '0';
  fullScreenModal.style.left = '0';
  fullScreenModal.style.right = '0';
  fullScreenModal.style.width = '100%';
  fullScreenModal.style.height = '100%';
  fullScreenModal.style.zIndex = '1049';
  fullScreenModal.style.background = '#fff';
};

const setFullScreenIconStyles = (fullScreenIcon, fullScreenIconUrl) => {
  fullScreenIcon.style.position = 'absolute';
  fullScreenIcon.style.top = '5px';
  fullScreenIcon.style.left = '5px';
  fullScreenIcon.style.width = '40px';
  fullScreenIcon.style.height = '40px';
  fullScreenIcon.style.zIndex = '101';
  fullScreenIcon.style.cursor = 'pointer';
  if (fullScreenIconUrl) {
    fullScreenIcon.style.background = `url('` + fullScreenIconUrl + `')`;
  } else {
    fullScreenIcon.style.background = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='52.917mm' height='52.917mm' clip-rule='evenodd' fill-rule='evenodd' image-rendering='optimizeQuality' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' version='1.1' viewBox='0 0 2238 2238' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C!%5BCDATA%5B .fil0 %7Bfill:%23727271;fill-rule:nonzero%7D %5D%5D%3E%3C/style%3E%3C/defs%3E%3Cpath class='fil0' d='m1271 1585c24-24 63-24 87 0s24 63 0 88l-87-88zm-196 196 196-196 87 88-196 195h-87v-87zm87 87c-24 25-63 25-87 0-24-24-24-63 0-87l87 87zm-196-283 196 196-87 87-196-195 87-88zm-87 88c-24-25-24-64 0-88s63-24 87 0l-87 88zm-247-423c24 24 24 64 0 88-25 24-64 24-88 0l88-88zm-196-196 196 196-88 88-196-196v-88h88zm-88 88c-24-24-24-63 0-88 24-24 64-24 88 0l-88 88zm284-196-196 196-88-88 196-195 88 87zm-88-87c24-25 63-25 88 0 24 24 24 63 0 87l-88-87zm422-248c-24 24-63 24-87 0s-24-63 0-87l87 87zm196-196-196 196-87-87 196-196h87v87zm-87-87c24-24 63-24 87 0s24 63 0 87l-87-87zm196 283-196-196 87-87 196 196-87 87zm87-87c24 24 24 63 0 87s-63 24-87 0l87-87zm248 422c-24-24-24-63 0-87 24-25 63-25 87 0l-87 87zm196 196-196-196 87-87 196 195v88h-87zm87-88c24 25 24 64 0 88s-63 24-87 0l87-88zm-283 196 196-196 87 88-196 196-87-88zm87 88c-24 24-63 24-87 0s-24-64 0-88l87 88z'/%3E%3Cpath class='fil0' d='m1119 123v-123l57 1 57 5 56 7 55 10 54 12 53 15 52 18 51 20 50 22 48 25 47 27 45 29 44 31 42 33 41 36 39 37 37 39 35 40 33 42 31 44 30 46 26 46 25 49 23 49 20 51 17 52 15 53 13 54 10 55 7 56 4 57 2 58h-124l-1-52-4-50-6-50-9-49-11-48-14-47-15-46-18-46-20-44-22-43-24-41-26-41-28-39-29-37-31-37-33-34-35-33-36-31-38-30-39-28-40-26-42-24-43-22-44-19-45-18-46-16-47-13-49-11-49-9-49-7-51-3-51-2zm-996 996h-123l1-58 5-57 7-56 10-55 12-54 15-53 18-52 20-51 22-49 25-49 27-46 29-46 31-44 33-42 36-40 37-39 39-37 40-36 42-33 44-31 46-29 46-27 49-25 49-22 51-20 52-18 53-15 54-12 55-10 56-7 57-5 58-1v123l-52 2-50 3-50 7-49 9-48 11-47 13-47 16-45 18-44 19-43 22-41 24-41 26-39 28-37 30-37 31-34 33-33 34-31 37-30 37-28 39-26 41-24 41-22 43-19 44-18 45-16 47-13 47-11 48-9 49-7 50-3 50-2 52zm996 995v124l-58-2-57-4-56-7-55-10-54-13-53-15-52-17-51-20-49-23-49-25-46-26-46-30-44-31-42-33-40-35-39-37-37-39-36-41-33-42-31-44-29-45-27-47-25-48-22-50-20-51-18-52-15-53-12-54-10-55-7-56-5-57-1-57h123l2 51 3 51 7 49 9 49 11 49 13 47 16 46 18 45 19 44 22 43 24 42 26 40 28 39 30 38 31 36 33 35 34 33 37 31 37 29 39 28 41 26 41 24 43 22 44 20 45 18 47 15 47 14 48 11 49 9 50 6 50 4 52 1zm995-995h124l-2 57-4 57-7 56-10 55-13 54-15 53-17 52-20 51-23 50-25 48-26 47-30 45-31 44-33 42-35 41-37 39-39 37-41 35-42 33-44 31-45 30-47 26-48 25-50 23-51 20-52 17-53 15-54 13-55 10-56 7-57 4-57 2v-124l51-1 51-4 49-6 49-9 49-11 47-14 46-15 45-18 44-20 43-22 42-24 40-26 39-28 38-29 36-31 35-33 33-35 31-36 29-38 28-39 26-40 24-42 22-43 20-44 18-45 15-46 14-47 11-49 9-49 6-49 4-51 1-51z'/%3E%3C/svg%3E%0A")`;
  }

  fullScreenIcon.style.backgroundPosition = 'center';
  fullScreenIcon.style.backgroundSize = 'contain';
  fullScreenIcon.style.backgroundRepeat = 'no-repeat';
  
};

const setPlayIconStyles = (playIcon, playIconUrl) => {
  playIcon.style.position = 'absolute';
  playIcon.style.bottom = '5px';
  playIcon.style.left = '5px';
  playIcon.style.width = '40px';
  playIcon.style.height = '40px';
  playIcon.style.zIndex = '101';
  playIcon.style.cursor = 'pointer';
  if (playIconUrl) {
    playIcon.style.background = `url('` + playIconUrl + `')`;
  } else {
    playIcon.style.background = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='52.917mm' height='52.917mm' clip-rule='evenodd' fill-rule='evenodd' image-rendering='optimizeQuality' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' version='1.1' viewBox='0 0 4116 4116' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C!%5BCDATA%5B .fil0 %7Bfill:%23727271;fill-rule:nonzero%7D %5D%5D%3E%3C/style%3E%3C/defs%3E%3Cpath class='fil0' d='m2058 227v-227l106 3 104 8 103 13 102 18 99 23 98 28 95 32 94 37 91 41 89 45 86 50 84 54 80 57 78 61 75 65 71 68 68 71 65 75 61 78 57 80 54 84 49 86 46 89 41 91 37 93 32 96 28 98 23 99 18 102 13 103 8 104 3 106h-227l-2-94-7-93-12-92-16-90-21-89-24-87-29-85-33-83-37-81-40-79-44-76-48-75-51-72-54-69-58-66-60-64-64-60-66-58-70-54-71-51-75-48-76-44-79-41-81-36-83-33-86-29-86-24-89-21-90-16-92-12-93-7-94-2zm-1831 1831h-227l3-106 8-104 13-103 18-102 23-99 28-98 32-96 37-93 41-91 45-89 50-86 54-84 57-80 61-78 65-75 68-71 71-68 75-65 78-61 80-57 84-54 86-50 89-45 91-41 93-37 96-32 98-28 99-23 102-18 103-13 104-8 106-3v227l-94 2-93 7-92 12-90 16-89 21-87 24-85 29-83 33-81 36-79 41-76 44-75 48-72 51-69 54-66 58-64 60-60 64-58 66-54 69-51 72-48 75-44 76-41 79-36 81-33 83-29 85-24 87-21 89-16 90-12 92-7 93-2 94zm1831 1831v227l-106-3-104-8-103-13-102-18-99-23-98-28-96-32-93-37-91-41-89-46-86-49-84-54-80-57-78-61-75-65-71-68-68-71-65-75-61-78-57-80-54-84-50-86-45-89-41-91-37-94-32-95-28-98-23-99-18-102-13-103-8-104-3-106h227l2 94 7 93 12 92 16 90 21 89 24 86 29 86 33 83 36 81 41 79 44 76 48 75 51 71 54 70 58 66 60 64 64 60 66 58 69 54 72 51 75 48 76 44 79 40 81 37 83 33 85 29 87 24 89 21 90 16 92 12 93 7 94 2zm1831-1831h227l-3 106-8 104-13 103-18 102-23 99-28 98-32 95-37 94-41 91-46 89-49 86-54 84-57 80-61 78-65 75-68 71-71 68-75 65-78 61-80 57-84 54-86 49-89 46-91 41-94 37-95 32-98 28-99 23-102 18-103 13-104 8-106 3v-227l94-2 93-7 92-12 90-16 89-21 86-24 86-29 83-33 81-37 79-40 76-44 75-48 71-51 70-54 66-58 64-60 60-64 58-66 54-70 51-71 48-75 44-76 40-79 37-81 33-83 29-86 24-86 21-89 16-90 12-92 7-93 2-94z'/%3E%3Cpath class='fil0' d='m2949 2166-1363-1055 139-179 1363 1055v179h-139zm139-179c49 38 58 109 20 159-38 49-110 58-159 20l139-179zm-1502 1054 1363-1054 139 179-1363 1055-183-90 44-90zm139 180c-49 38-121 29-159-20-38-50-29-121 20-160l139 180zm44-2200v2110h-227v-2110l183-89 44 89zm-227 0c0-62 51-113 114-113 62 0 113 51 113 113h-227z'/%3E%3C/svg%3E%0A")`;
  }
  playIcon.style.backgroundPosition = 'center';
  playIcon.style.backgroundSize = 'contain';
  playIcon.style.backgroundRepeat = 'no-repeat';
};


const setCloseFullScreenViewStyles = (closeFullScreenIcon, closeFullScreenIconUrl) => {
  closeFullScreenIcon.style.position = 'absolute';
  closeFullScreenIcon.style.top = '5px';
  closeFullScreenIcon.style.right = '5px';
  closeFullScreenIcon.style.width = '40px';
  closeFullScreenIcon.style.height = '40px';
  closeFullScreenIcon.style.zIndex = '101';
  closeFullScreenIcon.style.cursor = 'pointer';
  if (closeFullScreenIconUrl) {
    closeFullScreenIcon.style.background = `url('` + closeFullScreenIconUrl + `')`;
  } else {
    closeFullScreenIcon.style.background = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='52.917mm' height='52.917mm' clip-rule='evenodd' fill-rule='evenodd' image-rendering='optimizeQuality' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' version='1.1' viewBox='0 0 5487 5487' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C!%5BCDATA%5B .fil0 %7Bfill:%23727271;fill-rule:nonzero%7D %5D%5D%3E%3C/style%3E%3C/defs%3E%3Cpath class='fil0' d='m1322 1536c-59-59-59-155 0-214s155-59 214 0l-214 214zm2629 2629-2629-2629 214-214 2629 2629-214 214zm214-214c59 59 59 155 0 214s-155 59-214 0l214-214zm-214-2629c59-59 155-59 214 0s59 155 0 214l-214-214zm-2629 2629 2629-2629 214 214-2629 2629-214-214zm214 214c-59 59-155 59-214 0s-59-155 0-214l214 214z'/%3E%3Cpath class='fil0' d='m2744 302v-302l141 4 139 10 137 18 135 24 133 30 130 37 128 44 125 49 121 55 119 60 114 66 112 72 107 76 104 82 99 86 96 91 91 95 86 99 81 104 77 108 71 111 66 115 61 118 55 122 49 124 43 128 37 130 31 133 24 135 17 137 11 140 3 141h-302l-3-126-10-124-15-122-22-121-27-118-33-115-38-114-44-111-49-108-54-105-58-102-64-99-68-96-73-92-76-89-81-85-85-80-89-77-92-73-96-68-99-63-102-59-105-54-108-49-111-43-113-39-116-33-118-27-120-21-123-16-124-9-125-4zm-2442 2442h-302l4-141 10-140 18-137 24-135 30-133 37-130 44-128 49-124 55-122 60-118 66-115 72-111 76-108 82-104 86-99 91-95 95-91 99-86 104-82 108-76 111-72 115-66 118-60 122-55 124-49 128-44 130-37 133-30 135-24 137-18 140-10 141-4v302l-126 4-124 9-122 16-121 21-118 27-115 33-114 39-111 43-108 49-105 54-102 59-99 63-96 68-92 73-89 77-85 80-80 85-77 89-73 92-68 96-63 99-59 102-54 105-49 108-43 111-39 114-33 115-27 118-21 121-16 122-9 124-4 126zm2442 2441v302l-141-3-140-11-137-17-135-24-133-31-130-37-128-43-124-49-122-55-118-61-115-66-111-71-108-77-104-81-99-86-95-91-91-96-86-99-82-104-76-107-72-112-66-114-60-119-55-121-49-125-44-128-37-130-30-133-24-135-18-137-10-139-4-141h302l4 125 9 124 16 123 21 120 27 118 33 116 39 113 43 111 49 108 54 105 59 102 63 99 68 96 73 92 77 89 80 85 85 81 89 76 92 73 96 68 99 64 102 58 105 54 108 49 111 44 114 38 115 33 118 27 121 22 122 15 124 10 126 3zm2441-2441h302l-3 141-11 139-17 137-24 135-31 133-37 130-43 128-49 125-55 121-61 119-66 114-71 112-77 107-81 104-86 99-91 96-96 91-99 86-104 81-107 77-112 71-114 66-119 61-121 55-125 49-128 43-130 37-133 31-135 24-137 17-139 11-141 3v-302l125-3 124-10 123-15 120-22 118-27 116-33 113-38 111-44 108-49 105-54 102-58 99-64 96-68 92-73 89-76 85-81 81-85 76-89 73-92 68-96 64-99 58-102 54-105 49-108 44-111 38-113 33-116 27-118 22-120 15-123 10-124 3-125z'/%3E%3C/svg%3E%0A")`;
  }
  closeFullScreenIcon.style.backgroundPosition = 'center';
  closeFullScreenIcon.style.backgroundSize = 'contain';
  closeFullScreenIcon.style.backgroundRepeat = 'no-repeat';
};

const magnify = (container, src, glass, zoom) => {
  let w, h, bw;
  glass.setAttribute("class", "img-magnifier-glass");
  container.prepend(glass);

  glass.style.backgroundColor = '#fff';
  glass.style.backgroundImage = "url('" + src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (container.offsetWidth * zoom) + "px " + (container.offsetHeight * zoom) + "px";
  glass.style.position = 'absolute';
  glass.style.boxShadow = 'rgb(0, 0, 0, 0.8) 0px 0px 10px';
  glass.style.borderRadius = '10%';
  glass.style.cursor = 'wait';
  glass.style.lineHeight = '200px';
  glass.style.textAlign = 'center';
  glass.style.zIndex = '1000';

  glass.style.width = '250px';
  glass.style.height = '250px';
  glass.style.top = '-75px';
  glass.style.right = '-85px';

  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  glass.addEventListener("mousemove", moveMagnifier);
  container.addEventListener("mousemove", moveMagnifier);

  glass.addEventListener("touchmove", moveMagnifier);
  container.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    let pos, x, y;

    e.preventDefault();

    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

    if (x > container.offsetWidth - (w / zoom)) {
      x = container.offsetWidth - (w / zoom);
    }

    if (x < w / zoom) {
      x = w / zoom;
    }

    if (y > container.offsetHeight - (h / zoom)) {
      y = container.offsetHeight - (h / zoom);
    }

    if (y < h / zoom) {
      y = h / zoom;
    }

    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";

    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    let a, x = 0, y = 0;
    e = e || window.event;
    a = container.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return { x, y };
  }
};

const fit = (contains) => {
  return (parentWidth, parentHeight, childWidth, childHeight, scale = 1, offsetX = 0.5, offsetY = 0.5) => {
    const childRatio = childWidth / childHeight
    const parentRatio = parentWidth / parentHeight
    let width = parentWidth * scale
    let height = parentHeight * scale

    if (contains ? (childRatio > parentRatio) : (childRatio < parentRatio)) {
      height = width / childRatio
    } else {
      width = height * childRatio
    }

    return {
      width,
      height,
      offsetX: (parentWidth - width) * offsetX,
      offsetY: (parentHeight - height) * offsetY
    }
  }
};

const contain = fit(true);

const addClass = (el, className) => {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
};

const removeClass = (el, className) => {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
};

const pad = (n, width = 0) => {
  n = n + '';

  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};

export {
  get360ViewProps,
  set360ViewIconStyles,
  setRotateIconStyles,
  setLoaderStyles,
  setBoxShadowStyles,
  setView360Icon,
  magnify,
  setMagnifyIconStyles,
  setFullScreenModalStyles,
  setFullScreenIconStyles,
  setPlayIconStyles,
  setCloseFullScreenViewStyles,
  contain,
  addClass,
  removeClass,
  pad,
  setInnerBoxStyles
}