// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#4aa7c9',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [
        TitleScene,
        GameScene,
        GameOverScene,
        AboutScene
    ]
};

const game = new Phaser.Game(config);

// ==================== Title Scene ====================
function TitleScene() {
    Phaser.Scene.call(this, { key: 'TitleScene' });
}
TitleScene.prototype = Object.create(Phaser.Scene.prototype);
TitleScene.prototype.constructor = TitleScene;

TitleScene.prototype.preload = function() {
    this.load.image('background', 'assets/backgroundsprite.png');
    this.load.spritesheet('chicken', 'assets/chickensprite.png', { 
        frameWidth: 307,
        frameHeight: 405
    });
};

TitleScene.prototype.create = function() {
    this.add.image(400, 300, 'background').setDisplaySize(800, 600);
    
    this.add.text(400, 100, 'Chicken Run', {
        fontSize: '64px',
        fill: '#000',
        stroke: '#fff',
        strokeThickness: 6
    }).setOrigin(0.5);
    
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('chicken', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    
    const chicken = this.add.sprite(400, 300, 'chicken').setScale(0.15);
    chicken.play('run');
    
    this.add.text(400, 400, 'Press SPACE or UP ARROW to jump\nCollect corn and avoid hay bales!', {
        fontSize: '24px',
        fill: '#000',
        stroke: '#fff',
        strokeThickness: 4,
        align: 'center'
    }).setOrigin(0.5);
    
    // Start button
    const startButton = this.add.text(400, 500, 'Start Game', {
        fontSize: '32px',
        fill: '#000',
        backgroundColor: '#fff',
        padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();
    
    startButton.on('pointerover', function() { this.setStyle({ fill: '#ff0' }); });
    startButton.on('pointerout', function() { this.setStyle({ fill: '#000' }); });
    startButton.on('pointerdown', function() { this.scene.start('GameScene'); }, this);
    
    // About button
    const aboutButton = this.add.text(400, 560, 'About', {
        fontSize: '24px',
        fill: '#000',
        backgroundColor: '#ccc',
        padding: { x: 15, y: 5 }
    }).setOrigin(0.5).setInteractive();
    
    aboutButton.on('pointerover', function() { this.setStyle({ fill: '#ff0' }); });
    aboutButton.on('pointerout', function() { this.setStyle({ fill: '#000' }); });
    aboutButton.on('pointerdown', function() { this.scene.start('AboutScene'); }, this);
    
    // Also allow pressing 'A' key to go to About
    this.input.keyboard.once('keydown-A', function() { this.scene.start('AboutScene'); }, this);
    
    this.input.keyboard.once('keydown-SPACE', function() { this.scene.start('GameScene'); }, this);
};

// ==================== About Scene ====================
function AboutScene() {
    Phaser.Scene.call(this, { key: 'AboutScene' });
}
AboutScene.prototype = Object.create(Phaser.Scene.prototype);
AboutScene.prototype.constructor = AboutScene;

AboutScene.prototype.create = function() {
    this.add.image(400, 300, 'background').setDisplaySize(800, 600);
    
    this.add.text(400, 80, 'About the Creator', {
        fontSize: '48px',
        fill: '#000',
        stroke: '#fff',
        strokeThickness: 6
    }).setOrigin(0.5);
    
    // ===== EDIT THIS SECTION WITH YOUR INFO =====
    const aboutText = 
        "Hi, I'm [Scorpion Modz]!\n" +
        "I created this game to learn Phaser and have fun.\n" +
        "I was trying out making this type of game to get some knowledge .\n" +
        "Follow me on YouTube: @scorpion-modz\n" +
        "Check out my website: yoursite.com\n\n" +
        "Special thanks to everyone who supported me!\n" +
        "Enjoy the game!";
    
    this.add.text(400, 300, aboutText, {
        fontSize: '22px',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 3,
        align: 'center',
        lineSpacing: 10
    }).setOrigin(0.5);
    
    // Back button
    const backButton = this.add.text(400, 500, 'Back to Title', {
        fontSize: '32px',
        fill: '#000',
        backgroundColor: '#fff',
        padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();
    
    backButton.on('pointerover', function() { this.setStyle({ fill: '#ff0' }); });
    backButton.on('pointerout', function() { this.setStyle({ fill: '#000' }); });
    backButton.on('pointerdown', function() { this.scene.start('TitleScene'); }, this);
    
    // Press B to go back
    this.input.keyboard.once('keydown-B', function() { this.scene.start('TitleScene'); }, this);
};

// ==================== Game Over Scene ====================
function GameOverScene() {
    Phaser.Scene.call(this, { key: 'GameOverScene' });
}
GameOverScene.prototype = Object.create(Phaser.Scene.prototype);
GameOverScene.prototype.constructor = GameOverScene;

GameOverScene.prototype.init = function(data) {
    this.score = data.score || 0;
};

GameOverScene.prototype.preload = function() {
    this.load.image('background', 'assets/backgroundsprite.png');
    this.load.spritesheet('chicken', 'assets/chickensprite.png', { 
        frameWidth: 307,
        frameHeight: 405
    });
};

GameOverScene.prototype.create = function() {
    this.add.image(400, 300, 'background').setDisplaySize(800, 600);
    
    this.add.text(400, 200, 'GAME OVER', {
        fontSize: '64px',
        fontStyle: 'bold',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 6
    }).setOrigin(0.5);
    
    let highScore = localStorage.getItem('chickenRunHighScore') || 0;
    highScore = Math.max(highScore, this.score);
    localStorage.setItem('chickenRunHighScore', highScore);
    
    this.add.text(400, 300, 'Your Score: ' + Math.floor(this.score), {
        fontSize: '32px',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 4
    }).setOrigin(0.5);
    
    this.add.text(400, 350, 'High Score: ' + Math.floor(highScore), {
        fontSize: '32px',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 4
    }).setOrigin(0.5);
    
    if (this.score >= highScore && this.score > 0) {
        this.add.text(400, 400, 'NEW HIGH SCORE!', {
            fontSize: '36px',
            fontStyle: 'bold',
            fill: '#ff0',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);
    }
    
    const restartButton = this.add.text(400, 500, 'Play Again', {
        fontSize: '32px',
        fill: '#000',
        backgroundColor: '#fff',
        padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();
    
    restartButton.on('pointerover', function() { this.setStyle({ fill: '#ff0' }); });
    restartButton.on('pointerout', function() { this.setStyle({ fill: '#000' }); });
    restartButton.on('pointerdown', function() { this.scene.start('GameScene'); }, this);
    
    this.input.keyboard.once('keydown-SPACE', function() { this.scene.start('GameScene'); }, this);
};

// ==================== Main Game Scene ====================
function GameScene() {
    Phaser.Scene.call(this, { key: 'GameScene' });
}
GameScene.prototype = Object.create(Phaser.Scene.prototype);
GameScene.prototype.constructor = GameScene;

GameScene.prototype.init = function() {
    this.player = null;
    this.obstacles = null;
    this.corns = null;
    this.ground = null;
    this.score = 0;
    this.scoreText = null;
    this.highScoreText = null;
    this.gameOver = false;
    this.spawnTimer = null;
    this.difficultyTimer = null;
    this.difficulty = 0;
    this.gameSpeed = 200;
    this.spawnDelay = 2000;
    this.maxDifficulty = 10;
    this.bgScrollSpeed = 50;
};

GameScene.prototype.preload = function() {
    this.load.image('background', 'assets/backgroundsprite.png');
    this.load.image('ground', 'assets/groundsprite.png');
    this.load.image('corn', 'assets/cornsprite.png');
    this.load.image('haybale', 'assets/haysprite.png');
    this.load.spritesheet('chicken', 'assets/chickensprite.png', { 
        frameWidth: 307,
        frameHeight: 405
    });
};

GameScene.prototype.create = function() {
    // Background layers
    this.bg1 = this.add.image(400, 300, 'background').setDisplaySize(800, 600);
    this.bg2 = this.add.image(400, 300, 'background').setDisplaySize(800, 600);
    this.bg1.setScrollFactor(0);
    this.bg2.setScrollFactor(0);
    this.bg1.x = 400;
    this.bg2.x = 1200;
    this.bgSpeed = 0.5;

    // Scrolling ground tile
    this.groundTile = this.add.tileSprite(400, 580, 800, 40, 'ground').setOrigin(0.5, 1);
    // Physics ground
    this.ground = this.physics.add.staticGroup();
    const groundSprite = this.ground.create(400, 580, 'ground');
    groundSprite.setDisplaySize(800, 40);
    groundSprite.refreshBody();
    groundSprite.visible = false;

    // Player
    this.player = this.physics.add.sprite(100, 450, 'chicken');
    this.player.setScale(0.15);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(120, 150);
    this.player.body.setOffset(90, 180);

    // Animations
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('chicken', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('chicken', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });
    this.player.play('run');

    // Shadow
    this.shadow = this.add.circle(this.player.x, this.player.y + 20, 15, 0x000000, 0.3);
    this.shadow.setDepth(-1);

    // Collisions
    this.physics.add.collider(this.player, this.ground);

    // Groups
    this.obstacles = this.physics.add.group();
    this.corns = this.physics.add.group();

    this.physics.add.collider(this.obstacles, this.ground);
    this.physics.add.collider(this.corns, this.ground);
    this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);
    this.physics.add.overlap(this.player, this.corns, this.collectCorn, null, this);

    // Controls (keyboard)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // TOUCH CONTROL: Tap anywhere to jump
    this.input.on('pointerdown', this.handleTouchJump, this);

    // UI
    this.scoreText = this.add.text(16, 16, 'Score: 0', { 
        fontSize: '32px', 
        fill: '#000',
        stroke: '#fff',
        strokeThickness: 2
    });
    this.highScoreText = this.add.text(16, 56, 'High: 0', { 
        fontSize: '24px', 
        fill: '#000',
        stroke: '#fff',
        strokeThickness: 2
    });
    this.highScore = localStorage.getItem('chickenRunHighScore') || 0;
    this.highScoreText.setText('High: ' + Math.floor(this.highScore));

    // Touch hint for mobile users
    this.touchHint = this.add.text(400, 550, 'Tap to jump', {
        fontSize: '24px',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 3,
        backgroundColor: '#00000080',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    // Fade in/out hint
    this.tweens.add({
        targets: this.touchHint,
        alpha: 0.5,
        duration: 1000,
        yoyo: true,
        repeat: -1
    });

    // Difficulty meter
    this.difficultyBar = this.add.graphics();
    this.difficultyBar.fillStyle(0x00ff00, 1);
    this.difficultyBar.fillRect(650, 20, 150, 20);
    this.difficultyBar.setDepth(10);

    // Timers
    this.spawnTimer = this.time.addEvent({
        delay: this.spawnDelay,
        callback: this.spawnObstacles,
        callbackScope: this,
        loop: true
    });
    this.difficultyTimer = this.time.addEvent({
        delay: 5000,
        callback: this.increaseDifficulty,
        callbackScope: this,
        loop: true
    });

    // Particles
    this.cornParticles = this.add.particles('corn');
    this.cornEmitter = this.cornParticles.createEmitter({
        speed: { min: 100, max: 200 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.05, end: 0 },
        blendMode: 'ADD',
        lifespan: 600,
        gravityY: 300,
        quantity: 5,
        on: false
    });
    this.hitParticles = this.add.particles('haybale');
    this.hitEmitter = this.hitParticles.createEmitter({
        speed: { min: 200, max: 300 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.03, end: 0 },
        blendMode: 'ADD',
        lifespan: 800,
        gravityY: 200,
        quantity: 10,
        on: false
    });
    this.dustParticles = this.add.particles('ground');
    this.dustEmitter = this.dustParticles.createEmitter({
        speed: { min: 50, max: 100 },
        angle: { min: 250, max: 290 },
        scale: { start: 0.02, end: 0 },
        lifespan: 300,
        gravityY: 0,
        quantity: 3,
        on: false
    });
};

GameScene.prototype.handleTouchJump = function(pointer) {
    // Prevent jump if game over
    if (this.gameOver) return;
    
    // Check if chicken is on ground
    if (this.player.body.touching.down) {
        this.player.setVelocityY(-600);
        this.player.play('jump', true);
        // Dust effect on jump
        this.dustEmitter.setPosition(this.player.x, this.player.y + 30);
        this.dustEmitter.explode(5);
    }
};

GameScene.prototype.update = function() {
    if (this.gameOver) return;

    // Parallax
    this.bg1.x -= this.bgSpeed;
    this.bg2.x -= this.bgSpeed;
    if (this.bg1.x < -400) this.bg1.x = 1200;
    if (this.bg2.x < -400) this.bg2.x = 1200;

    // Ground scroll
    this.groundTile.tilePositionX += this.gameSpeed / 100;

    // Shadow follow
    this.shadow.x = this.player.x;
    this.shadow.y = this.player.y + 20;

    // Keyboard jump (still supported)
    if ((this.cursors.up.isDown || this.spaceKey.isDown) && this.player.body.touching.down) {
        this.player.setVelocityY(-600);
        this.player.play('jump', true);
        this.dustEmitter.setPosition(this.player.x, this.player.y + 30);
        this.dustEmitter.explode(5);
    } else if (this.player.body.touching.down && this.player.anims.currentAnim?.key === 'jump') {
        this.player.play('run', true);
    }

    // Score
    this.score += 0.1;
    this.scoreText.setText('Score: ' + Math.floor(this.score));

    if (this.score > this.highScore) {
        this.highScore = this.score;
        this.highScoreText.setText('High: ' + Math.floor(this.highScore));
    }

    // Difficulty meter
    this.difficultyBar.clear();
    const fillPercent = this.difficulty / this.maxDifficulty;
    const barWidth = 150 * fillPercent;
    this.difficultyBar.fillStyle(0x00ff00, 1);
    this.difficultyBar.fillRect(650, 20, barWidth, 20);
    this.difficultyBar.lineStyle(2, 0x000000, 1);
    this.difficultyBar.strokeRect(650, 20, 150, 20);

    // Cleanup
    this.obstacles.getChildren().forEach(o => { if (o.x < -o.width) o.destroy(); });
    this.corns.getChildren().forEach(c => { if (c.x < -c.width) c.destroy(); });
};

GameScene.prototype.increaseDifficulty = function() {
    if (this.gameOver) return;
    this.difficulty = Math.min(this.difficulty + 1, this.maxDifficulty);
    this.gameSpeed = 200 + (this.difficulty * 30);
    this.spawnDelay = Phaser.Math.Linear(2000, 1000, this.difficulty / this.maxDifficulty);
    this.spawnTimer.delay = this.spawnDelay;
};

GameScene.prototype.spawnObstacles = function() {
    if (this.gameOver) return;
    const rand = Math.random();
    if (rand < 0.3) {
        const corn = this.corns.create(850, 500, 'corn');
        corn.setScale(0.125);
        corn.setVelocityX(-this.gameSpeed);
        corn.body.setAllowGravity(false);
    } else {
        let numHayBales = this.difficulty > 5 && Math.random() > 0.5 ? 2 : 1;
        const minSpace = Math.max(200, 400 - (this.difficulty * 20));
        const maxSpace = Math.max(300, 500 - (this.difficulty * 20));
        for (let i = 0; i < numHayBales; i++) {
            const xPos = 850 + (i * Phaser.Math.Between(minSpace, maxSpace));
            const obstacle = this.obstacles.create(xPos, 510, 'haybale');
            obstacle.setScale(0.08);
            obstacle.body.setAllowGravity(false);
            obstacle.setVelocityX(-this.gameSpeed);
            this.tweens.add({
                targets: obstacle,
                angle: -360,
                duration: 2000,
                repeat: -1,
                ease: 'Linear'
            });
        }
    }
};

GameScene.prototype.collectCorn = function(player, corn) {
    if (this.gameOver) return;
    this.score += 10;
    this.scoreText.setText('Score: ' + Math.floor(this.score));

    this.cornEmitter.setPosition(corn.x, corn.y);
    this.cornEmitter.explode(8);

    const popup = this.add.text(corn.x, corn.y - 20, '+10', {
        fontSize: '24px',
        fill: '#ff0',
        stroke: '#000',
        strokeThickness: 2
    }).setOrigin(0.5);
    this.tweens.add({
        targets: popup,
        y: corn.y - 60,
        alpha: 0,
        duration: 800,
        onComplete: () => popup.destroy()
    });

    corn.destroy();

    this.tweens.add({
        targets: this.scoreText,
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 100,
        yoyo: true
    });
};

GameScene.prototype.hitObstacle = function(player, obstacle) {
    this.physics.pause();
    player.setTint(0xff0000);
    this.gameOver = true;

    this.hitEmitter.setPosition(player.x, player.y);
    this.hitEmitter.explode(15);

    this.cameras.main.shake(200, 0.01);

    this.time.delayedCall(1000, () => {
        this.scene.start('GameOverScene', { score: this.score });
    });
};