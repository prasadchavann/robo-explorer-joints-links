
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, RefreshCw, BookOpen, CheckCircle, XCircle } from 'lucide-react';

const ScoreSummary = ({ scores, totalQuestions, correctAnswers, onRestart, onReviewAnswers }) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const getGradeInfo = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50', message: 'Excellent work!' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50', message: 'Good job!' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50', message: 'Keep learning!' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-50', message: 'More practice needed' };
  };

  const gradeInfo = getGradeInfo(percentage);

  const moduleDetails = [
    { id: 'prismatic', name: '📏 Prismatic Joint', section: 'Joints' },
    { id: 'revolute', name: '🔁 Revolute Joint', section: 'Joints' },
    { id: 'spherical', name: '🔮 Spherical Joint', section: 'Joints' },
    { id: 'rigid', name: '🪵 Rigid Links', section: 'Links' },
    { id: 'soft', name: '🪢 Soft Links', section: 'Links' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">📊 Learning Summary</h1>
        <p className="text-gray-600">Review your performance across all modules</p>
      </div>

      {/* Overall Score Card */}
      <Card className={`${gradeInfo.bg} border-2`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-3">
            <Trophy className={`h-8 w-8 ${gradeInfo.color}`} />
            <span className={`text-3xl font-bold ${gradeInfo.color}`}>
              Grade: {gradeInfo.grade}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Overall Score</span>
              <span>{correctAnswers} out of {totalQuestions} correct</span>
            </div>
            <Progress value={percentage} className="h-4" />
            <p className={`text-xl font-semibold ${gradeInfo.color}`}>
              {percentage}% - {gradeInfo.message}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">📋 Detailed Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moduleDetails.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-4 rounded-lg border bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {scores[module.id] === true ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : scores[module.id] === false ? (
                      <XCircle className="h-6 w-6 text-red-600" />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-gray-300" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{module.name}</p>
                    <p className="text-sm text-gray-600">{module.section} Module</p>
                  </div>
                </div>
                <Badge 
                  variant={scores[module.id] === true ? "default" : scores[module.id] === false ? "destructive" : "secondary"}
                  className="px-3 py-1"
                >
                  {scores[module.id] === true ? "Correct" : scores[module.id] === false ? "Incorrect" : "Not Answered"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800 flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {percentage >= 80 && (
              <p className="text-blue-800">
                🎉 <strong>Excellent understanding!</strong> You've mastered the fundamentals of joints and links in robotics.
              </p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-blue-800">
                👍 <strong>Good progress!</strong> You have a solid foundation. Consider reviewing the concepts you missed.
              </p>
            )}
            {percentage < 60 && (
              <p className="text-blue-800">
                📚 <strong>Keep learning!</strong> Consider going through the modules again to strengthen your understanding.
              </p>
            )}
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-3 rounded border">
                <h4 className="font-semibold text-blue-900 mb-1">Joints Module</h4>
                <p className="text-sm text-blue-700">
                  {[scores.prismatic, scores.revolute, scores.spherical].filter(s => s === true).length}/3 correct
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <h4 className="font-semibold text-blue-900 mb-1">Links Module</h4>
                <p className="text-sm text-blue-700">
                  {[scores.rigid, scores.soft].filter(s => s === true).length}/2 correct
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={onReviewAnswers}
          variant="outline"
          className="flex items-center space-x-2 border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          <BookOpen className="h-4 w-4" />
          <span>Review Modules</span>
        </Button>
        <Button 
          onClick={onRestart}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Restart Learning</span>
        </Button>
      </div>

      {/* Encouragement Message */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="text-center py-6">
          <p className="text-purple-800 font-medium">
            🚀 Great job completing the Robotics Explorer course! 
            Keep exploring the fascinating world of robotics and engineering.
          </p>
          <p className="text-purple-600 text-sm mt-2">
            Ready to dive deeper? Consider exploring advanced topics in robot kinematics and dynamics!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreSummary;
