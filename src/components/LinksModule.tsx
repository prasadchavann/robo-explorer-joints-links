
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const LinksModule = ({ scores, updateScore, onComplete }) => {
  const [currentModule, setCurrentModule] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  const modules = [
    {
      id: 'rigid',
      title: '🪵 Rigid Links',
      description: 'A rigid link does not deform under normal conditions. Most metal arms in industrial robots are rigid links. They preserve distance between joints and maintain structural integrity.',
      theory: 'Rigid links are the backbone of most robotic systems, providing structural stability and precise positioning. Made from materials like steel, aluminum, or carbon fiber, they maintain their shape under normal operating loads. In industrial robotics, rigid links ensure repeatability and accuracy in manufacturing processes. They are designed to withstand forces, torques, and vibrations without deformation. The stiffness of rigid links allows for precise control of end-effector positioning, making them ideal for applications requiring high precision such as welding, assembly, and machining operations.',
      gifUrl: 'https://hiro-group.ronc.one/img/research/roboskin/flacco_body_after.gif',
      question: 'What is the key feature of a rigid link?',
      options: [
        'Does not bend or stretch',
        'Can compress and expand',
        'Made of rubber',
        'Used in soft robots only'
      ],
      correctAnswer: 0
    },
    {
      id: 'soft',
      title: '🪢 Soft Links',
      description: 'Soft links can deform, stretch, or bend, and are often found in soft robotics. These allow more flexible, adaptable movement for safe human interaction or delicate tasks.',
      theory: 'Soft links represent a revolutionary approach in robotics, inspired by biological systems like octopus tentacles and elephant trunks. Made from materials like silicone, rubber, or other elastomers, they can safely interact with humans and handle delicate objects. Soft links enable robots to navigate complex environments, squeeze through tight spaces, and adapt their shape to different tasks. They are particularly valuable in medical robotics, food handling, and service robotics where safety and adaptability are paramount. Control of soft links is more complex than rigid links, often requiring advanced algorithms and sensors.',
      gifUrl: 'https://s.wsj.net/public/resources/images/BN-XU139_201803_E_20180308153138.gif',
      question: 'Which field benefits most from soft links?',
      options: [
        'Industrial welding',
        'Human-robot interaction',
        'Drone propulsion',
        'Hard shell manufacturing'
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
    if (currentModule < 2) {
      setCurrentModule(currentModule + 1);
    } else {
      onComplete();
    }
  };

  const isAnswered = selectedAnswers[currentModuleData.id] !== undefined;
  const hasSubmitted = showFeedback[currentModuleData.id]?.show;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-cyan-900 mb-2">🔗 Links Learning Module</h1>
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
          <CardTitle className="text-2xl text-cyan-800 flex items-center justify-between">
            {currentModuleData.title}
            <Badge variant="outline">Module {currentModule}/2</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          <div className="bg-cyan-50 p-4 rounded-lg">
            <h3 className="font-semibold text-cyan-900 mb-2">Description:</h3>
            <p className="text-cyan-800">{currentModuleData.description}</p>
          </div>

          {/* Theory */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Theory:</h3>
            <p className="text-gray-700 leading-relaxed">{currentModuleData.theory}</p>
          </div>

          {/* GIF Demo */}
          <div className="text-center bg-white border-2 border-dashed border-cyan-200 rounded-lg p-6">
            <h3 className="font-semibold text-cyan-900 mb-4">Visual Demonstration:</h3>
            <img 
              src={currentModuleData.gifUrl} 
              alt={`${currentModuleData.title} demonstration`}
              className="mx-auto max-w-full h-auto rounded-lg shadow-md"
              style={{ maxHeight: '300px' }}
            />
          </div>

          {/* Quiz */}
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-4 flex items-center">
              <span className="text-xl mr-2">🧠</span>
              Knowledge Check:
            </h3>
            <p className="text-orange-800 mb-4 font-medium">{currentModuleData.question}</p>
            
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
                    className="flex-1 cursor-pointer p-2 rounded hover:bg-orange-100"
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
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  ✅ Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextModule}
                  className="bg-cyan-600 hover:bg-cyan-700 flex items-center"
                >
                  {currentModule < 2 ? (
                    <>
                      ➡️ Next Module
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    '🏁 Finish & View Results'
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

export default LinksModule;
