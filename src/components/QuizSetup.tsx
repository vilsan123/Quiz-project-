
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { QuizConfig } from '@/types/quiz';
import { Brain, Clock, Target, Play } from 'lucide-react';

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

export const QuizSetup = ({ onStartQuiz }: QuizSetupProps) => {
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState([10]);
  const [timePerQuestion, setTimePerQuestion] = useState([30]);

  const categories = [
    { value: 'general', label: 'General Knowledge' },
    { value: 'science', label: 'Science & Technology' },
    { value: 'history', label: 'History' },
    { value: 'sports', label: 'Sports' },
  ];

  const handleStartQuiz = () => {
    if (!category) return;
    
    const config: QuizConfig = {
      category,
      difficulty,
      numberOfQuestions: numberOfQuestions[0],
      timePerQuestion: timePerQuestion[0],
    };
    
    onStartQuiz(config);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quiz Configuration
          </CardTitle>
          <CardDescription className="text-purple-200">
            Customize your quiz experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <label className="text-lg font-semibold">Category</label>
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="text-white hover:bg-gray-800">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-400" />
              <label className="text-lg font-semibold">Difficulty</label>
            </div>
            <Select value={difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficulty(value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="easy" className="text-white hover:bg-gray-800">Easy</SelectItem>
                <SelectItem value="medium" className="text-white hover:bg-gray-800">Medium</SelectItem>
                <SelectItem value="hard" className="text-white hover:bg-gray-800">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-lg font-semibold">Number of Questions: {numberOfQuestions[0]}</label>
            <Slider
              value={numberOfQuestions}
              onValueChange={setNumberOfQuestions}
              max={20}
              min={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-purple-300">
              <span>5</span>
              <span>20</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <label className="text-lg font-semibold">Time per Question: {timePerQuestion[0]}s</label>
            </div>
            <Slider
              value={timePerQuestion}
              onValueChange={setTimePerQuestion}
              max={60}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-purple-300">
              <span>10s</span>
              <span>60s</span>
            </div>
          </div>

          <Button 
            onClick={handleStartQuiz} 
            disabled={!category}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
