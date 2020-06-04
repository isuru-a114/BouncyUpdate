class SelectLevel extends Phaser.Scene {
    constructor() {

        super({ key: 'SelectLevel', active: false });

    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;

    }


    preload() {
        this.load.image("btn_Leve2", "assets/img/Level2.png");
        this.load.image("btn_Level3", "assets/img/Level3.png");
        this.load.image("btn_Level4", "assets/img/Level4.png");

        this.load.image("bgSL", "assets/img/level_select_bg.png");
        this.load.image("btn_Level1", "assets/img/Level1.png");

        this.load.image('L2Locked', 'assets/img/L2Locked.png');
        this.load.image('L3Locked', 'assets/img/L3Locked.png');
        this.load.image('L4Locked', 'assets/img/L4Locked.png');
        //this.load.audio('bgMusic', ['assets/TownTheme.mp3']);

    }

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

        // //kaiads
        // getKaiAd({
        //     publisher: 'ca24f2d0-de89-4c1a-80c4-51e14d317000',
        //     app: 'Bouncy',
        //     slot: 'Bouncy',
        //     onerror: err => console.error('Custom catch:', err),
        //     onready: ad => {
        //         // Ad is ready to be displayed
        //         // calling 'display' will display the ad
        //         ad.call('display')
        //     }
        // })

        this.events.on('transitionout', function (toScene, duration) {

            this.cameras.main.zoomTo(0.05, 300);

        }, this);
        //
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'bgSL');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        // this.logo = this.add.image(game.config.width / 2, this.CONFIG.centerY / 2.5, 'logo');
        // this.logo.displayHeight = game.config.height / 4;
        // this.logo.displayWidth = game.config.width / 3;


        this.selected_button = 'Play';

        this.upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.key_home = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.HOME);


        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight" || e.key == "Backspace") {
                //console.log("soft right key");
                this.goToMenu();

            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "Enter") {
                //console.log("soft left key");
                this.callMenuButton();
            }
        }, this);

        // Game title

        //this.text_title = this.add.text(this.CONFIG.centerX / 3, this.CONFIG.centerY - 600, 'Color Jump');
        //this.text_title.setColor('#FFF');
        //this.text_title.setFontSize('80px');


        // Click to play text
        // this.text_click_to_play = this.add.text(this.CONFIG.centerX/4, this.CONFIG.centerY+80, 'Click to Play');
        // this.text_click_to_play.setColor('#FFF');
        // this.text_click_to_play.setFontSize('80px');

        // Button PLay
        this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
        this.btn_play.displayHeight = game.config.height / 7;
        this.btn_play.displayWidth = game.config.width / 2;

        // Button Score
        if (localStorage.getItem('L1') == "C") {
            this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
            this.btn_score.displayHeight = game.config.height / 8;
            this.btn_score.displayWidth = game.config.width / 2.1;
        } else if (localStorage.getItem('L1') == null) {
            this.btn_score = this.add.sprite(game.config.width / 1.85, (game.config.height / 9) * 3.7, 'L2Locked', 0).setInteractive();
            this.btn_score.displayHeight = game.config.height / 8;
            this.btn_score.displayWidth = game.config.width / 1.9;
        }

        //Button Help
        if (localStorage.getItem('L2') == "C") {
            this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
            this.btn_help.displayHeight = game.config.height / 8;
            this.btn_help.displayWidth = game.config.width / 2.1;
        } else if (localStorage.getItem('L2') == null) {
            this.btn_help = this.add.sprite(game.config.width / 1.85, (game.config.height / 7.9) * 4.7, 'L3Locked', 0).setInteractive();
            this.btn_help.displayHeight = game.config.height / 8;
            this.btn_help.displayWidth = game.config.width / 1.9;
        }

        // Button exit
        if (localStorage.getItem('L3') == "C") {
            this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
            this.btn_leve4.displayHeight = game.config.height / 8;
            this.btn_leve4.displayWidth = game.config.width / 2.1;
        } else if (localStorage.getItem('L3') == null) {
            this.btn_leve4 = this.add.sprite(game.config.width / 1.85, (game.config.height / 6.45) * 5, 'L4Locked', 0).setInteractive();
            this.btn_leve4.displayHeight = game.config.height / 8;
            this.btn_leve4.displayWidth = game.config.width / 1.9;
        }

        this.back = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(30).setFontFamily("Arial").setOrigin(0.5);

        //this.option = this.add.text(game.config.width - game.config.width * 90 / 100, game.config.height - game.config.height * 5 / 100, "Option").setFontSize(50).setFontFamily("Arial").setOrigin(0.5);

        // create mouse input
        // this.createMouseInput();

        // create keyboard input
        // this.createKeyboardInput();

        // press the enter button on the keyboard then play the game
        // then we can move to the "menu scene" to the "play scene"

        // this.model = this.game.globals.model;
        // if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
        //     this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
        //     this.bgMusic.play();
        //     this.model.bgMusicPlaying = true;
        //     this.game.globals.bgMusic = this.bgMusic;
        // }

        // this.input.keyboard.on('keydown', function (event) {
        //     console.log(event.code);
        // });

    }



    update() {

        if (Phaser.Input.Keyboard.JustDown(this.upArrow)) {
            // console.log("UP CLICK");
            this.changeMenuButtonWithArrowUp();
        }

        if (Phaser.Input.Keyboard.JustDown(this.downArrow)) {
            // console.log("DOWN CLICK");
            this.changeMenuButtonWithArrowDown();
        }
        // if (Phaser.Input.Keyboard.JustDown(this.key_home)) {
        //     console.log("home CLICK");
        //      this.goToOptionScene();
        // }

    }

    goToMenu() {
        this.scene.transition({
            target: "Menu",
            moveAbove: true,
            duration: 300,
        })
        // this.scene.start('Menu');
    }

    changeMenuButtonWithArrowDown() {

        switch (this.selected_button) {
            case "Play":
                if (localStorage.getItem('L1') == "C") {
                    this.btn_play.destroy();
                    //hover level1
                    this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
                    this.btn_play.displayHeight = game.config.height / 8;
                    this.btn_play.displayWidth = game.config.width / 2.1;

                    this.btn_score.destroy();
                    //leve2 hover
                    this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
                    this.btn_score.displayHeight = game.config.height / 7;
                    this.btn_score.displayWidth = game.config.width / 2;

                    this.selected_button = "ScoreScene"
                }

                break;
            case "ScoreScene":
                if (localStorage.getItem('L2') == "C") {
                    this.btn_score.destroy();
                    this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
                    this.btn_score.displayHeight = game.config.height / 8;
                    this.btn_score.displayWidth = game.config.width / 2.1;

                    this.btn_help.destroy();
                    //leve3 hover
                    this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
                    this.btn_help.displayHeight = game.config.height / 7;
                    this.btn_help.displayWidth = game.config.width / 2;

                    this.selected_button = "Help"
                }
                break;
            case "Help":
                if (localStorage.getItem('L3') == "C") {
                    this.btn_help.destroy();
                    this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
                    this.btn_help.displayHeight = game.config.height / 8;
                    this.btn_help.displayWidth = game.config.width / 2.1;

                    this.btn_leve4.destroy();
                    //level 4 hover
                    this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
                    this.btn_leve4.displayHeight = game.config.height / 7;
                    this.btn_leve4.displayWidth = game.config.width / 2;
                    // this.btn_exit.destroy();
                    // this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit_hover', 0).setInteractive();
                    // this.btn_exit.displayHeight = game.config.height / 9;
                    // this.btn_exit.displayWidth = game.config.width / 2;

                    this.selected_button = "Level4"
                }
                break;
            case "Level4":

                this.btn_leve4.destroy();
                this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
                this.btn_leve4.displayHeight = game.config.height / 8;
                this.btn_leve4.displayWidth = game.config.width / 2.1;

                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 7;
                this.btn_play.displayWidth = game.config.width / 2;

                this.selected_button = "Play"
                break;
            default:

        }
    }


    changeMenuButtonWithArrowUp() {

        switch (this.selected_button) {
            case "Play":
                if (localStorage.getItem('L3') == "C") {
                    this.btn_play.destroy();
                    this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
                    this.btn_play.displayHeight = game.config.height / 8;
                    this.btn_play.displayWidth = game.config.width / 2.1;

                    this.btn_leve4.destroy();
                    //level 4 hover
                    this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
                    this.btn_leve4.displayHeight = game.config.height / 7;
                    this.btn_leve4.displayWidth = game.config.width / 2;

                    this.selected_button = "Level4"
                }
                break;
            case "Level4":
                if (localStorage.getItem('L2') == "C") {
                    this.btn_leve4.destroy();
                    this.btn_leve4 = this.add.sprite(game.config.width / 2, (game.config.height / 6.45) * 5, 'btn_Level4', 0).setInteractive();
                    this.btn_leve4.displayHeight = game.config.height / 8;
                    this.btn_leve4.displayWidth = game.config.width / 2.1;

                    this.btn_help.destroy();
                    //level3 hover
                    this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
                    this.btn_help.displayHeight = game.config.height / 7;
                    this.btn_help.displayWidth = game.config.width / 2;

                    this.selected_button = "Help"
                }
                break;
            case "ScoreScene":
                if (localStorage.getItem('L1') == "C") {
                    this.btn_score.destroy();
                    this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
                    this.btn_score.displayHeight = game.config.height / 8;
                    this.btn_score.displayWidth = game.config.width / 2.1;

                    this.btn_play.destroy();
                    this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 13) * 2.8, 'btn_Level1', 0).setInteractive();
                    this.btn_play.displayHeight = game.config.height / 7;
                    this.btn_play.displayWidth = game.config.width / 2;

                    this.selected_button = "Play"
                }
                break;
            case "Help":
                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 7.9) * 4.7, 'btn_Level3', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 8;
                this.btn_help.displayWidth = game.config.width / 2.1;

                this.btn_score.destroy();
                //leve2 hover
                this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 9) * 3.7, 'btn_Leve2', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 7;
                this.btn_score.displayWidth = game.config.width / 2;
                // this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 3.7, 'btn_score_hover', 0).setInteractive();
                // this.btn_score.displayHeight = game.config.height / 8.9;
                // this.btn_score.displayWidth = game.config.width / 2.8;

                this.selected_button = "ScoreScene"
                break;
            // case "Exit":
            //     this.btn_exit.destroy();
            //     this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit', 0).setInteractive();
            //     this.btn_exit.displayHeight = game.config.height / 9;
            //     this.btn_exit.displayWidth = game.config.width / 2;
            //
            //     this.btn_help.destroy();
            //     this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.2, 'btn_help_hover', 0).setInteractive();
            //     this.btn_help.displayHeight = game.config.height / 9;
            //     this.btn_help.displayWidth = game.config.width / 2;
            //     this.selected_button = "Help"
            //     break;
            // default:

        }
    }

    callMenuButton() {
        switch (this.selected_button) {
            case "Play":
                //console.log("Play SELECT");
                localStorage.setItem(gameOptions.currentLevel, 0);
                this.scene.transition({
                    target: "Level2",
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level2")
                break;
            case "ScoreScene":
                //console.log("ScoreScene SELECT");
                this.scene.transition({
                    target: "Level5",
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level5")
                break;
            case "Help":
                //console.log("Option SELECT");
                this.scene.transition({
                    target: "Level3",
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level3")
                break;
            case "Level4":
                //console.log("Exit SELECT");
                //this.scene.stop();
                this.scene.transition({
                    target: "Level4",
                    moveAbove: true,
                    duration: 300,
                })
                // this.scene.start("Level4")
                break;
            default:

        }
    }
}
