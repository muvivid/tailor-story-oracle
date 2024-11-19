let pages = "home";
let boxs;
let photos = [];
let patterns = [];
let quotesSet1 = [];
let quotesSet2 = [];
let quotesSet3 = [];
let selectObject;
let currentPhoto;
let createOne = false;
let currentPattern;
let showPattern = false;
let randomQuote = "";
let homeButton, inp, button, button1, button2, button3, newphoto;
let slideImage, tapeImage, ruleImage;
let slidePos;
let tapePos;
let rulePos;
let slideDim;
let tapeDim;
let ruleDim;
//let shake = 2;
//slow shake
//let angle = 0;
//let clockwise = true;
let imgWidth;
let imgHeight;
let boxWidth = 486;
let boxHeight = 700;
let slideFloat = true;
let tapeFloat = true;
let ruleFloat = true;
let speed = 1;
let slideMinSize;
let slideMaxSize;
let tapeMinSize;
let tapeMaxSize;
let ruleMinSize;
let ruleMaxSize;
let sound
let maxWidth, maxHeight;


function preload() {
  boxs = loadImage("images/box1s.jpg");
  sound = loadSound("sound/projectsound.mp3")
  photos = [
    loadImage("images/grandpa1.jpg"),
    loadImage("images/grandpa2.jpg"),
    loadImage("images/grandpa3.jpg"),
  ];
  patterns = [
    loadImage("images/pattern1.png"),
    loadImage("images/pattern2.png"),
    loadImage("images/pattern3.png"),
    loadImage("images/pattern4.png"),
    loadImage("images/pattern5.png"),
    loadImage("images/pattern6.png"),
    loadImage("images/pattern7.png"),
    loadImage("images/pattern8.png"),
    loadImage("images/pattern9.png"),
  ];
  quotesSet1 = [
    "「印象中阿公是不苟言笑的， 他除了工作就不太講話的人，只有跟客人在介紹衣服， 介紹布料之類的， 客人走了他就不講話。」 \n(In my impression, Grandpa was a very serious person; he didn’t talk much except when discussing clothes and fabrics with customers. Once the customers left, he wouldn’t say anything.)",
    "「他可以把一件事情很精緻的從頭到尾做好， 很有職人精神。」 \n (He could complete something from start to finish with meticulous detail, embodying a true artisan spirit.)",
    "他不是一個很表達自己的人， 性格安靜， 有點內斂， 不太會主動說話， 除非有需要。」\n (He wasn’t someone who expressed himself much. He was quiet, a bit reserved, and didn’t talk much unless necessary.)",
  ];

  quotesSet2 = [
    "「日本那邊很多人喜歡讓阿公做衣服， 甚至會記下他們的尺寸， 阿公做好後再寄回日本。」\n (Many people in Japan liked having Grandpa make their clothes. He even kept their measurements on file so he could send finished clothes to Japan.)",
    "「每天起床就是工作， 做到晚上睡覺， 沒有說什麼， 做完就去睡覺啊。」\n (Every day, he’d start working as soon as he woke up and wouldn’t stop until bedtime. There was no specific break; once the work was done, he’d go to sleep.)",
    "「阿公做的主要是男生的西裝， 對女生的衣服不太在意， 覺得那是另外一種不一樣的路。」\n (Grandpa mainly made men’s suits and wasn’t really interested in women’s clothing. He saw it as a different kind of work.)",
  ];

  quotesSet3 = [
    "「他很重視孩子們的成就， 會去參加他們的畢業典禮或其他重要活動。」\n (He valued his children’s achievements and would attend their graduation ceremonies or other significant events.)",
    "「阿公主要負責店裡， 阿嬤則會在家裡準備三餐， 他們分工合作。」\n (Grandpa mainly took care of the shop, while Grandma prepared the meals at home; they divided responsibilities and worked together.)",
    "阿公跟隔壁的鄰居是很好的朋友， 有時候會一起出去玩。」\n (Grandpa was good friends with the neighbors, and sometimes they would go out together.)",
  ];

  slideImage = loadImage("images/slides.png");
  tapeImage = loadImage("images/tape.png");
  ruleImage = loadImage("images/rule.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentPhoto = photos[0];
  currentPattern = patterns[0];
 // imgWidth = windowWidth /5*3;
 // imgHeight = windowHeight /5*4
  calculatePositions();
  angleMode(DEGREES);
  frameRate(10);
  sound.loop ()
}

function draw() {
  background(255);
  
  if (pages == "home") {
        if (!sound.isPlaying()) {
      sound.loop();
    }
  maxWidth = windowWidth * 0.6;
  maxHeight = windowHeight * 0.8;
  let aspectRatio = boxWidth / boxHeight;  
    
    if (maxWidth / maxHeight > aspectRatio) {
    imgHeight = maxHeight;
    imgWidth = imgHeight * aspectRatio;
  } else {
    imgWidth = maxWidth;
    imgHeight = imgWidth / aspectRatio;
  }
    image(boxs, width / 20, width / 20, imgWidth, imgHeight);
    //image(boxs, width / 20, width / 20, imgWidth,(boxs.height / boxs.width) * imgWidth);
     //image(boxs, width / 20, width / 20, (boxs.width / boxs.height) * imgHeight, imgHeight); 
      
    let textMargin = width * 0.05;
    let textX = width / 20 + imgWidth + textMargin;
    let availableWidth = width - textX - (width / 20);
    
    if (availableWidth < width * 0.2) {
      textX = width / 20; // Adjust x-position to left margin
      availableWidth = width - (2 * (width / 20)); // Adjust available width
    }
    
    let baseTextSize = height * 0.025;
    let adjustedTextSize = map(availableWidth, 100, width, baseTextSize * 0.8, baseTextSize);
    textSize(constrain(adjustedTextSize, 8, baseTextSize));
    textAlign(LEFT, TOP);
    
    
    //textSize(height * 0.03);
    //textAlign(LEFT, BASELINE);
    text ("你記憶中的他\n是什麼樣子的？\n他的物品\n想說什麼？\n點選一個浮動的物品，\n開始和他對話吧！\n \nWhat is he like\n in your memory?\n What do his\n belongings\n want to say?\n Click on a floating\n object to start a\n conversation with\n him! ", textX,
      height * 0.1,
      availableWidth,
      height * 0.8);
    

    /*FLOATING CODE*/
    //SLIDE
    if (slideFloat == true) {
      slideDim.w = slideDim.w + speed;
      slideDim.h = slideDim.h + speed;
      if (slideDim.w > slideMaxSize.w) {
        slideFloat = false;
      }
    } else if (slideFloat == false) {
      slideDim.w = slideDim.w - speed;
      slideDim.h = slideDim.h - speed;
      if (slideDim.w < slideMinSize.w) {
        slideFloat = true;
      } 
    }
    
     image(slideImage, slidePos.x-(slideDim.w/2), slidePos.y-(slideDim.h/2), slideDim.w, slideDim.h);
   
    // MEASURING TAPE
    if (tapeFloat == true) {
      tapeDim.w = tapeDim.w + speed;
      tapeDim.h = tapeDim.h + speed;
      if (tapeDim.w > tapeMaxSize.w) {
        tapeFloat = false;
      }
    } else if (tapeFloat == false) {
      tapeDim.w = tapeDim.w - speed;
      tapeDim.h = tapeDim.h - speed;
      if (tapeDim.w < tapeMinSize.w) {
        tapeFloat = true;
      } 
    }
    image(tapeImage, tapePos.x-(tapeDim.w/2), tapePos.y-(tapeDim.h/2), tapeDim.w, tapeDim.h);

    // RULE
    
  if (ruleFloat == true) {
      ruleDim.w = ruleDim.w + speed;
      ruleDim.h = ruleDim.h + speed;
      if (ruleDim.w > ruleMaxSize.w) {
        ruleFloat = false;
      }
    } else if (ruleFloat == false) {
      ruleDim.w = ruleDim.w - speed;
      ruleDim.h = ruleDim.h - speed;
      if (ruleDim.w < ruleMinSize.w) {
        ruleFloat = true;
      } 
    }
    image(ruleImage, rulePos.x-(ruleDim.w/2), rulePos.y-(ruleDim.h/2), ruleDim.w, ruleDim.h);

    /*END FLOATING CODE*/

    
    
    
    
    
    
    
    removeButtons();
  
  } 
  
  else if (pages == "slide") {
    if (sound.isPlaying()) {
      sound.pause();
    }
    showPhoto();
    if (!newphoto) {
      newphoto = createButton("再看一張　View another one");
      
      newphoto.mousePressed(showNewPhoto);
    }
    addHomeButton();
   
    
  } else if (pages == "tape") {
     if (sound.isPlaying()) {
      sound.pause();
    }
    textSize(width * 0.02);
    
    text ("問問你的想法，他會用他的方式回答，要怎麼解讀呢？\nAsk your question, and he will answer in his own way. How will you interpret it?", width * 0.1, height *0.05)
    if (!createOne) {
      let questionText = "什麼都可以問　Ask anything";
      inp = createInput(questionText);
      
      inp.size(width/5 *2);
      button = createButton("送出  submit");
      
      button.mousePressed(showRandomPattern);
      createOne = true;
      showPattern = false;
    }
    if (showPattern && currentPattern) {
      image(currentPattern, width*0.1 , height *0.1, width/3*2, height/3*2, 0, 0, currentPattern.width, currentPattern.height, CONTAIN);
    }
    addHomeButton();
  } else if (pages == "rule") {
     if (sound.isPlaying()) {
      sound.pause();
    }
    textSize(height * 0.02);
    textAlign(LEFT, CENTER);
    text ("你知道他是怎麼樣的人嗎？有沒有相似的地方？他對你的影響是什麼？\nDo you know what kind of person he was? Are there any similarities? What influence has he had on you?", width * 0.1, height * 0.1, width * 0.8, height * 0.2 );
    if (!createOne) {
      button1 = createButton("個性 P");
      
      button1.mousePressed(() => showRandomQuote(quotesSet1));

      button2 = createButton("工作 W");
      
      button2.mousePressed(() => showRandomQuote(quotesSet2));

      button3 = createButton("家庭 F");
      
      button3.mousePressed(() => showRandomQuote(quotesSet3));

      createOne = true;
    }
    if (randomQuote) {
      fill(0);
      textSize(height * 0.02);
      textAlign(LEFT, CENTER);
      
      text(randomQuote, width*0.1, height*0.1, width* 0.8, height* 0.6);
    }
    addHomeButton();
  }
}

function mousePressed() {
  handleClick();

}

function showRandomPhoto() {
  let randomPick = floor(random(3));
  currentPhoto = photos[randomPick];
  showPhoto();
}

function showPhoto() {
  if (currentPhoto) {
    image(currentPhoto, width*0.1 , height *0.1, width/3*2, height/3*2, 0, 0, currentPhoto.width, currentPhoto.height, CONTAIN); //so image resize and doesn't stretch
  }
  
}

function showRandomPattern() {
  let randomPickp = floor(random(9));
  currentPattern = patterns[randomPickp];
  showPattern = true;
}

function showRandomQuote(quoteSet) {
  randomQuote = random(quoteSet);
}

function addHomeButton() {
  if (!homeButton) {
    homeButton = createButton("首頁 Home");
    changeButtonPos();
    homeButton.mousePressed(() => {
      pages = "home";
      createOne = false;
      randomQuote = "";
      removeButtons();
      
    });
  }
}

function removeButtons() {
  if (homeButton) {
    homeButton.remove();
    homeButton = null;
  }
  if (inp) {
    inp.remove();
    inp = null;
  }
  if (button) {
    button.remove();
    button = null;
  }
  if (button1) {
    button1.remove();
    button1 = null;
  }
  if (button2) {
    button2.remove();
    button2 = null;
  }
  if (button3) {
    button3.remove();
    button3 = null;
  }
  if (newphoto) {
    newphoto.remove();
    newphoto = null;
  }

}

function showNewPhoto() {
  showRandomPhoto();
}

function calculateFloatingObjectPositions() {
  let boxX = width / 20;
  let boxY = width / 20;

  // Adjust the positions of the floating objects relative to the boxs image
  slidePos = {
    x: boxX + imgWidth * 0.1,
    y: boxY + imgHeight * 0.1,
  };
  tapePos = {
    x: boxX + imgWidth * 0.4,
    y: boxY + imgHeight * 0.3,
  };
  rulePos = {
    x: boxX + imgWidth * 0.8,
    y: boxY + imgHeight * 0.2,
  };
}

function calculatePositions() {
  // Calculate the maximum width and height for the boxs image
  maxWidth = windowWidth * 0.6; // Limit width to 60% of the window
  maxHeight = windowHeight * 0.8; // Limit height to 80% of the window

  // Calculate aspect ratio and adjust dimensions
  let aspectRatio = boxWidth / boxHeight;
  if (maxWidth / maxHeight > aspectRatio) {
    // Constrain by height
    imgHeight = maxHeight;
    imgWidth = imgHeight * aspectRatio;
  } else {
    // Constrain by width
    imgWidth = maxWidth;
    imgHeight = imgWidth / aspectRatio;
  }

  // Set initial dimensions of slideDim, tapeDim, ruleDim
  slideDim = {
    w: 265 * (imgWidth / boxWidth),
    h: 115 * (imgWidth / boxWidth),
  };
  tapeDim = {
    w: 238 * (imgWidth / boxWidth),
    h: 478 * (imgWidth / boxWidth),
  };
  ruleDim = {
    w: 104 * (imgWidth / boxWidth),
    h: 519 * (imgWidth / boxWidth),
  };

  // Calculate min and max sizes for floating effect
  slideMinSize = {
    w: slideDim.w,
    h: slideDim.h,
  };
  slideMaxSize = {
    w: slideDim.w * 1.05,
    h: slideDim.h * 1.05,
  };
  tapeMinSize = {
    w: tapeDim.w,
    h: tapeDim.h,
  };
  tapeMaxSize = {
    w: tapeDim.w * 1.05,
    h: tapeDim.h * 1.05,
  };
  ruleMinSize = {
    w: ruleDim.w,
    h: ruleDim.h,
  };
  ruleMaxSize = {
    w: ruleDim.w * 1.1,
    h: ruleDim.h * 1.1,
  };

 slidePos = {
    x: 0.0823 * imgWidth + width / 20 + slideDim.w / 2,
    y: 0.0857 * (imgWidth * 1.44) + width / 20 + slideDim.h / 2,
  };

  tapePos = {
    x: 0.1543 * imgWidth + width / 20 + tapeDim.w / 2,
    y: 0.25 * (imgWidth * 1.44) + width / 20 + tapeDim.h / 2,
  };

  rulePos = {
    x: 0.6893 * imgWidth + width / 20 + ruleDim.w / 2,
    y: 0.1857 * (imgWidth * 1.44) + width / 20 + ruleDim.h / 2,
  };
}

function handleClick() {
  if (pages === "home") {
    // For slideImage
    let imgX1 = slidePos.x - slideDim.w / 2;
    let imgY1 = slidePos.y - slideDim.h / 2;
    if (
      mouseX > imgX1 &&
      mouseX < imgX1 + slideDim.w &&
      mouseY > imgY1 &&
      mouseY < imgY1 + slideDim.h
    ) {
      // Map mouse coordinates to image coordinates
      let u = ((mouseX - imgX1) / slideDim.w) * slideImage.width;
      let v = ((mouseY - imgY1) / slideDim.h) * slideImage.height;
      let pixelColor = slideImage.get(u, v);
      if (alpha(pixelColor) > 0) {
        pages = "slide";
        showRandomPhoto();
      }
    }

    // For tapeImage
    let imgX2 = tapePos.x - tapeDim.w / 2;
    let imgY2 = tapePos.y - tapeDim.h / 2;
    if (
      mouseX > imgX2 &&
      mouseX < imgX2 + tapeDim.w &&
      mouseY > imgY2 &&
      mouseY < imgY2 + tapeDim.h
    ) {
      let u = ((mouseX - imgX2) / tapeDim.w) * tapeImage.width;
      let v = ((mouseY - imgY2) / tapeDim.h) * tapeImage.height;
      let pixelColor = tapeImage.get(u, v);
      if (alpha(pixelColor) > 0) {
        pages = "tape";
        createOne = false;
      }
    }

    // For ruleImage
    let imgX3 = rulePos.x - ruleDim.w / 2;
    let imgY3 = rulePos.y - ruleDim.h / 2;
    if (
      mouseX > imgX3 &&
      mouseX < imgX3 + ruleDim.w &&
      mouseY > imgY3 &&
      mouseY < imgY3 + ruleDim.h
    ) {
      let u = ((mouseX - imgX3) / ruleDim.w) * ruleImage.width;
      let v = ((mouseY - imgY3) / ruleDim.h) * ruleImage.height;
      let pixelColor = ruleImage.get(u, v);
      if (alpha(pixelColor) > 0) {
        pages = "rule";
        createOne = false;
      }
    }
  }
}

function touchStarted() {
  handleClick();
  return false; 
}

function changeButtonPos() {
  if (homeButton) {
    homeButton.position(width * 0.75, height * 0.9);
  }
  if (inp){
      inp.position(width*0.3, height * 0.8)
  }
  if (button) {
    button.position(width*0.3, height *0.85)
  }
  if (button1) {
    button1.position(width*0.25, height *0.7)
  }
  if (button2) {
    button2.position(width*0.5, height *0.7)
  }
  if (button3) {
    button3.position(width*0.7, height *0.7)
  }
    if (newphoto) {
    newphoto.position(width*0.1, height *0.9)
  }
  
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculatePositions();
  changeButtonPos()
}