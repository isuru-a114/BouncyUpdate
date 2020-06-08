// PlayGame scene
class Level5 extends Phaser.Scene {

    // constructor
    constructor() {
        super("Level5");
    }

    // method to be executed when the scene preloads
    preload() {

        // loading assets
        this.load.image("playBG", "assets/img/Bouncy-play-bg.png");
        this.load.image("score", "assets/img/Score.png")
        this.load.image("ground", "assets/img/ground.png");
        this.load.image("ball", "assets/img/ball.png");
        this.load.image("btn_next", "assets/img/NextLevel.png");
        this.load.spritesheet('firework', 'assets/img/firework.png', { frameWidth: 250, frameHeight: 245 });

        this.load.spritesheet('coins', 'assets/img/coin.png', { frameWidth: 400, frameHeight: 400 });
        //sound
        // this.load.audio('groundsound', 'sounds/groundsound.wav');
    }

    // method to be executed once the scene has been created
    create() {
        //
        this.events.on('transitionstart', function (fromScene, duration) {
            this.cameras.main.setZoom(0.001);
        }, this);

        this.events.on('transitioncomplete', function (fromScene, duration) {
            // this.cameras.main.zoomTo(1, 300);
            this.cameras.main.zoomTo(1, 300);
        }, this);

        // this.events.on('transitioncomplete', function (fromScene) {

        // });

        this.events.on('transitionout', function (toScene, duration) {

            this.cameras.main.zoomTo(0.05, 300);

        }, this);
        //
        this.hitCount = -1;
        this.nextPlatform = 1;
        this.currentPlatform = 0;
        this.iscompleted = false;
        this.gotoNextLevel = false;
        this.isShowPass = true;
        this.isCorrectJump = false;
        this.arr = [];

        //background
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'playBG');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        //score
        this.score_btn = this.add.image(game.config.width / 4, game.config.height / 15 + 5, 'score');
        this.score_btn.displayHeight = game.config.height / 10;;
        this.score_btn.displayWidth = game.config.width / 2.4;

        this.score_btn = this.add.image(game.config.width / 1.3, game.config.height / 15 + 5, 'score');
        this.score_btn.displayHeight = game.config.height / 10;;
        this.score_btn.displayWidth = game.config.width / 2.4;

        //level
        levelText = this.add.text(game.config.width / 1.6, game.config.height / 24, 'LEVEL:2', { fontSize: '35px', fill: '#FFF' });

        this.score = score;
        console.log("==============>level 2 score: " + score)

        this.platformGroup = this.physics.add.group();

        //ball
        this.ball = this.physics.add.sprite(game.config.width * gameOptions.ballPosition, game.config.height / 4 * 3 - gameOptions.bounceHeight, "ball");
        this.ball.displayHeight = game.config.height / 10;
        this.ball.displayWidth = game.config.width / 10;

        //coin frame animation
        this.coins = this.physics.add.sprite(250, 225, 'coins');

        // setting coin body as sensor. Will fire collision events without actually collide
        this.coins.body.isSensor = true;

        //coinframe
        this.anims.create({
            key: 'coinRotate',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('coins', { start: 1, end: 10 })
        });

        this.coins.play('coinRotate');
        this.coins.displayWidth = 70;
        this.coins.displayHeight = 70;
        this.coins.body.label = "coins";
        // this.coins.setStatic(true);

        this.ball.body.gravity.y = 2400;
        this.ball.setBounce(1);
        this.ball.body.checkCollision.down = true;
        this.ball.body.checkCollision.up = false;
        this.ball.body.checkCollision.left = false;
        this.ball.body.checkCollision.right = false;
        this.ball.setSize(game.config.height / 5, game.config.width / 2, false)
        var platformX = this.ball.x;
        for (var i = 0; i < 10; i++) {
            var platform = this.platformGroup.create(platformX, game.config.height / 4 * 3 + Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]), "ground");
            platform.setOrigin(0.5, 1);
            platform.setImmovable(true);
            platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
            platform.displayHeight = game.config.height / 15;
            platformX += Phaser.Math.Between(gameOptions.platformDistanceRange[0], gameOptions.platformDistanceRange[1]);
            platform.setSize(game.config.height / 2.5, game.config.width / 2, false)
        }

        this.input.on("pointerdown", this.movePlatforms, this);
        this.input.on("pointerup", this.stopPlatforms, this);

        this.input.keyboard.on('keydown', function (e) {
            // console.log(e)
            if (e.key == "Enter") {
                if (this.iscompleted == true) {
                    if (this.gotoNextLevel == true) {
                        localStorage.setItem("L2", "C");
                        this.scene.start("Level3");
                    } else {
                        this.gotoNextLevel = true;
                        /////
                        // coin frame animation
                        this.firework = this.physics.add.sprite(300, 290, 'firework');
                        this.firework2 = this.physics.add.sprite(250, 250, 'firework');
                        this.firework3 = this.physics.add.sprite(150, 200, 'firework');

                        // setting coin body as sensor. Will fire collision events without actually collide
                        this.firework.body.isSensor = true;
                        this.firework2.body.isSensor = true;
                        this.firework3.body.isSensor = true;

                        //coinframe
                        this.anims.create({
                            key: 'fireworkRotate',
                            repeat: -1,
                            frameRate: 10,
                            frames: this.anims.generateFrameNames('firework', { start: 1, end: 46 })
                        });

                        this.firework.play('fireworkRotate');
                        this.firework.displayWidth = 250;
                        this.firework.displayHeight = 250;
                        this.firework.body.label = "firework";

                        this.firework2.play('fireworkRotate');
                        this.firework2.displayWidth = 250;
                        this.firework2.displayHeight = 250;
                        this.firework2.body.label = "firework";

                        this.firework3.play('fireworkRotate');
                        this.firework3.displayWidth = 250;
                        this.firework3.displayHeight = 250;
                        this.firework3.body.label = "firework";
                        /////
                        this.nextLevel = this.add.image(game.config.width / 2, game.config.height / 4 * 3, 'btn_next');
                        this.nextLevel.displayHeight = game.config.height / 10;
                        this.nextLevel.displayWidth = game.config.width / 2.4;
                    }
                } else {
                    this.movePlatforms();
                }
                //console.log("soft right key");

            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            // console.log(e)
            if (e.key == "Enter") {
                //console.log("soft right key");
                this.stopPlatforms();
                this.hitCount = 0;
            }
        }, this);

        this.input.on("pointerdown", this.movePlatforms, this);
        this.input.on("pointerup", this.stopPlatforms, this);
        // this.score = 0;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(game.config.width / 16, game.config.height / 24, this.score, { fontSize: '35px', fill: '#FFF' });
        //this.updateScore(this.score);
        this.scoreText.setText('SCORE:' + this.score);
    }
    updateScore(inc) {
        this.score += inc;
        this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
        this.scoreText.setText('SCORE:' + this.score);
    }
    movePlatforms() {
        this.coins.setVelocityX(-gameOptions.platformSpeedLevel2);
        this.platformGroup.setVelocityX(-gameOptions.platformSpeedLevel2);
        //scroll background
        this.image.tilePositionX += 1;

        // if coins not collide ball
        if (this.coins.x <= 0) {
            console.log(this.coins.x)
            this.placeCoin()
        }
    }
    stopPlatforms() {
        this.coins.setVelocityX(0);
        this.platformGroup.setVelocityX(0);
    }
    getRightmostPlatform() {
        var rightmostPlatform = 0;
        this.platformGroup.getChildren().forEach(function (platform) {
            rightmostPlatform = Math.max(rightmostPlatform, platform.x);
        });
        return rightmostPlatform;
    }
    update() {
        var isCollided = this.physics.overlap(this.platformGroup, this.ball, this.collision, null, this)
        var coinIsCollided = this.physics.overlap(this.ball, this.coins, this.collisionCoin, null, this)
        this.checkGameOver();
    }

    collision() {
        // this.sound.play('groundsound');
        this.ball.setVelocityY(-1000);
        if (this.hitCount == 0) {
            this.platformGroup.getChildren().forEach(function (platform) {
                if (platform.getBounds().right < 0) {
                    this.isCorrectJump = true;
                    platform.x = this.getRightmostPlatform() + Phaser.Math.Between(gameOptions.platformDistanceRange[0], gameOptions.platformDistanceRange[1]);
                    platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
                    this.arr.push(platform);
                }
            }, this);
            if (this.isCorrectJump == true) {
                this.isBallHitPlatform();
            }
            this.checkGameWin();
        }
    }

    collisionCoin() {
        this.updateScore(10);
        this.placeCoin()
    }

    placeCoin() {
        this.coins.x = Phaser.Math.Between(game.config.width * 1.2, game.config.width * 1.8);
        this.coins.y = Phaser.Math.Between(game.config.height * 0.6, game.config.height * 0.4);
    }

    checkGameOver() {
        if (this.ball.y > game.config.height) {
            this.performGameOver()
        }
    }

    checkGameWin() {
        if (this.score >= 250 && this.isShowPass == true) {
            score = this.score;

            this.iscompleted = true;
            this.isShowPass = false;
            //this.scene.start("Level2")
        }
    }

    isBallHitPlatform() {
        if (this.hitCount == 0) {
            if (this.iscompleted == false) {
                this.updateScore(5);
            }
            this.arr = this.platformGroup.getChildren();
            this.isCorrectJump = false;
            this.nextPlatform++;
            this.hitCount++;
        }
    }

    performGameOver() {
        score = this.score;
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        if (!this.gotoNextLevel) {
            this.scene.start("GameOver");
        }
    }
}

// pure javascript to scale the game
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
