// src/MoodLogger.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations
import ReactConfetti from 'react-confetti'; // For the confetti!
import './MoodLogger.css';

// 1. Create a more detailed data structure for our moods
const moods = [
  { emoji: '😄', label: 'Great', prompt: "Awesome! What's making you feel great?" },
  { emoji: '🙂', label: 'Good', prompt: 'Happy to hear it. Anything specific?' },
  { emoji: '😐', label: 'Okay', prompt: 'Just okay? Feel free to write it down.' },
  { emoji: '😕', label: 'Not Good', prompt: "I'm sorry to hear that. What's on your mind?" },
  { emoji: '😞', label: 'Bad', prompt: 'Take a deep breath. I am here to listen.' },
];

const MoodLogger: React.FC = () => {
  // Store the entire selected mood object, not just the emoji
  const [selectedMood, setSelectedMood] = useState<(typeof moods)[0] | null>(null);
  const [note, setNote] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    if (!selectedMood) return;

    // 2. Trigger confetti for positive moods
    if (selectedMood.label === 'Great' || selectedMood.label === 'Good') {
      setShowConfetti(true);
    }
    
    console.log('Saved Mood:', selectedMood.label, 'Note:', note);
    // Use a timeout to let the user see the confetti before navigating
    setTimeout(() => {
      navigate('/');
    }, 2500); // 2.5 seconds
  };

  // Turn off confetti after it runs
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000); // Confetti lasts 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);


  return (
    <div className="mood-logger-container">
      {/* Add the Confetti component at the top */}
      <ReactConfetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={showConfetti ? 200 : 0}
        recycle={false}
      />
      
      {/* 3. The heading is now dynamic */}
      <h2>{selectedMood ? selectedMood.prompt : 'How are you feeling right now?'}</h2>
      
      <div className="emoji-selector">
        {moods.map((mood) => (
          // 4. Use motion.span for animations
          <motion.span
            key={mood.label}
            className={`emoji ${selectedMood && selectedMood.label !== mood.label ? 'faded' : ''}`}
            onClick={() => setSelectedMood(mood)}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 1.4 }}
            animate={{ scale: selectedMood?.label === mood.label ? 1.2 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {mood.emoji}
          </motion.span>
        ))}
      </div>
      <textarea
        placeholder="Want to add a note? (Optional)"
        value={note}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
      />
      <button onClick={handleSave} disabled={!selectedMood}>
        Save Mood
      </button>
    </div>
  );
};

export default MoodLogger;