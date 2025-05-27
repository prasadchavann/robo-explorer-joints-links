
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const JointsModule = ({ scores, updateScore, onNavigateToLinks }) => {
  const [currentModule, setCurrentModule] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  const modules = [
    {
      id: 'prismatic',
      title: '📏 Prismatic Joint',
      description: 'A prismatic joint allows linear motion along one axis. Imagine a drawer sliding in and out or a telescopic antenna extending and retracting. This joint provides translational movement without any rotation, making it ideal for applications requiring precise linear positioning.',
      theory: 'In robotics, prismatic joints are commonly found in industrial automation systems where linear actuators move parts along assembly lines. The motion is constrained to a single axis, typically controlled by hydraulic cylinders, pneumatic actuators, or linear motors. This type of joint is essential in applications like 3D printers (Z-axis movement), robotic arms requiring reach extension, and automated manufacturing systems where precise linear positioning is crucial.',
      gifUrl: 'https://gepettoweb.laas.fr/hpp/pinocchio/doxygen-html/prismatic_laas.gif',
      question: 'Which of the following is an example of a prismatic joint?',
      options: [
        'Door hinge',
        'Sliding drawer',
        'Human knee',
        'Ball socket'
      ],
      correctAnswer: 1
    },
    {
      id: 'revolute',
      title: '🔁 Revolute Joint',
      description: 'A revolute joint enables rotational motion around a fixed axis. A good example is a door hinge or robotic elbow that can rotate but cannot translate. This is the most common type of joint in robotic systems.',
      theory: 'Revolute joints are fundamental in robotics because they mimic many natural movements found in biological systems. They consist of two links connected by a pin or shaft that allows rotation about a single axis. The range of motion can be limited by mechanical stops or controlled electronically. In robotic arms, multiple revolute joints work together to provide complex positioning capabilities. Examples include robotic shoulders, elbows, and wrists, where each joint contributes one degree of rotational freedom to the overall system.',
      gifUrl: 'https://gepettoweb.laas.fr/hpp/pinocchio/doxygen-html/revolute_laas.gif',
      question: 'What kind of motion does a revolute joint provide?',
      options: [
        'Rotation',
        'Linear translation',
        '3D pivoting',
        'Bending'
      ],
      correctAnswer: 0
    },
    {
      id: 'spherical',
      title: '🔮 Spherical Joint',
      description: 'A spherical joint allows 3D rotational motion, just like a ball-and-socket joint found in the human shoulder or hip. It allows pitch, yaw, and roll movements simultaneously, providing maximum rotational freedom.',
      theory: 'Spherical joints, also known as ball-and-socket joints, provide three degrees of rotational freedom around a single point. This makes them incredibly versatile for applications requiring complex orientation changes. In robotics, they are used in applications like robotic hands and arms where natural, fluid motion is required. The joint consists of a spherical surface (ball) that rotates within a matching curved surface (socket). While they offer great flexibility, they are more complex to control and manufacture compared to simpler joint types.',
      gifUrl: 'https://gepettoweb.laas.fr/hpp/pinocchio/doxygen-html/spherical_laas.gif',
      question: 'Which part of the human body best represents a spherical joint?',
      options: [
        'Elbow',
        'Shoulder',
        'Knee',
        'Wrist'
      ],
      correctAnswer: 1
    }
  ];

  const currentModuleData = modules[currentModule - 1];

  const handleAnswerSubmit = () => {
    const selectedAnswer = selectedAnswers[currentModuleData.id];
    const isCorrect = selectedAnswer === currentModuleData.correctAnswer;
    
    updateScore(currentModuleData.id, isCorrect);
    setShowFeedback({
      ...showFeedback,
      [currentModuleData.id]: {
        show: true,
        correct: isCorrect,
        selectedAnswer: selectedAnswer,
        correctAnswer: currentModuleData.correctAnswer
      }
    });
  };

  const handleNextModule = () => {
    if (currentModule < 3) {
      setCurrentModule(currentModule + 1);
    } else {
      onNavigateToLinks();
    }
  };

  const isAnswered = selectedAnswers[currentModuleData.id] !== undefined;
  const hasSubmitted = showFeedback[currentModuleData.id]?.show;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">🔗 Joints Learning Module</h1>
        <div className="flex justify-center space-x-2 mb-6">
          {modules.map((_, index) => (
            <Badge 
              key={index}
              variant={currentModule > index + 1 ? "default" : currentModule === index + 1 ? "destructive" : "secondary"}
              className="px-3 py-1"
            >
              {index + 1}
            </Badge>
          ))}
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 flex items-center justify-between">
            {currentModuleData.title}
            <Badge variant="outline">Module {currentModule}/3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Description:</h3>
            <p className="text-blue-800">{currentModuleData.description}</p>
          </div>

          {/* Theory */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Theory:</h3>
            <p className="text-gray-700 leading-relaxed">{currentModuleData.theory}</p>
          </div>

          {/* GIF Demo */}
          <div className="text-center bg-white border-2 border-dashed border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Visual Demonstration:</h3>
            <img 
              src={currentModuleData.gifUrl} 
              alt={`${currentModuleData.title} demonstration`}
              className="mx-auto max-w-full h-auto rounded-lg shadow-md"
              style={{ maxHeight: '300px' }}
            />
          </div>

          {/* Quiz */}
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-4 flex items-center">
              <span className="text-xl mr-2">🧠</span>
              Knowledge Check:
            </h3>
            <p className="text-yellow-800 mb-4 font-medium">{currentModuleData.question}</p>
            
            <RadioGroup
              value={selectedAnswers[currentModuleData.id]?.toString() || ""}
              onValueChange={(value) => setSelectedAnswers({
                ...selectedAnswers,
                [currentModuleData.id]: parseInt(value)
              })}
              className="space-y-3"
            >
              {currentModuleData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer p-2 rounded hover:bg-yellow-100"
                  >
                    {option}
                  </Label>
                  {hasSubmitted && (
                    <div className="ml-2">
                      {index === currentModuleData.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : index === selectedAnswers[currentModuleData.id] && selectedAnswers[currentModuleData.id] !== currentModuleData.correctAnswer ? (
                        <XCircle className="h-5 w-5 text-red-600" />
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>

            {hasSubmitted && (
              <div className={`mt-4 p-3 rounded-lg ${
                showFeedback[currentModuleData.id]?.correct 
                  ? 'bg-green-100 border border-green-300' 
                  : 'bg-red-100 border border-red-300'
              }`}>
                <p className={`font-semibold ${
                  showFeedback[currentModuleData.id]?.correct 
                    ? 'text-green-800' 
                    : 'text-red-800'
                }`}>
                  {showFeedback[currentModuleData.id]?.correct 
                    ? '✅ Correct! Well done!' 
                    : `❌ Incorrect. The correct answer is: ${currentModuleData.options[currentModuleData.correctAnswer]}`
                  }
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {!hasSubmitted ? (
                <Button 
                  onClick={handleAnswerSubmit}
                  disabled={!isAnswered}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  ✅ Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextModule}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center"
                >
                  {currentModule < 3 ? (
                    <>
                      ➡️ Next Module
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    '🔗 Continue to Links Module'
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JointsModule;
