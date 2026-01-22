import { useState, useEffect, useRef } from 'react';

type TypingConfig = {
  baseDelay?: number;      // Base delay between characters (ms)
  variance?: number;       // Random variance to add (ms)
  wordPauseChance?: number; // Chance to pause after a word (0-1)
  wordPauseDelay?: number;  // Extra delay when pausing after word
  punctuationDelay?: number; // Extra delay after punctuation
};

const defaultConfig: TypingConfig = {
  baseDelay: 15,
  variance: 25,
  wordPauseChance: 0.1,
  wordPauseDelay: 80,
  punctuationDelay: 120,
};

export function useTypingEffect(
  fullText: string,
  isTyping: boolean,
  config: TypingConfig = {}
) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const lastFullTextRef = useRef('');
  
  const {
    baseDelay,
    variance,
    wordPauseChance,
    wordPauseDelay,
    punctuationDelay,
  } = { ...defaultConfig, ...config };

  useEffect(() => {
    // If full text changed and we have more content, continue from where we were
    if (fullText !== lastFullTextRef.current) {
      lastFullTextRef.current = fullText;
      
      // If this is a reset (shorter text), reset everything
      if (fullText.length < displayedText.length) {
        indexRef.current = 0;
        setDisplayedText('');
        setIsComplete(false);
      }
    }

    if (!isTyping || indexRef.current >= fullText.length) {
      if (indexRef.current >= fullText.length && fullText.length > 0) {
        setIsComplete(true);
      }
      return;
    }

    const getNextDelay = (char: string, nextChar: string | undefined): number => {
      let delay = baseDelay! + Math.random() * variance!;
      
      // Punctuation gets extra pause
      if (['.', '!', '?', ',', ';', ':'].includes(char)) {
        delay += punctuationDelay!;
      }
      
      // Chance to pause after completing a word
      if (char === ' ' && Math.random() < wordPauseChance!) {
        delay += wordPauseDelay!;
      }
      
      // Newlines get a natural pause
      if (char === '\n') {
        delay += wordPauseDelay! * 1.5;
      }
      
      return delay;
    };

    const currentChar = fullText[indexRef.current];
    const nextChar = fullText[indexRef.current + 1];
    const delay = getNextDelay(currentChar, nextChar);

    const timer = setTimeout(() => {
      indexRef.current += 1;
      setDisplayedText(fullText.slice(0, indexRef.current));
    }, delay);

    return () => clearTimeout(timer);
  }, [fullText, displayedText, isTyping, baseDelay, variance, wordPauseChance, wordPauseDelay, punctuationDelay]);

  // Reset when starting a new message
  const reset = () => {
    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);
    lastFullTextRef.current = '';
  };

  return { displayedText, isComplete, reset };
}
