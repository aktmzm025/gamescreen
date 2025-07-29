import React, { useState } from 'react';
import CardBattleGame from './battlescreen/components/CardBattleGame';
import StartScreen from './openscreen/StartScreen';
import StoryScreen from './storyscreen/StoryScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // 'start', 'story', 'battle'

  const handleStartGame = () => {
    setCurrentScreen('story');
  };

  const handleContinueFromStory = () => {
    setCurrentScreen('battle');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('start');
  };

  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case 'start':
        return <StartScreen onStartGame={handleStartGame} />;
      case 'story':
        return <StoryScreen onContinue={handleContinueFromStory} />;
      case 'battle':
        return <CardBattleGame onBackToMenu={handleBackToMenu} />;
      default:
        return <StartScreen onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;