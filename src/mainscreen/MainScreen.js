import React, { useState } from 'react';
import './MainScreen.css';

const MainScreen = ({ onStartBattle, onBackToMenu }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [activeTab, setActiveTab] = useState('stats'); // 'stats', 'inventory', 'skills'

  const characters = [
    {
      id: 0,
      name: "Flame Warrior",
      level: 12,
      class: "Fire Mage",
      hp: 450,
      maxHp: 520,
      mp: 180,
      maxMp: 200,
      attack: 85,
      defense: 42,
      magic: 95,
      speed: 38,
      exp: 1240,
      expToNext: 1800,
      element: "fire",
      sprite: "🧙‍♂️"
    },
    {
      id: 1,
      name: "Aqua Guardian",
      level: 10,
      class: "Water Knight",
      hp: 580,
      maxHp: 620,
      mp: 120,
      maxMp: 140,
      attack: 75,
      defense: 88,
      magic: 45,
      speed: 52,
      exp: 980,
      expToNext: 1200,
      element: "water",
      sprite: "🛡️"
    },
    {
      id: 2,
      name: "Terra Ranger",
      level: 11,
      class: "Nature Archer",
      hp: 380,
      maxHp: 420,
      mp: 160,
      maxMp: 180,
      attack: 92,
      defense: 35,
      magic: 68,
      speed: 78,
      exp: 1100,
      expToNext: 1500,
      element: "nature",
      sprite: "🏹"
    }
  ];

  const inventory = [
    { id: 1, name: "Health Potion", type: "consumable", quantity: 5, rarity: "common", icon: "🧪" },
    { id: 2, name: "Mana Crystal", type: "consumable", quantity: 3, rarity: "rare", icon: "💎" },
    { id: 3, name: "Fire Sword", type: "weapon", quantity: 1, rarity: "epic", icon: "⚔️" },
    { id: 4, name: "Dragon Scale", type: "material", quantity: 2, rarity: "legendary", icon: "🐉" },
    { id: 5, name: "Magic Ring", type: "accessory", quantity: 1, rarity: "rare", icon: "💍" },
    { id: 6, name: "Swift Boots", type: "equipment", quantity: 1, rarity: "uncommon", icon: "👢" }
  ];

  const skills = [
    { id: 1, name: "Fireball", level: 5, element: "fire", cost: 25, icon: "🔥", description: "Deals fire damage" },
    { id: 2, name: "Ice Shield", level: 3, element: "water", cost: 30, icon: "🛡️", description: "Increases defense" },
    { id: 3, name: "Wind Slash", level: 4, element: "nature", cost: 20, icon: "💨", description: "Fast attack spell" },
    { id: 4, name: "Heal", level: 6, element: "none", cost: 35, icon: "✨", description: "Restores HP" }
  ];

  const currentChar = characters[selectedCharacter];

  const renderStatsTab = () => (
    <div className="tab-content stats-tab">
      <div className="stat-groups">
        <div className="stat-group">
          <h3>Basic Stats</h3>
          <div className="stat-item">
            <span>Level</span>
            <span className="stat-value">{currentChar.level}</span>
          </div>
          <div className="stat-item">
            <span>Class</span>
            <span className="stat-value">{currentChar.class}</span>
          </div>
          <div className="stat-item">
            <span>Element</span>
            <span className={`stat-value element-${currentChar.element}`}>
              {currentChar.element.charAt(0).toUpperCase() + currentChar.element.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="stat-group">
          <h3>Combat Stats</h3>
          <div className="stat-item">
            <span>Attack</span>
            <span className="stat-value">{currentChar.attack}</span>
          </div>
          <div className="stat-item">
            <span>Defense</span>
            <span className="stat-value">{currentChar.defense}</span>
          </div>
          <div className="stat-item">
            <span>Magic</span>
            <span className="stat-value">{currentChar.magic}</span>
          </div>
          <div className="stat-item">
            <span>Speed</span>
            <span className="stat-value">{currentChar.speed}</span>
          </div>
        </div>
      </div>
      
      <div className="exp-section">
        <h3>Experience</h3>
        <div className="exp-bar">
          <div 
            className="exp-fill" 
            style={{ width: `${(currentChar.exp / currentChar.expToNext) * 100}%` }}
          ></div>
        </div>
        <div className="exp-text">
          {currentChar.exp} / {currentChar.expToNext} EXP
        </div>
      </div>
    </div>
  );

  const renderInventoryTab = () => (
    <div className="tab-content inventory-tab">
      <div className="inventory-grid">
        {inventory.map(item => (
          <div key={item.id} className={`inventory-item rarity-${item.rarity}`}>
            <div className="item-icon">{item.icon}</div>
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-type">{item.type}</div>
              {item.quantity > 1 && <div className="item-quantity">x{item.quantity}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsTab = () => (
    <div className="tab-content skills-tab">
      <div className="skills-grid">
        {skills.map(skill => (
          <div key={skill.id} className={`skill-item element-${skill.element}`}>
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-info">
              <div className="skill-name">{skill.name}</div>
              <div className="skill-level">Level {skill.level}</div>
              <div className="skill-cost">Cost: {skill.cost} MP</div>
              <div className="skill-description">{skill.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="main-screen">
      <div className="main-background">
        <button className="back-button" onClick={onBackToMenu}>
          ← Back to Menu
        </button>

        <div className="main-container">
          {/* Character Selection */}
          <div className="character-section">
            <h2>Select Character</h2>
            <div className="character-list">
              {characters.map((char, index) => (
                <div 
                  key={char.id}
                  className={`character-card ${selectedCharacter === index ? 'selected' : ''}`}
                  onClick={() => setSelectedCharacter(index)}
                >
                  <div className="char-sprite">{char.sprite}</div>
                  <div className="char-info">
                    <div className="char-name">{char.name}</div>
                    <div className="char-level">Lv. {char.level}</div>
                    <div className={`char-element element-${char.element}`}>
                      {char.element}
                    </div>
                  </div>
                  <div className="hp-bar">
                    <div 
                      className="hp-fill" 
                      style={{ width: `${(char.hp / char.maxHp) * 100}%` }}
                    ></div>
                  </div>
                  <div className="hp-text">{char.hp}/{char.maxHp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Character Details */}
          <div className="details-section">
            <div className="character-portrait">
              <div className="portrait-sprite">{currentChar.sprite}</div>
              <div className="portrait-info">
                <h2>{currentChar.name}</h2>
                <div className="portrait-stats">
                  <div className="hp-mp-bars">
                    <div className="stat-bar hp-bar">
                      <span>HP</span>
                      <div className="bar">
                        <div 
                          className="fill hp-fill" 
                          style={{ width: `${(currentChar.hp / currentChar.maxHp) * 100}%` }}
                        ></div>
                      </div>
                      <span>{currentChar.hp}/{currentChar.maxHp}</span>
                    </div>
                    <div className="stat-bar mp-bar">
                      <span>MP</span>
                      <div className="bar">
                        <div 
                          className="fill mp-fill" 
                          style={{ width: `${(currentChar.mp / currentChar.maxMp) * 100}%` }}
                        ></div>
                      </div>
                      <span>{currentChar.mp}/{currentChar.maxMp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs-section">
              <div className="tab-buttons">
                <button 
                  className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
                  onClick={() => setActiveTab('stats')}
                >
                  📊 Stats
                </button>
                <button 
                  className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
                  onClick={() => setActiveTab('inventory')}
                >
                  🎒 Inventory
                </button>
                <button 
                  className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => setActiveTab('skills')}
                >
                  ⚡ Skills
                </button>
              </div>

              {activeTab === 'stats' && renderStatsTab()}
              {activeTab === 'inventory' && renderInventoryTab()}
              {activeTab === 'skills' && renderSkillsTab()}
            </div>
          </div>

          {/* Battle Button */}
          <div className="battle-section">
            <button className="battle-button" onClick={onStartBattle}>
              <span>⚔️ Enter Battle</span>
              <div className="button-glow"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;