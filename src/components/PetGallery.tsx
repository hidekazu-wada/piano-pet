import React from 'react';
import { petLevels } from '../config/petConfig';
import './PetGallery.css';

interface PetGalleryProps {
  currentLevel: number;
  onClose: () => void;
}

const PetGallery: React.FC<PetGalleryProps> = ({ currentLevel, onClose }) => {
  return (
    <div className="pet-gallery-overlay" onClick={onClose}>
      <div className="pet-gallery-content" onClick={e => e.stopPropagation()}>
        <button className="pet-gallery-close" onClick={onClose}>×</button>
        <div className="pet-gallery-header">
          <h2>ペットギャラリー</h2>
          <p>これまでの成長の記録</p>
        </div>
        <div className="pet-gallery-items">
          {petLevels.map((pet) => {
            const isUnlocked = currentLevel >= pet.level;
            return (
              <div 
                key={pet.level}
                className={`pet-gallery-item ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="pet-gallery-image-container">
                  {isUnlocked ? (
                    <img 
                      src={pet.imagePath} 
                      alt={`レベル${pet.level}のペット`} 
                      className="pet-gallery-image"
                      onError={(e) => {
                        const basePath = import.meta.env.BASE_URL || '/';
                        e.currentTarget.src = `${basePath}images/pets/pet-default.png`;
                      }}
                    />
                  ) : (
                    <div className="pet-gallery-locked">
                      <span>?</span>
                    </div>
                  )}
                </div>
                <div className="pet-gallery-info">
                  <h3>レベル {pet.level}</h3>
                  {isUnlocked ? (
                    <p className="pet-gallery-message">{pet.message}</p>
                  ) : (
                    <p className="pet-gallery-locked-message">まだ見つかっていません</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PetGallery;