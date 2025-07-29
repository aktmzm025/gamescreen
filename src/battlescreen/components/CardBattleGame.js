import React, { useState, useMemo, useCallback } from 'react';
import './CardBattleGame.css';
import playerImage from '../characterimg/m1.png';
import enemyImage from '../enemyimg/e1.png';
import forestBg from '../background/forest.png';
import blueCard from '../cardimg/blue.png';
import greenCard from '../cardimg/green.png';
import noneCard from '../cardimg/none.png';
import redCard from '../cardimg/red.png';
import fireEffect from '../cardeffect/fire.png';
import waterEffect from '../cardeffect/water.png';
import glassEffect from '../cardeffect/glass.png';
import noneEffect from '../cardeffect/none.png';

const CardBattleGame = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [animatingCard, setAnimatingCard] = useState(null);
  const [showSkillEffect, setShowSkillEffect] = useState(false);
  const [showAttackEffect, setShowAttackEffect] = useState(false);

  const cards = useMemo(() => [
    { 
      id: 1, 
      name: 'Fire Ball', 
      cost: 1, 
      type: 'Attack', 
      element: 'fire',
      cardBg: redCard,
      skillIcon: '🔥',
      description: 'Deal 6 fire damage',
      skillImage: '🔥',
      effectImage: fireEffect
    },
    { 
      id: 2, 
      name: 'Water Ball', 
      cost: 1, 
      type: 'Attack', 
      element: 'water',
      cardBg: blueCard,
      skillIcon: '💧',
      description: 'Deal 6 water damage',
      skillImage: '💧',
      effectImage: waterEffect
    },
    { 
      id: 3, 
      name: 'Nature Ball', 
      cost: 1, 
      type: 'Attack', 
      element: 'nature',
      cardBg: greenCard,
      skillIcon: '🌿',
      description: 'Deal 6 nature damage',
      skillImage: '🌿',
      effectImage: glassEffect
    },
    { 
      id: 4, 
      name: 'None Ball', 
      cost: 1, 
      type: 'Attack', 
      element: 'none',
      cardBg: noneCard,
      skillIcon: '⚫',
      description: 'Deal 6 neutral damage',
      skillImage: '⚫',
      effectImage: noneEffect
    }
  ], []);

  const handleCardClick = useCallback((card) => {
    if (animatingCard) return;

    setSelectedCard(card);
    setAnimatingCard(card.id);
    setShowSkillEffect(true);

    const attackTimer = setTimeout(() => setShowAttackEffect(true), 1000);
    const resetTimer = setTimeout(() => {
      setAnimatingCard(null);
      setSelectedCard(null);
      setShowSkillEffect(false);
      setShowAttackEffect(false);
    }, 2000);

    return () => {
      clearTimeout(attackTimer);
      clearTimeout(resetTimer);
    };
  }, [animatingCard]);

  return (
    <div className="game-container">
      <div className="battle-area" style={{ backgroundImage: `url(${forestBg})` }}>
        <div className="player">
          <img src={playerImage} alt="Player" className="player-sprite" />
          <div className="player-stats">
            <div className="player-health">❤️ 47/82</div>
            <div className="player-energy">⚡ 86</div>
          </div>
        </div>

        <div className="enemy">
          <img src={enemyImage} alt="Enemy" className="enemy-sprite" />
          <div className="enemy-health">30/50</div>
          {showAttackEffect && selectedCard && (
            <div className="card-effect">
              <img src={selectedCard.effectImage} alt="Effect" className="effect-image" />
            </div>
          )}
        </div>

        {showSkillEffect && selectedCard && (
          <div className="selected-card-display">
            <div className="skill-card" style={{ backgroundImage: `url(${selectedCard.cardBg})` }}>
              <div className="skill-cost">{selectedCard.cost}</div>
              <div className="skill-name">{selectedCard.name}</div>
              <div className="skill-icon">
                <span className="skill-emoji">{selectedCard.skillImage}</span>
              </div>
              <div className="skill-description">{selectedCard.description}</div>
            </div>
          </div>
        )}
      </div>

      <div className="card-deck">
        <div className="energy-display">4/3</div>
        <div className="cards-container">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card card-${card.element}`}
              style={{ backgroundImage: `url(${card.cardBg})` }}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-cost">{card.cost}</div>
              <div className="card-name">{card.name}</div>
              <div className="card-image">
                <span className="card-emoji">{card.skillIcon}</span>
              </div>
              <div className="card-description">{card.description}</div>
              <div className="card-type">{card.type}</div>
            </div>
          ))}
        </div>
        <button className="end-turn-btn">End Turn</button>
      </div>
    </div>
  );
};

export default React.memo(CardBattleGame);