import {
  addClass,
  contain,
  get360ViewProps,
  magnify,
  pad,
  removeClass,
  setRotateIconStyles,
  set360ViewIconStyles,
  setBoxShadowStyles,
  setCloseFullScreenViewStyles,
  setFullScreenIconStyles,
  setPlayIconStyles,
  setFullScreenModalStyles,
  setLoaderStyles,
  setMagnifyIconStyles,
  setView360Icon,
  setInnerBoxStyles
} from './axigear360.utils';
import { setTimeout } from 'core-js';


class AXIGEAR360Viewer {
  constructor(container, fullScreen, ratio) {
    this.container = container;
    this.activeImage = 1;
    this.movementStart = 0;
    this.isClicked = false;
    this.loadedImages = 0;
    this.imagesLoaded = false;
    this.reversed = false;
    this.fullScreenView = !!fullScreen;
    this.ratio = ratio;
    this.images = [];
    this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);
    this.isMobile = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    this.id = container.id;
    this.init(container);
    this.isRotating = false;
  }

  mousedown(event) {
    event.preventDefault();

    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if (this.view360Icon) {
      this.remove360ViewIcon();
    }

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }

    this.movementStart = event.pageX;
    this.isClicked = true;
    this.container.style.cursor = 'grabbing';
  }

  mouseup() {
    if (!this.imagesLoaded) return;

    this.movementStart = 0;
    this.isClicked = false;
    this.container.style.cursor = 'grab';

    if (this.rotateIcon) {
      this.showRotateIcon();
    }
  }

  mousemove(event) {
    if (!this.isClicked || !this.imagesLoaded) return;

    this.onMove(event.pageX);
  }

  touchstart(event) {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if (this.view360Icon) {
      this.remove360ViewIcon();
    }

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }

    this.movementStart = event.touches[0].clientX;
    this.isClicked = true;
  }

  touchend() {
    if (!this.imagesLoaded) return;

    this.movementStart = 0;
    this.isClicked = false;

    if (this.rotateIcon) this.showRotateIcon();
  }

  touchmove(event) {
    if (!this.isClicked || !this.imagesLoaded) return;

    this.onMove(event.touches[0].clientX);
  }

  keydownGeneral() {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }
  }

  keydown(event) {
    if (!this.imagesLoaded) return;

    if (this.glass) {
      this.closeMagnifier();
    }

    if ([37, 39].includes(event.keyCode)) {
      if (37 === event.keyCode) {
        if (this.reversed)
          this.prev();
        else
          this.next();
      } else if (39 === event.keyCode) {
        if (this.reversed)
          this.next();
        else
          this.prev();
      }

      this.onSpin();
    }
  }

  onSpin() {
    if (this.rotateIcon) {
      this.hideRotateIcon();
    }

    if (this.view360Icon) {
      this.remove360ViewIcon();
    }

    if (this.autoplay || this.loopTimeoutId) {
      this.stop();
      this.autoplay = false;
    }
  }

  keyup(event) {
    if (!this.imagesLoaded) return;

    if ([37, 39].includes(event.keyCode)) {
      this.onFinishSpin();
    }
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////
  onFinishSpin() {
    if (this.rotateIcon) this.showRotateIcon();
  }

  onMove(pageX) {
    if (pageX - this.movementStart >= this.speedFactor) {
      let itemsSkippedRight = Math.floor((pageX - this.movementStart) / this.speedFactor) || 1;

      this.movementStart = pageX;

      if (this.spinReverse) {
        this.moveActiveIndexDown(itemsSkippedRight);
      } else {
        this.moveActiveIndexUp(itemsSkippedRight);
      }

      if (this.rotateIcon) this.hideRotateIcon();
      

      this.update();
    } else if (this.movementStart - pageX >= this.speedFactor) {
      let itemsSkippedLeft = Math.floor((this.movementStart - pageX) / this.speedFactor) || 1;

      this.movementStart = pageX;

      if (this.spinReverse) {
        this.moveActiveIndexUp(itemsSkippedLeft);
      } else {
        this.moveActiveIndexDown(itemsSkippedLeft);
      }

      if (this.rotateIcon) this.hideRotateIcon();

      this.update();
    }
    this.isRotating = false;
  }

  onWindowResize(){
    this.update();
  }

  moveActiveIndexUp(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      if (this.activeImage + itemsSkipped >= this.amount) {
        this.activeImage = this.amount;

        if (isReverse ? this.prevElem : this.nextElem) {
          addClass(isReverse ? this.prevElem : this.nextElem, 'not-active');
        }
      } else {
        this.activeImage += itemsSkipped;

        if (this.nextElem) {
          removeClass(this.nextElem, 'not-active');
        }

        if (this.prevElem) {
          removeClass(this.prevElem, 'not-active');
        }
      }
    } else {
      this.activeImage = (this.activeImage + itemsSkipped) % this.amount || this.amount;
    }
  }

  moveActiveIndexDown(itemsSkipped) {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

    if (this.stopAtEdges) {
      if (this.activeImage - itemsSkipped <= 1) {
        this.activeImage = 1;

        if (isReverse ? this.nextElem : this.prevElem) {
          addClass(isReverse ? this.nextElem : this.prevElem, 'not-active');
        }
      } else {
        this.activeImage -= itemsSkipped;

        if (this.prevElem) {
          removeClass(this.prevElem, 'not-active');
        }
        if (this.nextElem) {
          removeClass(this.nextElem, 'not-active');
        }
      }
    } else {
      if (this.activeImage - itemsSkipped < 1) {
        this.activeImage = this.amount + (this.activeImage - itemsSkipped);
      } else {
        this.activeImage -= itemsSkipped;
      }
    }
  }

  loop(reversed) {
    reversed ? this.prev() : this.next();
  }

  next() {
    this.moveActiveIndexUp(1);
    this.update();
  }

  prev() {
    this.moveActiveIndexDown(1);
    this.update();
  }

  update() {
    const image = this.images[this.activeImage - 1];
    const ctx = this.canvas.getContext("2d");

    ctx.scale(this.devicePixelRatio, this.devicePixelRatio);

    if (this.fullScreenView) {
      this.canvas.width = window.innerWidth * this.devicePixelRatio;
      this.canvas.style.width = window.innerWidth + 'px';
      this.canvas.height = window.innerHeight * this.devicePixelRatio;
      this.canvas.style.height = window.innerHeight + 'px';

      const { offsetX, offsetY, width, height } =
        contain(this.canvas.width, this.canvas.height, image.width, image.height);

      ctx.drawImage(image, offsetX, offsetY, width, height);
    } else {
      this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
      this.canvas.style.width = this.container.offsetWidth + 'px';
      this.canvas.height = this.container.offsetWidth * this.devicePixelRatio / image.width * image.height;
      this.canvas.style.height = this.container.offsetWidth / image.width * image.height + 'px';

      ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }


    //update container height
    this.container.style.height = this.canvas.style.height;
  }

  updatePercentageInLoader(percentage) {
    if (this.loader) {
      this.loader.style.width = percentage + '%';
    }

    if (this.view360Icon) {
      this.view360Icon.innerText = percentage + '%';
    }
  }

  onAllImagesLoaded() {
    this.imagesLoaded = true;
    this.container.style.cursor = 'grab';
    this.removeLoader();

    if (!this.fullScreenView) {
      this.speedFactor = Math.floor(this.dragSpeed / 150 * 36 / this.amount * 25 * this.container.offsetWidth / 1500) || 1;
    } else {
      const containerRatio = this.container.offsetHeight / this.container.offsetWidth;
      let imageOffsetWidth = this.container.offsetWidth;

      if (this.ratio > containerRatio) {
        imageOffsetWidth = this.container.offsetHeight / this.ratio;
      }

      this.speedFactor = Math.floor(this.dragSpeed / 150 * 36 / this.amount * 25 * imageOffsetWidth / 1500) || 1;
    }

    if (this.autoplay) {
      this.play();
    }

    if (!this.fullScreenView) this.view360Icon.innerText = '100%';
    
    if (this.view360Icon) {
      this.remove360ViewIcon();
    }

    if (this.magnifier && !this.fullScreenView) {
      this.addMagnifier();
    }

    if (this.playIcon && !this.fullScreenView) {
      this.addPlayIcon();
    }

    if (this.rotateIcon && !this.fullScreenView) {
      this.addRotateIcon();
    }

    if (this.fullScreen && !this.fullScreenView) {
      this.addFullScreenIcon();
    } else if (this.fullScreenView) {
      this.addCloseFullScreenView();
    }

    this.initControls();
  }

  onFirstImageLoaded(event) {
    
    if (this.fullScreenView) {
      this.canvas.width = window.innerWidth * this.devicePixelRatio;
      this.canvas.style.width = window.innerWidth + 'px';
      this.canvas.height = window.innerHeight * this.devicePixelRatio;
      this.canvas.style.height = window.innerHeight + 'px';

      const ctx = this.canvas.getContext("2d");

      const { offsetX, offsetY, width, height } =
        contain(this.canvas.width, this.canvas.height, event.target.width, event.target.height);

      ctx.drawImage(event.target, offsetX, offsetY, width, height);
    } else {
      this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
      this.canvas.style.width = this.container.offsetWidth + 'px';
      this.canvas.height = this.container.offsetWidth * this.devicePixelRatio / event.target.width * event.target.height;
      this.canvas.style.height = this.container.offsetWidth / event.target.width * event.target.height + 'px';

      const ctx = this.canvas.getContext("2d");

      ctx.drawImage(event.target, 0, 0, this.canvas.width, this.canvas.height);

      this.add360ViewIcon();
    }

    //CONTAINER height
    this.update();
    //this.container.style.height = this.canvas.style.height;

    if (this.ratio) {
      this.container.style.minHeight = 'auto';
    }

    if (this.boxShadow && !this.fullScreenView) {
      this.addBoxShadow();
    }
  }

  onImageLoad(index, event) {
    const percentage = Math.round(this.loadedImages / this.amount * 100);

    this.loadedImages += 1;
    this.updatePercentageInLoader(percentage);

    if (this.loadedImages === this.amount) {
      this.onAllImagesLoaded(event);
    } else if (index === 0) {
      this.onFirstImageLoaded(event);
    }
  }

  addCloseFullScreenView() {
    const closeFullScreenIcon = document.createElement('div');

    setCloseFullScreenViewStyles(closeFullScreenIcon, this.closeFullScreenIconUrl);

    closeFullScreenIcon.onclick = this.closeFullScreenModal.bind(this);

    this.innerBox.appendChild(closeFullScreenIcon);
  }

  add360ViewIcon() {
    const view360Icon = document.createElement('div');
    set360ViewIconStyles(view360Icon);
    this.view360Icon = view360Icon;
    this.innerBox.appendChild(view360Icon);
    this.view360Icon.innerText = '';
    if (!this.autoLoading) setView360Icon(this.view360Icon, this.image360IconUrl, this.image360IconBackgroundColor);
    if (!this.autoLoading) view360Icon.onclick = this.loadImages.bind(this);
  }

  addFullScreenIcon() {
    const fullScreenIcon = document.createElement('div');

    setFullScreenIconStyles(fullScreenIcon, this.fullScreenIconUrl);

    fullScreenIcon.onclick = this.openFullScreenModal.bind(this);
    

    this.innerBox.appendChild(fullScreenIcon);
  }

  addPlayIcon() {
    const playIcon = document.createElement('div');
    setPlayIconStyles(playIcon, this.playIconUrl);
    this.innerBox.appendChild(playIcon);
    playIcon.onclick = this.togglePlay.bind(this);
  }

  togglePlay(){
    if (!this.isRotating) {
      this.isRotating = true;
      this.play();
    } else {
      this.isRotating = false;
      this.stop();
    }
  }

  addMagnifier() {
    const magnifyIcon = document.createElement('div');

    setMagnifyIconStyles(magnifyIcon, this.fullScreen, this.magnifierIconUrl);

    magnifyIcon.onclick = this.magnify.bind(this);

    this.innerBox.appendChild(magnifyIcon);
  }

  getOriginalSrc() {
    const currentImage = this.images[this.activeImage - 1];
    const lastIndex = currentImage.src.lastIndexOf('//');

    return lastIndex > 10 ? currentImage.src.slice(lastIndex) : currentImage.src;
  }

  magnify() {
    const image = new Image();
    const src = this.getOriginalSrc();

    image.src = src;
    image.onload = () => {
      if (this.glass) {
        this.glass.style.cursor = 'none';
      }
    };

    this.glass = document.createElement('div');
    this.container.style.overflow = 'hidden';
    magnify(this.container, src, this.glass, this.magnifier || 3);
  }

  closeMagnifier() {
    if (!this.glass) return;

    this.container.style.overflow = 'visible';
    this.container.removeChild(this.glass);
    this.glass = null;
  }

  openFullScreenModal() {
    const fullScreenModal = document.createElement('div');

    setFullScreenModalStyles(fullScreenModal);

    const fullScreenContainer = this.container.cloneNode();
    const image = this.images[0];
    const ratio = image.height / image.width;

    fullScreenContainer.style.height = '100%';
    fullScreenContainer.style.maxHeight = '100%';

    fullScreenModal.appendChild(fullScreenContainer);

    window.document.body.appendChild(fullScreenModal);

    new AXIGEAR360Viewer(fullScreenContainer, true, ratio);
  }

  closeFullScreenModal() {
    document.body.removeChild(this.container.parentNode);
  }

  addRotateIcon() {
    const view360RotateIcon = document.createElement('div');

    setRotateIconStyles(view360RotateIcon, this.rotateIconUrl);

    this.view360RotateIcon = view360RotateIcon;
    this.innerBox.appendChild(view360RotateIcon);
  }

  hideRotateIcon() {
    if (!this.view360RotateIcon) return;
    this.view360RotateIcon.style.opacity = '0';
  }

  showRotateIcon() {
    if (!this.view360RotateIcon) return;
    this.view360RotateIcon.style.opacity = '1';
  }

  removeRotateIcon() {
    if (!this.view360RotateIcon) return;
    this.innerBox.removeChild(this.view360RotateIcon);
    this.view360RotateIcon = null;
  }

  addLoader() {
    const loader = document.createElement('div');

    setLoaderStyles(loader);

    this.loader = loader;
    this.innerBox.appendChild(loader);
  }

  addBoxShadow() {
    const boxShadow = document.createElement('div');

    setBoxShadowStyles(boxShadow, this.boxShadow);

    this.innerBox.appendChild(boxShadow);
  }

  removeLoader() {
    if (!this.loader) return;

    this.innerBox.removeChild(this.loader);
    this.loader = null;
  }

  remove360ViewIcon() {
    if (!this.view360Icon) return;
    this.view360Icon.style.opacity = "0";
    this.view360Icon.style.pointerEvents = "none";
    setTimeout(() => {
      this.innerBox.removeChild(this.view360Icon);
      this.view360Icon = null;
    }, 500);
  }

  play() {
    if (this.rotateIcon) this.hideRotateIcon();
    

    this.loopTimeoutId = window.setInterval(() => {
      this.loop(this.reversed);
    }, this.autoplaySpeed);
  }

  stop() {
    if (this.rotateIcon) this.showRotateIcon();
    window.clearTimeout(this.loopTimeoutId);
  }

  getSrc(container, folder, filename) {
    let src = `${folder}${filename}`;

    if (this.responsive) {
      const thumbnailSettings = JSON.parse(this.responsive);

      let size = thumbnailSettings[0].s;
      let imageOffsetWidth = container.offsetWidth === 0 ? window.innerWidth : container.offsetWidth;

      for (let item in thumbnailSettings) {
        if (imageOffsetWidth > thumbnailSettings[item].w) {
          size = thumbnailSettings[item].s;
        }
      }

      src = `${folder}thumbnails/${size}/${filename}`;
    }

    return src;
  }

  preloadImage(amount, src) {
    if (!this.imageList) {
      [...new Array(amount)].map((_item, index) => {
        const nextZeroFilledIndex = pad(index + 1, this.indexZeroBase);
        const resultSrc = src.replace('{index}', nextZeroFilledIndex);
        this.srcList.push(resultSrc);
      });
    } else {
      for (let index in this.imageList) {
        const resultSrc = src.replace('{filename}', this.imageList[index]);
        this.srcList.push(resultSrc);
      }
    }

    this.addImage(this.srcList[0], 0);
    console.log(this.srcList);

    if (this.fullScreenView) this.loadImages();

    if (this.autoLoading) this.loadImages();
  }

  loadImages(){

    if (this.view360Icon) {
      this.view360Icon.onclick = null;
      this.view360Icon.style.background = 'rgba(255,255,255,0.8)';
    }
    
    this.srcList.forEach((element, index) => {
      if (index != 0) {
        this.addImage(element, index);
      }
    });
  }

  addImage(resultSrc, index) {
    const image = new Image();
    image.src = resultSrc;
    image.onload = this.onImageLoad.bind(this, index);
    image.onerror = this.onImageLoad.bind(this, index);
    this.images.push(image);
  }

  destroy() {
    stop();

    const oldElement = this.container;
    const newElement = oldElement.cloneNode(true);
    const innerBox = newElement.querySelector('.axigear-inner-box');

    newElement.className = newElement.className.replace(' initialized', '');
    newElement.style.position = 'relative';
    newElement.style.width = '100%';
    newElement.style.cursor = 'default';
    newElement.setAttribute('draggable', 'false');
    newElement.style.minHeight = 'auto';
    newElement.removeChild(innerBox);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }

  initControls() {
    const isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;
    const prev = this.container.querySelector('.axigear-360-prev');
    const next = this.container.querySelector('.axigear-360-next');

    if (!prev && !next) return;

    const onLeftStart = (event) => {
      event.stopPropagation();
      this.onSpin();
      this.prev();
      this.loopTimeoutId = window.setInterval(this.prev.bind(this), this.autoplaySpeed);
    };
    const onRightStart = (event) => {
      event.stopPropagation();
      this.onSpin();
      this.next();
      this.loopTimeoutId = window.setInterval(this.next.bind(this), this.autoplaySpeed);
    };
    const onLeftEnd = () => {
      this.onFinishSpin();
      window.clearTimeout(this.loopTimeoutId);
    };
    const onRightEnd = () => {
      this.onFinishSpin();
      window.clearTimeout(this.loopTimeoutId);
    };

    if (prev) {
      prev.style.display = 'block';
      prev.addEventListener('mousedown', isReverse ? onRightStart : onLeftStart);
      prev.addEventListener('touchstart', isReverse ? onRightStart : onLeftStart);
      prev.addEventListener('mouseup', isReverse ? onRightEnd : onLeftEnd);
      prev.addEventListener('touchend', isReverse ? onRightEnd : onLeftEnd);

      this.prevElem = prev;
    }

    if (next) {
      next.style.display = 'block';
      next.addEventListener('mousedown', isReverse ? onLeftStart : onRightStart);
      next.addEventListener('touchstart', isReverse ? onLeftStart : onRightStart);
      next.addEventListener('mouseup', isReverse ? onLeftEnd : onRightEnd);
      next.addEventListener('touchend', isReverse ? onLeftEnd : onRightEnd);

      this.nextElem = next;
    }

    if (isReverse ? next : prev) {
      if (this.stopAtEdges) {
        addClass(isReverse ? next : prev, 'not-active');
      }
    }
  }

  addInnerBox() {
    this.innerBox = document.createElement('div');
    this.innerBox.className = 'axigear-inner-box';
    this.container.appendChild(this.innerBox);
    setInnerBoxStyles(this.innerBox);
  }

  addCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.fontSize = '0';
    this.canvas.style.verticalAlign = 'middle'

    if (this.ratio) {
      this.container.style.minHeight = this.container.offsetWidth * this.ratio + 'px';
      this.canvas.height = parseInt(this.container.style.minHeight);
    }

    this.innerBox.appendChild(this.canvas);
  }

  attachEvents(draggable, swipeable, keys) {
    if (draggable) {
      this.container.addEventListener('mousedown', this.mousedown.bind(this));
      this.container.addEventListener('mouseup', this.mouseup.bind(this));
      this.container.addEventListener('mousemove', this.mousemove.bind(this));
    }

    if (swipeable) {
      this.container.addEventListener('touchstart', this.touchstart.bind(this), { passive: true });
      this.container.addEventListener('touchend', this.touchend.bind(this), { passive: true });
      this.container.addEventListener('touchmove', this.touchmove.bind(this));
    }

    if (keys) {
      document.addEventListener('keydown', this.keydown.bind(this));
      document.addEventListener('keyup', this.keyup.bind(this));
    } else {
      document.addEventListener('keydown', this.keydownGeneral.bind(this));
    }

    window.addEventListener("resize", this.onWindowResize.bind(this));   
  }

  applyStylesToContainer() {
    this.container.style.position = 'relative';
    this.container.style.width = '100%';
    //this.container.style.cursor = 'wait';
    this.container.setAttribute('draggable', 'false');
    this.container.className = `${this.container.className} initialized`;
  }

  init(container) {
    let {
      folder, 
      filename,
      imageList,
      indexZeroBase, 
      amount, 
      draggable = true, 
      swipeable = true, 
      keys, 
      rotateIcon, 
      boxShadow,
      autoplay, 
      autoLoading, 
      speed, 
      autoplayReverse, 
      fullScreen, 
      magnifier, 
      ratio, 
      spinReverse, 
      dragSpeed, 
      stopAtEdges, 
      controlReverse,
      playIcon, 
      playIconUrl,
      magnifierIconUrl,
      fullScreenIconUrl,
      closeFullScreenIconUrl,
      rotateIconUrl,
      image360IconUrl,
      image360IconBackgroundColor,
      responsive
    } = get360ViewProps(container);
    

    this.addInnerBox();
    this.addLoader();

    this.folder = folder;
    this.filename = filename;
    this.imageList = JSON.parse(imageList);
    this.srcList = new Array();
    this.indexZeroBase = indexZeroBase;
    this.amount = this.imageList ? this.imageList.length : amount;
    this.boxShadow = boxShadow;
    this.autoplay = autoplay;
    this.speed = speed;
    this.reversed = autoplayReverse;
    this.fullScreen = fullScreen;
    this.magnifier = !this.isMobile && magnifier ? magnifier : false;
    this.ratio = ratio;
    this.spinReverse = spinReverse;
    this.controlReverse = controlReverse;
    this.dragSpeed = dragSpeed;
    this.autoplaySpeed = this.speed * 36 / this.amount;
    this.stopAtEdges = stopAtEdges;
    this.autoLoading = autoLoading;

    this.playIcon = playIcon;
    this.rotateIcon = rotateIcon;

    this.playIconUrl = playIconUrl;
    this.magnifierIconUrl = magnifierIconUrl;
    this.fullScreenIconUrl = fullScreenIconUrl;
    this.closeFullScreenIconUrl = closeFullScreenIconUrl;
    this.rotateIconUrl = rotateIconUrl;
    this.image360IconUrl = image360IconUrl;
    this.image360IconBackgroundColor = image360IconBackgroundColor;

    this.responsive = responsive;

    this.applyStylesToContainer();

    this.addCanvas();

    let src = null;
    if (!this.imageList) {
      src = this.getSrc(container, folder, filename);
    } else {
      src = this.getSrc(container, folder, '{filename}');
    }

    this.preloadImage(this.amount, src, container);
    
    this.attachEvents(draggable, swipeable, keys);
  }
}

export default AXIGEAR360Viewer;