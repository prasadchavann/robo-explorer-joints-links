
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import JointsModule from '@/components/JointsModule';
import LinksModule from '@/components/LinksModule';
import ScoreSummary from '@/components/ScoreSummary';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scores, setScores] = useState({
    prismatic: null,
    revolute: null,
    spherical: null,
    rigid: null,
    soft: null
  });

  const totalQuestions = Object.keys(scores).length;
  const correctAnswers = Object.values(scores).filter(score => score === true).length;
  const answeredQuestions = Object.values(scores).filter(score => score !== null).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const updateScore = (module, isCorrect) => {
    setScores(prev => ({
      ...prev,
      [module]: isCorrect
    }));
  };

  const resetProgress = () => {
    setScores({
      prismatic: null,
      revolute: null,
      spherical: null,
      rigid: null,
      soft: null
    });
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🤖</div>
              <h1 className="text-xl font-bold text-blue-900">Vizuara AI Labs</h1>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'home' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('joints')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'joints' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Joints
              </button>
              <button
                onClick={() => setActiveTab('links')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'links' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Links
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Progress:</span>
                <Badge variant="outline" className="text-blue-700">
                  {correctAnswers}/{totalQuestions}
                </Badge>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-900 mb-4">
                🧭 Robotics Explorer: Joints & Links
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Learn the fundamental building blocks of robotic systems through interactive modules
              </p>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{answeredQuestions}/{totalQuestions} completed</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800">
                    <span className="text-2xl mr-3">🔗</span>
                    Joints Module
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Explore how joints enable movement in robotic systems. Learn about prismatic, revolute, and spherical joints through interactive examples.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Prismatic Joint</span>
                      <Badge variant={scores.prismatic === true ? "default" : scores.prismatic === false ? "destructive" : "secondary"}>
                        {scores.prismatic === true ? "✓" : scores.prismatic === false ? "✗" : "—"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revolute Joint</span>
                      <Badge variant={scores.revolute === true ? "default" : scores.revolute === false ? "destructive" : "secondary"}>
                        {scores.revolute === true ? "✓" : scores.revolute === false ? "✗" : "—"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Spherical Joint</span>
                      <Badge variant={scores.spherical === true ? "default" : scores.spherical === false ? "destructive" : "secondary"}>
                        {scores.spherical === true ? "✓" : scores.spherical === false ? "✗" : "—"}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('joints')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Start Joints Module
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-cyan-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-800">
                    <span className="text-2xl mr-3">🔗</span>
                    Links Module
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Understand the structural components that connect joints. Discover the differences between rigid and soft links in robotics.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rigid Links</span>
                      <Badge variant={scores.rigid === true ? "default" : scores.rigid === false ? "destructive" : "secondary"}>
                        {scores.rigid === true ? "✓" : scores.rigid === false ? "✗" : "—"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Soft Links</span>
                      <Badge variant={scores.soft === true ? "default" : scores.soft === false ? "destructive" : "secondary"}>
                        {scores.soft === true ? "✓" : scores.soft === false ? "✗" : "—"}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setActiveTab('links')}
                    className="w-full bg-cyan-600 hover:bg-cyan-700"
                  >
                    Start Links Module
                  </Button>
                </CardContent>
              </Card>
            </div>

            {answeredQuestions === totalQuestions && answeredQuestions > 0 && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="text-center py-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    🎉 Congratulations! You've completed all modules!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Final Score: {correctAnswers}/{totalQuestions} ({Math.round((correctAnswers/totalQuestions)*100)}%)
                  </p>
                  <Button 
                    onClick={() => setActiveTab('summary')}
                    className="bg-green-600 hover:bg-green-700 mr-4"
                  >
                    View Summary
                  </Button>
                  <Button 
                    onClick={resetProgress}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Restart Learning
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'joints' && (
          <JointsModule 
            scores={scores} 
            updateScore={updateScore}
            onNavigateToLinks={() => setActiveTab('links')}
          />
        )}

        {activeTab === 'links' && (
          <LinksModule 
            scores={scores} 
            updateScore={updateScore}
            onComplete={() => setActiveTab('summary')}
          />
        )}

        {activeTab === 'summary' && (
          <ScoreSummary 
            scores={scores}
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            onRestart={resetProgress}
            onReviewAnswers={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 <span className="font-semibold text-blue-600">Vizuara AI Labs</span> - Advancing Robotics Education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
