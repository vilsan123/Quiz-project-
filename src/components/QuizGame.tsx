
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question, QuizConfig, QuizResult, UserAnswer } from '@/types/quiz';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface QuizGameProps {
  questions: Question[];
  config: QuizConfig;
  onComplete: (result: QuizResult) => void;
}

export const QuizGame = ({ questions, config, onComplete }: QuizGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(config.timePerQuestion);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setTimeLeft(config.timePerQuestion);
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [currentQuestionIndex, config.timePerQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswerSubmit();
    }
  }, [timeLeft, showFeedback]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleAnswerSubmit = () => {
    const timeSpent = Date.now() - questionStartTime;
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer ?? -1,
      isCorrect: selectedAnswer === currentQuestion.correctAnswer,
      timeSpent: timeSpent / 1000,
    };

    setUserAnswers([...userAnswers, answer]);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        completeQuiz([...userAnswers, answer]);
      }
    }, 2000);
  };

  const completeQuiz = (answers: UserAnswer[]) => {
    const score = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((score / questions.length) * 100);
    const totalTime = answers.reduce((sum, a) => sum + a.timeSpent, 0);

    const result: QuizResult = {
      score,
      totalQuestions: questions.length,
      percentage,
      answers,
      questions,
      totalTime,
    };

    onComplete(result);
  };

  const getTimeColor = () => {
    if (timeLeft > config.timePerQuestion * 0.5) return 'text-green-400';
    if (timeLeft > config.timePerQuestion * 0.25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getOptionClassName = (index: number) => {
    let baseClass = "p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer text-left";
    
    if (!showFeedback) {
      if (selectedAnswer === index) {
        return `${baseClass} border-purple-500 bg-purple-500/20 text-white`;
      }
      return `${baseClass} border-white/20 bg-white/10 text-white hover:border-purple-400 hover:bg-purple-400/10`;
    }

    if (index === currentQuestion.correctAnswer) {
      return `${baseClass} border-green-500 bg-green-500/20 text-green-100`;
    }
    
    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return `${baseClass} border-red-500 bg-red-500/20 text-red-100`;
    }
    
    return `${baseClass} border-white/20 bg-white/10 text-white/60`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardDescription className="text-purple-200">
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardDescription>
            <div className={`flex items-center gap-2 text-xl font-bold ${getTimeColor()}`}>
              <Clock className="h-5 w-5" />
              {timeLeft}s
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-2xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={getOptionClassName(index)}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option}</span>
                  {showFeedback && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  )}
                  {showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-6 w-6 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {showFeedback && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
              <p className="text-blue-100">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
            </div>
          )}

          {!showFeedback && (
            <Button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-bold rounded-xl transition-all duration-300"
            >
              Submit Answer
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
