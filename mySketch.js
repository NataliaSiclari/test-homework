let circles = []; // 存放所有圓形
let numCircles = 5; // 總共要放幾個圓
let maxAttempts = 500; // 最多試 500 次，避免卡住

function setup() {
  createCanvas(windowWidth, windowHeight); // 設定全螢幕畫布
	
	for (let i = 0; i < numCircles; i++) { 
		 // 我們要畫很多個圓圈，這裡是「畫第幾個」的意思
    // i 從 0 開始，每畫一個就 i++，也就是 i + 1
    // 當畫的數量還沒超過 numCircles，就一直畫下去
    let newCircle;
    let overlapping = true; // 預設為有重疊
    let attempts = 0; // 記錄試了幾次

    // 如果還重疊而且還沒超過最大次數，就繼續試
    while (overlapping && attempts < maxAttempts) {
      newCircle = {
        x: random(50, width - 50), // 隨機 X 位置（不要靠太邊）
        y: random(50, height - 50), // 隨機 Y 位置
        size: random(50, 150), // 圓的大小隨機
        speedX: random(-7, 7), // 左右移動速度
        speedY: random(-7, 7)  // 上下移動速度
      };

      overlapping = false; // 先假設沒重疊

      // 檢查有沒有跟其他圓撞到
      for (let circle of circles) {
        let d = dist(newCircle.x, newCircle.y, circle.x, circle.y); // 算兩圓中心距離
        if (d < (newCircle.size / 2 + circle.size / 2 + 5)) { // 如果太近就算重疊
          overlapping = true;
          break; // 有一個撞到就不用比了
        }
      }

      attempts++; // 試一次就加一
    }

    // 如果成功找到沒重疊的位置，就加入圓圈陣列
    if (!overlapping) {
      circles.push(newCircle);
    }
  }
}

function draw() {
  background("#3ac1c5"); // 設定為背景色彩，留意要放在draw函數內
	textFont("TimeNewRoman"); //第一、設定字體
  textSize(60); // 第二、設定字體大小
	textAlign(CENTER, CENTER); // 第三、讓文字置中
	fill("#B8EED8"); // 第四、設定文字顏色（白色）
	stroke("#1500A7") // 外框色彩
  strokeWeight(3);// 框線粗細
	
	let lineLength = 300; // 設定線條長度

  // 水平線
  line(width / 2 - lineLength / 3, height / 2, width / 2 + lineLength / 3, height / 2);

  // 垂直線
  line(width / 2, height / 2 - lineLength / 3, width / 2, height / 2 + lineLength / 3);

  // 45度對角線（左上起點 → 右下終點）
  line(width / 2 - lineLength / 3, height / 2 - lineLength / 3, width / 2 + lineLength / 3, height / 2 + lineLength / 3);
	// 反向45度對角線（左下起點 → 右上終點）
  line(width / 2 - lineLength / 3, height / 2 + lineLength / 3, width / 2 + lineLength / 3, height / 2 - lineLength / 3);

	triangle(
    width / 5 - 100, height / 2 + 100, // 左下角
    width / 5 + 100, height / 2 + 100, // 右下角
    width / 5,       height / 2 - 100  // 上方頂點
  );
	
	rectMode(CENTER); // 讓矩形的 (x, y) 位置變為中心點
  rect(width / 1.2, height / 2 , 300, 200, 20); // 在畫布中央畫一個 200x100 的圓角矩形，圓角半徑為 20px
	
  text("Hello, This is Natalia. P5.js!", width / 2, height / 5); // （“字串”，X，Ｙ）文字與位置
	
	for (let circle of circles) {
    fill("#F3EB0D"); // 設定圓圈顏色（黃)
		stroke(255)// 外框色彩(白)
		strokeWeight(5);// 框線粗細
		ellipse(circle.x, circle.y, circle.size, circle.size); // 畫圓

    // 移動圓的位置（讓它漂浮）
    circle.x += circle.speedX;
    circle.y += circle.speedY;

    // 如果碰到左右邊界就反方向
    if (circle.x < circle.size / 2 || circle.x > width - circle.size / 2) {
      circle.speedX *= -1;
    }

    // 如果碰到上下邊界也反方向
    if (circle.y < circle.size / 2 || circle.y > height - circle.size / 2) {
      circle.speedY *= -1;
    }
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 讓畫布隨視窗大小變動
}