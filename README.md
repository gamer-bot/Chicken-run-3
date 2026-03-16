# Chicken Run

A fun, endless runner game built with Phaser 3 where you control a chicken trying to avoid hay bales and collect corn.

![Chicken Run Game](screenshot.png)

## Description

Chicken Run is a simple yet addictive endless runner game. Play as a chicken running through a farm, jumping over hay bales and collecting corn to increase your score. The game gets progressively more difficult as you play, with obstacles moving faster and appearing more frequently.

## Features

- Animated chicken character with running and jumping animations
- Progressive difficulty system that increases over time
- Score tracking with high score persistence using localStorage
- Responsive controls (keyboard)
- Multiple game scenes (title screen, gameplay, game over)

## How to Play

1. Press SPACE or UP ARROW to start the game from the title screen
2. Press SPACE or UP ARROW to make the chicken jump
3. Avoid hay bales and collect corn to increase your score
4. Try to beat your high score!

## Installation

No installation required! Simply clone the repository and open `index.html` in a web browser.

```bash
git clone https://github.com/yourusername/chicken-run.git
cd chicken-run
# Open index.html in your browser
```

## Technologies Used

- HTML5
- CSS3
- JavaScript
- [Phaser 3](https://phaser.io/) - HTML5 game framework

## Project Structure

```
.
├── assets/               # Game assets (images, sounds)
│   ├── backgroundsprite.png
│   ├── chickensprite.png
│   ├── cornsprite.png
│   ├── groundsprite.png
│   └── haysprite.png
├── js/                   # JavaScript files
│   └── game.js           # Main game code
├── index.html            # Main HTML file
└── README.md             # This file
```

## Future Enhancements

- Add sound effects and background music
- Add mobile touch controls
- Add power-ups and additional obstacles
- Implement day/night cycle
- Add parallax scrolling backgrounds

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Artwork created for this project
- Inspired by classic endless runner games
