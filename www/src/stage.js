class Stage {
  // static stageElement;
  // static scoreElement;
  // static zenkeshiImage;
  // static board;
  // static puyoCount;
  // static fallingPuyoList = [];
  // static eraseStartFrame;
  // static erasingPuyoInfoList = [];

  static initialize() {
    // HTML からステージの元となる要素を取得し、大きさ設定する
    const stageElement = document.getElementById("stage");
    stageElement.style.width = Config.puyoImgWidth * Config.stageCols + 'px';
    stageElement.style.height = Config.puyoImgHeight * Config.stageRows + 'px';
    stageElement.style.backgroundColor = Config.stageBackgroundColor;
    this.stageElement = stageElement;
  }
}
