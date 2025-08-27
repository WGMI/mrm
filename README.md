# MRM Trivia Game

A mobile-first trivia game designed to engage customers and fundis while communicating MRM's products and services.

## Features

### Game Mechanics
- **8-10 randomized questions** per game session
- **5-second timer** per question for added excitement
- **4 multiple choice options** per question
- **Real-time scoring** with visual feedback
- **Progress tracking** with animated progress bar

### Visual Appeal
- **Green highlighting** for correct answers
- **Red highlighting** for incorrect answers
- **Shaking animations** for wrong selections
- **Confetti animations** for high scores (70%+)
- **Smooth transitions** between screens
- **Mobile-optimized** responsive design

### KYC Collection
- **Name, phone, and email** collection
- **Form validation** for required fields
- **Data storage** in browser localStorage

### Data Management
- **Player scores** automatically saved
- **Excel/CSV export** functionality
- **Historical data** tracking
- **Downloadable results** for administrators

## Technical Specifications

### Frontend Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No external dependencies
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### File Structure
```
mrm/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # Game logic and functionality
└── README.md           # Documentation
```

## Setup Instructions

1. **Download/Clone** the project files
2. **Open** `index.html` in a web browser
3. **No server required** - runs entirely in the browser

## Game Flow

1. **Welcome Screen** - Introduction and game overview
2. **KYC Form** - Collect player information
3. **Game Screen** - Interactive trivia questions
4. **Results Screen** - Score display and options

## Question Categories

The game includes questions about:
- MRM company information
- Product knowledge
- Service offerings
- Construction industry expertise
- Warranty and support details

## Data Export

### CSV Format
The downloadable results include:
- Player name, phone, email
- Final score and accuracy
- Correct/incorrect answer counts
- Game date and timestamp

### Sample Export
```csv
Name,Phone,Email,Score,Correct Answers,Incorrect Answers,Total Questions,Accuracy,Date
"John Doe","+1234567890","john@example.com",80,8,2,10,80%,"2024-01-15"
```

## Customization

### Adding Questions
Edit the `triviaQuestions` array in `script.js`:
```javascript
{
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: 0 // Index of correct answer (0-3)
}
```

### Styling
- Modify `styles.css` for visual changes
- Update color scheme in CSS variables
- Adjust animations and transitions

### Game Settings
- Change timer duration in `startTimer()` function
- Modify question count in `initializeGame()`
- Adjust scoring system in `handleCorrectAnswer()`

## Mobile Optimization

- **Touch-friendly** interface
- **Responsive design** for all screen sizes
- **Prevented zoom** on double-tap
- **Optimized animations** for mobile performance

## Browser Storage

The game uses `localStorage` to save:
- Player information
- Game results
- Historical data

Data persists between browser sessions and can be exported as needed.

## Security Considerations

- All data is stored locally in the browser
- No external API calls or data transmission
- KYC data is only used for game results export
- No sensitive information is transmitted

## Performance Features

- **Efficient animations** using CSS transforms
- **Optimized event handling** for mobile devices
- **Minimal DOM manipulation** for smooth performance
- **Memory management** with proper cleanup

## Future Enhancements

Potential improvements:
- Backend integration for data storage
- User authentication system
- Leaderboard functionality
- Social media sharing
- Push notifications
- Offline capability with service workers

## Support

For technical support or customization requests, contact the development team.

---

**MRM Trivia Game** - Engaging customers through interactive learning about MRM products and services.
