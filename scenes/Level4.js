// PlayGame scene
class Level4 extends Phaser.Scene {

    // constructor
    constructor() {
        super("Level4");
    }

    // method to be executed when the scene preloads
    preload() {

        this.load.image("playBG", "assets/img/Bouncy-play-bg.png");
        this.load.image("score", "assets/img/Score.png")
        // this.load.image("ground", "assets/img/ground.png");
        this.load.image("ball", "assets/img/ball.png");
        this.load.image("btn_congrate", "assets/img/Congratulations.png");
        this.load.spritesheet("ground", "assets/img/spritesheet.png", {
            frameWidth: 397,
            frameHeight: 216
        });
        this.load.spritesheet('firework', 'assets/img/firework.png', { frameWidth: 250, frameHeight: 245 });
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
        this.lastplatform = null;
        this.arr = [];
        this.iscompleted = false;
        this.gotoNextLevel = false;
        this.isShowPass = true;
        this.isCorrectJump = false;
        this.count = 0;
        this.tween = null;

        //background
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'playBG');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        //score
        this.score_btn = this.add.image(game.config.width / 4, game.config.height / 15 + 5, 'score');
        this.score_btn.displayHeight = game.config.height / 10;
        this.score_btn.displayWidth = game.config.width / 2.4;

        this.score_btn = this.add.image(game.config.width / 1.3, game.config.height / 15 + 5, 'score');
        this.score_btn.displayHeight = game.config.height / 10;
        this.score_btn.displayWidth = game.config.width / 2.4;

        levelText = this.add.text(game.config.width / 1.6, game.config.height / 24, 'LEVEL:4', {
            fontSize: '35px',
            fill: '#FFF'
        });

        this.platformGroup = this.physics.add.group();

        //ball
        this.ball = this.physics.add.sprite(game.config.width * gameOptions.ballPosition, game.config.height / 4 * 3 - gameOptions.bounceHeight, "ball");
        this.ball.displayHeight = game.config.height / 10;
        this.ball.displayWidth = game.config.width / 10;

        this.ball.body.gravity.y = gameOptions.ballGravity;
        // this.ball.setBounce(1);
        this.ball.body.checkCollision.down = true;
        this.ball.body.checkCollision.up = false;
        this.ball.body.checkCollision.left = false;
        this.ball.body.checkCollision.right = false;
        this.ball.setSize(game.config.height / 5, game.config.width / 2, false)
        let platformX = this.ball.x;
        for (let i = 0; i < 200; i++) {
            let platform = this.platformGroup.create(platformX, game.config.height / 4 * 3 + Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]), "ground");
            platform.setOrigin(0.5, 1);
            platform.setImmovable(true);
            platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
            platform.displayHeight = game.config.height / 15;
            platformX += Phaser.Math.Between(gameOptions.platformDistanceRangeLevel3[0], gameOptions.platformDistanceRangeLevel3[1]);
            platform.setSize(game.config.height / 2.5, game.config.width / 2, false)
        }

        this.input.keyboard.on('keydown', function (e) {
            if (e.key == "Enter") {
                //console.log("soft right key");
                if (this.iscompleted == true) {
                    if (this.gotoNextLevel == true) {
                        score = 0
                        localStorage.setItem("L4", "C");
                        this.scene.start("Menu");
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

                        this.congrate = this.add.image(game.config.width / 2, game.config.height / 4 * 3, 'btn_congrate');
                        this.congrate.displayHeight = game.config.height / 5;
                        this.congrate.displayWidth = game.config.width / 1.5;

                    }

                } else {
                    this.movePlatforms();
                }
            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "Enter") {
                this.stopPlatforms();
                this.hitCount = 0;
            }
        }, this);

        this.score = score;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(game.config.width / 16, game.config.height / 24, this.score, {
            fontSize: '35px',
            fill: '#FFF'
        });
        this.scoreText.setText('SCORE:' + this.score);
        this.arr = this.platformGroup.getChildren();
    }

    // method to be executed at each frame. Please notice the arguments.
    update() {
        var isCollided = this.physics.overlap(this.platformGroup, this.ball, this.collision, null, this)
        this.checkGameOver();
    }

    collision() {
        // this.sound.play('groundsound');
        this.ball.setVelocityY(-700);
        if (this.hitCount == 0) {
            this.platformGroup.getChildren().forEach(function (platform) {
                if (platform.getBounds().right < 0) {
                    this.isCorrectJump = true;
                    // platform.x = this.getRightmostPlatform() + Phaser.Math.Between(gameOptions.platformDistanceRange[0], gameOptions.platformDistanceRange[1]);
                    // platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
                    // this.arr.push(platform)
                }
            }, this);
            if (this.isCorrectJump == true) {
                this.isBallHitPlatform();
            }
            this.checkGameWin();
        }
    }

    checkGameOver() {
        if (this.ball.y > game.config.height) {
            this.performGameOver()
        }
    }

    checkGameWin() {
        if (this.score >= 30 && this.isShowPass == true) {
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
            // this.arr = this.platformGroup.getChildren()
            this.isCorrectJump = false;
            this.nextPlatform++;
            this.hitCount++;
        }
        this.count++;
        this.breakGround(this.arr[this.count]);
    }

    // update the score
    updateScore(inc) {
        this.score += inc;
        this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
        this.scoreText.setText('SCORE:' + this.score);

        this.platformGroup.remove(this.platformGroup.getChildren()[0])
        // this.movePlatformHorizontaly(this.platformGroup.getChildren()[1])
    }

    movePlatforms() {
        this.platformGroup.setVelocityX(-gameOptions.platformSpeed);
    }

    stopPlatforms() {
        this.platformGroup.setVelocityX(0);
    }

    getRightmostPlatform() {
        let rightmostPlatform = 0;
        var last = null
        this.platformGroup.getChildren().forEach(function (platform) {
            rightmostPlatform = Math.max(rightmostPlatform, platform.x);
        });
        return rightmostPlatform;
    }

    performGameOver() {
        score = this.score;
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        if (!this.gotoNextLevel) {
            this.scene.start("GameOver");
        }
    }

    breakGround(platform) {
        this.timedEvent = this.time.addEvent({
            delay: 9500, callback: function () {
                platform.setFrame(1);
                var slice2 = this.add.sprite(platform.x, platform.y, "ground", 2);
                slice2.displayHeight = 153;
                slice2.displayWidth = 153;
                // slice2.angle = this.platform.angle;
                slice2.setOrigin(0.5, 1)

                // break board
                this.tween = this.tweens.add({

                    // adding the knife to tween targets
                    targets: [platform, slice2],

                    // y destination
                    y: game.config.height + platform.height,

                    // x destination
                    x: {

                        // running a function to get different x ends for each slice according to frame number
                        getEnd: function (platform, key, value) {
                            return Phaser.Math.Between(0, game.config.width / 2) + (game.config.width / 2 * (platform.frame.name - 1));
                        }
                    },

                    // rotation destination, in radians
                    angle: 45,

                    // tween duration
                    duration: gameOptions.throwSpeed * 6,

                    // callback scope
                    callbackScope: this,

                    // function to be executed once the tween has been completed
                    // onComplete: function (tween) {

                    //     // restart the game
                    //     this.scene.start("Level2")
                    // }
                });
            }, callbackScope: this, loop: true
        });
    }

    moveForward(platform) {
        var originalX = platform.x
        while (true) {
            platform.setVelocityX(65);
            if (originalX > platform.x + 1000) {
                //  console.log("inside");
                platform.setVelocityX(0)

            }
            originalX++;
        }
    }

    moveBackward(platform) {
        platform.setVelocityX(-65);
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
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
