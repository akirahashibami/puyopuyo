class Player {
  // static centerPuyo;
  // static movablePuyo;
  // static puyoStatus;
  // static centerPuyoElement;
  // static movablePuyoElement;

  // static groundFrame;
  // static keyStatus;

  // static actionStartFrame;
  // static moveSource;
  // static moveDestination;
  // static rotateBeforeLeft;
  // static rotateAfterLeft;
  // static rotateFromRotation;

  static initialize () {
    // キーボードの入力を確認する
    this.keyStatus = {
      right: false,
      left: false,
      up: false,
      down: false
    };
    // ブラウザのキーボードの入力を取得するイベントリスナを登録する
    document.addEventListener('keydown', (e) => {
      // キーボードが押された場合
      switch (e.keyCode) {
        case 37: // 左向きキー
          this.keyStatus.left = ture;
          e.preventDefault(); return false;
        case 38: // 上向キー
          this.keyStatus.up = true;
          e.preventDefault(); return false;
        case 39: // 右向きキー
          this.keyStatus.right = true;
          e.preventDefault(); return false;
        case 40: // 下向きキー
          this.keyStatus.down = true;
          e.preventDefault(); return false;
      }
    });
    document.addEventListener('keyup', (e) => {
      // キーボードが離された場合
      switch (e.keyCode) {
        case 37: // 左向きキー
          this.keyStatus.left = false;
          e.preventDefault(); return false;
        case 38: // 上向きキー
          this.keyStatus.up = false;
          e.preventDefault(); return false;
        case 39: // 右向きキー
          this.keyStatus.right = false;
          e.preventDefault(); return false;
        case 40: //下向きキー
          this.keyStatus.down = false;
          e.preventDefault(); return false;
      }
    });
    // タッチ操作追加
    this.touchPoint = {
      xs: 0,
      ys: 0,
      xe: 0,
      ye: 0,
    }
    document.addEventListener('touchstart', (e) => {
      this.touchPoint.xs = e.touches[0].clientX
      this.touchPoint.ys = e.touches[0].clientY
    })
    document.addEventListener('touchmove', (e) =>{
      // 指が少し動いた時は無視
      if (Math.abs(e.touches[0].clientX - this.touchPoint.xs) < 20 &&
          Math.abs(e.touches[0].clientY - this.touchPoint.ys) < 20
        ) {
          return
        }

        // 指の動きからジェスチャーによるkeyStatusプロパティを更新
        this.touchPoint.xe = e.touches[0].clientX
        this.touchPoint.ye = e.touches[0].clientY
        const {xs, ys, xe, ye} = this.touchPoint
        gesture(xs, ys, xe, ye)


        this.touchPoint.xs = this.touchPoint.xe
        this.touchPoint.ys = this.touchPointye
    })
    document.addEventListener('touchend', (e) => {
      this.keyStatus.up = false
      this.keyStatus.down = false
      this.keyStatus.left =false
      this.keyStatus.right = false
    })

    // ジェスチャーを判定して、keyStatusプロパティを更新する関数
    const gesture = (xs, ys, xe, ye) => {
      const horizonDirection = xe - xs;
      const verticalDirection = ye - ys;

      if (Math.abs(horizonDirection) < Math.abs(verticalDirection)) {
        // 縦方向
        if (verticalDirection < 0) {
          // up
          this.keyStatus.up = true
          this.keyStatus.down = false
          this.keyStatus.left = false
          this.keyStatus.right = false
        }else if (0 <= verticalDirection) {
          // down
          this.keyStatus.up = false
          this.keyStatus.down = true
          this.keyStatus.left = false
          this.keyStatus.right = false
        }
      }else{
        // 横方向
        if(horizonDirection < 0){
          // left
          this.keyStatus.up = false
          this.keyStatus.down = false
          this.keyStatus.left = true
          this.keyStatus.right = false
        }else if (0 <= horizonDirection) {
          // right
          this.keyStatus.up = false
          this.keyStatus.down = false
          this.keyStatus.left = false
          this.keyStatus.right = true
        }
      }
    }
  }
  // ぷよ設置確認
  static createNewPuyo () {
    // ぷよぷよが置けるかどうか、１番上の段の左から３つ目を確認する
    if(Stage.board[0][2]) {
      // 空白でない場合は新しいぷよを置けない
      return false;
    }
    // 新しいぷよの色を決める
    const puyoColors = Math.max(1, Math.min(5, Config.puyoColors));
    this.centerPuyo = Math.floor(Math.random() * puyoColors) + 1;
    this.movablePuyo = Math.floor(Math.random() * puyoColors) + 1;
    // 新しいぷよ画像を作成する
    this.centerPuyoElement = PuyoImgae.getPuyo(this.centerPuyo);
    this.movablePuyoElement = PuyoImgae.getPuyo(this.movablePuyo);
    Stage.stageElement.appendChild(this.centerPuyoElement);
    Stage.stageElement.appendChild(this.movablePuyoElement);
    // ぷよの初期配置を決める
  }
}
