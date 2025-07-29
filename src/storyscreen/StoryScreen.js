import React, { useState, useEffect } from 'react';
import './StoryScreen.css';

const StoryScreen = ({ onContinue }) => {
  const [currentStage, setCurrentStage] = useState('s1'); // 's1', 'island', 's2'
  const [islandVisible, setIslandVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // S1을 6초 보여주기
    const s1Timer = setTimeout(() => {
      setCurrentStage('island');
      // 섬 솟아오르기 시작
      setTimeout(() => {
        setIslandVisible(true);
      }, 500);
      
      // 섬을 6초 보여준 후 S2로 전환
      setTimeout(() => {
        setCurrentStage('s2');
        setIslandVisible(false);
        
        // S2를 6초 보여준 후 페이드아웃 시작
        setTimeout(() => {
          setIsTransitioning(true);
          // 페이드아웃 후 배틀스크린으로
          setTimeout(() => {
            onContinue();
          }, 2000);
        }, 6000);
      }, 6000);
    }, 6000);

    return () => clearTimeout(s1Timer);
  }, [onContinue]);

  const getBackgroundClass = () => {
    let baseClass = '';
    switch(currentStage) {
      case 's1':
        baseClass = 'story-background s1-background';
        break;
      case 'island':
        baseClass = 'story-background island-background';
        break;
      case 's2':
        baseClass = 'story-background s2-background';
        break;
      default:
        baseClass = 'story-background s1-background';
    }
    
    return isTransitioning ? `${baseClass} transitioning` : baseClass;
  };

  const renderStoryText = () => {
    if (currentStage === 's1') {
      return (
        <div className="story-text">
          <h1 className="story-title">The Ancient Prophecy</h1>
          <p className="story-description">
            Deep within the mystical caverns, ancient heroes gather as the prophecy foretells of a great awakening...
          </p>
        </div>
      );
    } else if (currentStage === 's2') {
      return (
        <div className="story-text">
          <h1 className="story-title">The Island Awakens</h1>
          <p className="story-description">
            The legendary island has risen from the depths, revealing its secrets and the power of the River Dice. Your adventure begins now!
          </p>
        </div>
      );
    } else {
      return (
        <div className="story-text">
          <h1 className="story-title">The Legend Begins...</h1>
          <p className="story-description">
            From the depths of the mystical waters, an ancient island rises,
            carrying with it the secrets of elemental magic and the power of the River Dice.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="story-screen">
      <div className={getBackgroundClass()}>
        {/* 섬은 island 단계에서만 표시 */}
        {currentStage === 'island' && (
          <div className={`rising-island ${islandVisible ? 'visible' : ''}`}></div>
        )}
        
        {/* 텍스트는 모든 단계에서 표시 */}
        <div className="story-content">
          {renderStoryText()}
        </div>
        
        {/* 물결 효과는 island 단계에서만 */}
        {currentStage === 'island' && (
          <div className="water-waves">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryScreen;