
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizResult } from '@/types/quiz';
import { Trophy, RotateCcw, Play, Clock, Target, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onPlayAgain: () => void;
}

export const QuizResults = ({ result, onRestart, onPlayAgain }: QuizResultsProps) => {
  const [showReview, setShowReview] = useState(false);

  const getScoreColor = () => {
    if (result.percentage >= 80) return 'text-green-400';
    if (result.percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    if (result.percentage >= 90) return 'Outstanding! You\'re a quiz master!';
    if (result.percentage >= 80) return 'Excellent work! You know your stuff!';
    if (result.percentage >= 70) return 'Good job! Well done!';
    if (result.percentage >= 60) return 'Not bad! Keep studying!';
    return 'Keep practicing, you\'ll improve!';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-400" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quiz Complete!
          </CardTitle>
          <CardDescription className="text-xl text-purple-200">
            {getScoreMessage()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {result.percentage}%
            </div>
            <div className="text-2xl text-white">
              {result.score} out of {result.totalQuestions} correct
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-semibold">Accuracy</div>
              <div className="text-2xl font-bold text-purple-300">{result.percentage}%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-semibold">Total Time</div>
              <div className="text-2xl font-bold text-blue-300">{formatTime(result.totalTime)}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-semibold">Correct</div>
              <div className="text-2xl font-bold text-green-300">{result.score}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setShowReview(!showReview)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-bold rounded-xl transition-all duration-300"
            >
              {showReview ? 'Hide' : 'Review'} Answers
            </Button>
            <Button
              onClick={onPlayAgain}
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 text-lg font-bold rounded-xl transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Play Again
            </Button>
            <Button
              onClick={onRestart}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-bold rounded-xl transition-all duration-300"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              New Quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      {showReview && (
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Answer Review</CardTitle>
            <CardDescription className="text-purple-200">
              Review your answers and learn from explanations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.questions.map((question, index) => {
              const userAnswer = result.answers[index];
              const isCorrect = userAnswer.isCorrect;
              
              return (
                <div key={question.id} className="border border-white/20 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        Question {index + 1}: {question.question}
                      </h3>
                      <div className="space-y-2">
                        <div className="text-green-300">
                          <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                        </div>
                        {userAnswer.selectedAnswer !== -1 && (
                          <div className={isCorrect ? 'text-green-300' : 'text-red-300'}>
                            <strong>Your Answer:</strong> {question.options[userAnswer.selectedAnswer]}
                          </div>
                        )}
                        {userAnswer.selectedAnswer === -1 && (
                          <div className="text-red-300">
                            <strong>Your Answer:</strong> No answer selected (time expired)
                          </div>
                        )}
                        <div className="text-purple-300">
                          <strong>Time Spent:</strong> {formatTime(userAnswer.timeSpent)}
                        </div>
                      </div>
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-500/20 border border-blue-400/30 rounded">
                          <strong className="text-blue-300">Explanation:</strong>
                          <p className="text-blue-100 mt-1">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
