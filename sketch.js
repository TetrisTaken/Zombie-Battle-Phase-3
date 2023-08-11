var player, shooterImg, shooter_shooting
var zombie, zombieImg
var bg, bgImg
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var zombieGroup, bullet, reset, resetImg

var score = 0
var life = 3
var bullets = 2

var gameState = "play"
var lose, win, boomSound, sad

function preload() {
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  resetImg = loadImage("assets/reset.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")
  boomSound = loadSound("assets/explosion.mp3")
  sad = loadSound("assets/sad.mp3")
}


function setup() {
  createCanvas(windowWidth, windowHeight)

  bg = createSprite(windowWidth / 2, windowHeight / 2, 30, 30)
  bg.addImage(bgImg)
  bg.scale = 1

  player = createSprite(windowWidth - 1000, windowHeight - 250, 50, 50)
  player.addImage(shooterImg)
  player.scale = 0.4

  player.setCollider("rectangle", 0, 0, 300, 300)

  reset = createSprite(windowWidth / 2, windowHeight / 2 - 200, 500, 100)
  reset.addImage(resetImg)
  reset.scale = 0.2
  reset.visible = false


  heart1 = createSprite(windowWidth - 100, 40, 20, 20)
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.5

  heart2 = createSprite(windowWidth - 100, 40, 20, 20)
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.5

  heart3 = createSprite(windowWidth - 200, 40, 20, 20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.5

  zombieGroup = new Group()
  bullets = new Group()
}

function draw() {

  if (gameState === "play") {




    if (life == 3) {
      heart1.visible = false
      heart2.visible = false
      heart3.visible = true
    }

    if (life == 2) {
      heart1.visible = false
      heart2.visible = true
      heart3.visible = false
    }

    if (life == 1) {
      heart1.visible = true
      heart2.visible = false
      heart3.visible = false
    }

    if (life == 0) {
      heart1.visible = false
      heart2.visible = false
      heart3.visible = false
      gameState = "lose"
      sad.play()
    }



    if (score == 10) {
      win.play()
      gameState = "win"

    }




    if (keyDown("UP_ARROW")) {
      player.y = player.y - 20
    }

    if (keyDown("DOWN_ARROW")) {
      player.y = player.y + 20

    }


    if (keyWentDown("SPACE")) {
      player.addImage(shooter_shooting)
      bullet = createSprite(player.x, player.y, 30, 10)
      bullet.velocityX = 10
      bullet.shapeColor = "yellow"
      bullets.add(bullet)
    }

    else if (keyWentUp("SPACE")) {
      player.addImage(shooterImg)
    }

    if (bullets.isTouching(zombieGroup)) {
      boomSound.play()
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(bullets)) {
          zombieGroup[i].destroy()
          bullets[i].destroy()
          score = score + 2
        }
      }
    }
    if (zombieGroup.isTouching(player)) {
      lose.play()

      for (var i = 0; i < zombieGroup.length; i++) {

        if (zombieGroup[i].isTouching(player)) {
          zombieGroup[i].destroy()

          life = life - 1
        }
      }
    }

    spawnZombies()



    drawSprites()

    textSize(30)
    fill('red')
    text("Score = " + score, 100, 50)
    text("Press the Space Bar to shoot.", 100, 150)
    text("Make sure to Aim for the Head!",100,80)
    
  }


  if (gameState == "win") {
    score = 0
    zombieGroup.destroyEach()
    bullets.destroyEach()

    reset.visible = true
    drawSprites()
    textSize(100)
    fill('yellow')
    text("You won", width / 2, height / 2)

    if(mousePressedOver(reset)) {
      gameState = "play"
      score = 0
      life = 3
      reset.visible = false
      
    }
  }

  if (gameState == "lose") {
    score = 0
    zombieGroup.destroyEach()
    bullets.destroyEach()

    reset.visible = true
    drawSprites()
    textSize(100)
    fill('red')
    text("You lost", width / 2, height / 2)
    if(mousePressedOver(reset)) {
      gameState = "play"
      score = 0
      life = 3
      reset.visible = false
      
    }
  }
  
}

function spawnZombies() {
  if (frameCount % 80 == 0) {
    var zombie = createSprite(width, random(50, height - 100), 100, 100)
    zombie.addImage(zombieImg)
    zombie.scale = 0.25
    zombieGroup.add(zombie)

    zombie.setCollider("rectangle", 100, -250, 400, 400)
    zombie.velocityX = -3
    zombieGroup.add(zombie)
  }
}