import React from 'react';
import { Link } from 'react-router-dom';

// Animation Components
import TrueFocus from './animations/TrueFocus';
import LiquidEther from './animations/LiquidEther';
import ShuffleText from './animations/ShuffleText';
import ScrollStack, { ScrollStackItem } from './animations/ScrollStack';

import './LandingPage.css';

const cardData = [
  {
    id: 1,
    AnimationComponent: ShuffleText, // Use ShuffleText for this card
    heading: ' Wanna talk? ',
    description: 'Talk through your thoughts in a safe and private space.',
    link: '/chat',
  },
  {
    id: 2,
    AnimationComponent: ShuffleText, // Use FadeUpText for this one!
    heading: 'Daily Mood Log',
    description: 'Quickly check in with your emotions to track your journey.',
    link: '/log-mood',
  },
  {
    id: 3,
    AnimationComponent: ShuffleText, // Back to ShuffleText
    heading: 'Guided Meditations',
    description: 'Access a library of guided sessions to find calm and focus.',
    link: null, // No link for this card
  },
  {
    id: 4,
    AnimationComponent: ShuffleText, // And FadeUpText again
    heading: 'Track Your Progress',
    description: 'Visualize your mood patterns and celebrate your growth.',
    link: null,
  },
];



const LandingPage: React.FC = () => {
  return (
    <div className="landing-container-scrolling">
      <div className="page-background">
        <LiquidEther colors={['#63B3ED', '#5227FF', '#FF9FFC']} />
      </div>

      <div className="content-wrapper">
        <div className="hero-section">
          <div className="hero-content">
            <TrueFocus
              sentence="Welcome! How can I help you today?"
              borderColor="#63B3ED"
              blurAmount={3}
            />
          </div>
          <div className="scroll-down-indicator">↓</div>
        </div>

       

        <div className="scroll-stack-container">
          <ScrollStack
            itemDistance={20}
            rotationAmount={5}
            blurAmount={3}
            useWindowScroll={true}
          >
           {cardData.map((card) => {
              const CardHeadingComponent = card.AnimationComponent;

              const cardContent = (
                <>
                  <CardHeadingComponent className="card-heading" text={card.heading} />
                  <p>{card.description}</p>
                </>
              );

              return (
                <ScrollStackItem key={card.id}>
                  {card.link ? (
                    <Link to={card.link}>{cardContent}</Link>
                  ) : (
                    <div>{cardContent}</div>
                  )}
                </ScrollStackItem>
              );
            })} 
          </ScrollStack>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;