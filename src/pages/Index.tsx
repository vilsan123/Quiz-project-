
import { useState } from 'react';
import { QuizSetup } from '@/components/QuizSetup';
import { QuizGame } from '@/components/QuizGame';
import { QuizResults } from '@/components/QuizResults';
import { Question, QuizConfig, QuizResult } from '@/types/quiz';
import { generateQuestions } from '@/utils/questionGenerator';

export type GameState = 'setup' | 'playing' | 'results';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = (config: QuizConfig) => {
    const generatedQuestions = generateQuestions(config);
    setQuizConfig(config);
    setQuestions(generatedQuestions);
    setGameState('playing');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setGameState('results');
  };

  const handleRestart = () => {
    setGameState('setup');
    setQuizConfig(null);
    setQuestions([]);
    setQuizResult(null);
  };

  const handlePlayAgain = () => {
    if (quizConfig) {
      const generatedQuestions = generateQuestions(quizConfig);
      setQuestions(generatedQuestions);
      setGameState('playing');
      setQuizResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quiz Master
          </h1>
          <p className="text-xl text-purple-200">
            Test your knowledge across multiple categories and difficulty levels
          </p>
        </div>

        {gameState === 'setup' && (
          <QuizSetup onStartQuiz={handleStartQuiz} />
        )}

        {gameState === 'playing' && questions.length > 0 && quizConfig && (
          <QuizGame 
            questions={questions} 
            config={quizConfig}
            onComplete={handleQuizComplete} 
          />
        )}

        {gameState === 'results' && quizResult && (
          <QuizResults 
            result={quizResult} 
            onRestart={handleRestart}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
