import React, { useState } from 'react';
import './StartScreen.css';

const StartScreen = ({ onStartGame }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartClick = () => {
    setIsTransitioning(true);
    // 애니메이션이 끝난 후 게임 시작
    setTimeout(() => {
      onStartGame();
    }, 2000);
  };

  return (
    <div className={`start-screen ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="start-background">
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i % 4}`}></div>
          ))}
        </div>
        
        {/* 플로팅 아일랜드 */}
        <div className="floating-island"></div>
        
        {/* 전환 오버레이 */}
        <div className="transition-overlay"></div>
        
        <div className="start-content">
          <div className="game-title">
            <div className="logo-image"></div>
            <div className="title-subtitle">Card Combat Arena</div>
          </div>
          
          <div className="bottom-content">
            <div className="menu-container">
              <button className="start-button" onClick={handleStartClick}>
                <span className="button-text">START GAME</span>
                <div className="button-glow"></div>
              </button>
              
              <div className="menu-buttons">
                <button className="menu-button settings-button">
                  <span>⚙️ Settings</span>
                </button>
              </div>
            </div>
            
            <div className="version-info">
              <span>Version 1.0.0</span>
            </div>
          </div>
        </div>
        
        <div className="elemental-orbs">
          <div className="orb fire-orb">🔥</div>
          <div className="orb water-orb">💧</div>
          <div className="orb nature-orb">🌿</div>
          <div className="orb neutral-orb">⚫</div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;