import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './assets/components/ui/card.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './assets/components/ui/select.jsx';
import { Input } from './assets/components/ui/input.jsx';
import { Printer, Download, RefreshCw, CheckCircle, XCircle, Plus, Trash2 } from './assets/components/ui/alert.jsx';
import { Badge } from './assets/components/ui/badge.jsx';

const WorksheetGenerator = () => {
    const [subject, setSubject] = useState('english');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [questionType, setQuestionType] = useState('mixed');
    const [worksheetContent, setWorksheetContent] = useState(null);
    const [answers, setAnswers] = useState({ });
    const [feedback, setFeedback] = useState(null);
    const [mode, setMode] = useState('practice');
    const [totalQuestions, setTotalQuestions] = useState(10);

    // Curriculum topics based on UK National Curriculum
    const curriculumTopics = {
        english: {
        'Reading Comprehension': [
    'Identifying themes and conventions',
    'Making inferences',
    'Understanding vocabulary',
    'Summarizing main ideas'
    ],
    'Grammar and Punctuation': [
    'Nouns, adjectives and pronouns',
    'Verb tenses',
    'Punctuation marks',
    'Sentence types'
    ],
    'Writing Composition': [
    'Narrative writing',
    'Descriptive writing',
    'Persuasive writing',
    'Report writing'
    ],
    'Spelling': [
    'Common exception words',
    'Prefixes and suffixes',
    'Homophones',
    'Silent letters'
    ]
    },
    maths: {
        'Number and Place Value': [
    'Reading and writing numbers',
    'Ordering and comparing',
    'Rounding numbers',
    'Negative numbers'
    ],
    'Addition and Subtraction': [
    'Mental calculations',
    'Column method',
    'Problem solving',
    'Estimating'
    ],
    'Multiplication and Division': [
    'Times tables',
    'Long multiplication',
    'Long division',
    'Factor pairs'
    ],
    'Fractions': [
    'Equivalent fractions',
    'Adding and subtracting',
    'Multiplying fractions',
    'Converting fractions'
    ],
    'Measurement': [
    'Length and height',
    'Mass and weight',
    'Time',
    'Money'
    ],
    'Geometry': [
    '2D shapes',
    '3D shapes',
    'Angles',
    'Position and direction'
    ]
    }
  };

    // Topic Selection Component
    const TopicSelector = ({index}) => {
    const handleTopicChange = (newTopic) => {
      const updatedTopics = [...selectedTopics];
    updatedTopics[index] = {topic: newTopic, subtopics: [] };
    setSelectedTopics(updatedTopics);
    };

    const handleSubtopicChange = (subtopic) => {
      const updatedTopics = [...selectedTopics];
    const currentSubtopics = updatedTopics[index].subtopics;

    if (currentSubtopics.includes(subtopic)) {
        updatedTopics[index].subtopics = currentSubtopics.filter(st => st !== subtopic);
      } else {
        updatedTopics[index].subtopics = [...currentSubtopics, subtopic];
      }
    setSelectedTopics(updatedTopics);
    };

    return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
        <div className="flex justify-between items-center">
            <h3 className="font-medium">Topic {index + 1}</h3>
            {index > 0 && (
                <button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        setSelectedTopics(topics => topics.filter((_, i) => i !== index));
                    }}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            )}
        </div>

        <Select
            value={selectedTopics[index]?.topic || ''}
            onValueChange={handleTopicChange}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
                {Object.keys(curriculumTopics[subject]).map((topic) => (
                    <SelectItem key={topic} value={topic}>
                        {topic}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

        {selectedTopics[index]?.topic && (
            <div className="flex flex-wrap gap-2">
                {curriculumTopics[subject][selectedTopics[index].topic].map((subtopic) => (
                    <Badge
                        key={subtopic}
                        variant={selectedTopics[index].subtopics.includes(subtopic) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleSubtopicChange(subtopic)}
                    >
                        {subtopic}
                    </Badge>
                ))}
            </div>
        )}
    </div>
    );
  };

  // Question generator functions
  const generateQuestions = () => {
        let allQuestions = [];

    // Calculate questions per topic
    const questionsPerTopic = Math.floor(totalQuestions / selectedTopics.length);
    let remainingQuestions = totalQuestions % selectedTopics.length;

    selectedTopics.forEach((topicSelection) => {
      const {topic, subtopics} = topicSelection;
      let topicQuestions = questionsPerTopic + (remainingQuestions > 0 ? 1 : 0);
    remainingQuestions--;

    // Generate questions for each subtopic
    const questionsPerSubtopic = Math.ceil(topicQuestions / subtopics.length);
      
      subtopics.forEach((subtopic) => {
        for (let i = 0; i < questionsPerSubtopic; i++) {
          if (subject === 'maths') {
            const question = generateMathQuestion(topic, subtopic, questionType);
    if (question) allQuestions.push({...question, topic, subtopic});
          } else {
            const question = generateEnglishQuestion(topic, subtopic);
    if (question) allQuestions.push({...question, topic, subtopic});
          }
        }
      });
    });

    // Trim to exact number of questions needed and shuffle
    allQuestions = allQuestions.slice(0, totalQuestions);
    allQuestions.sort(() => Math.random() - 0.5);

    return allQuestions;
  };

  const generateMathQuestion = (topic, subtopic, type) => {
    // Example implementation for multiplication
    if (topic === 'Multiplication and Division' && subtopic === 'Times tables') {
      if (type === 'arithmetic' || (type === 'mixed' && Math.random() > 0.5)) {
        const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    return {
        question: `Calculate: ${num1} × ${num2} = _____`,
    answer: `${num1 * num2}`,
    criteria: 'Correct multiplication showing working out if needed.'
        };
      } else {
        const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    const items = ['apples', 'books', 'pencils', 'stickers', 'sweets'];
    const item = items[Math.floor(Math.random() * items.length)];
    return {
        question: `If one box contains ${num1} ${item}, how many ${item} are there in ${num2} boxes?`,
    answer: `${num1 * num2}`,
    criteria: 'Correct multiplication and clear working out.'
        };
      }
    }
    // Add more topic/subtopic specific generators
    return null;
  };

  const generateEnglishQuestion = (topic, subtopic) => {
    if (topic === 'Grammar and Punctuation') {
      if (subtopic === 'Verb tenses') {
        const sentences = [
    {
        question: "Complete with the correct verb tense: Yesterday, I ___ (go) to the park.",
    answer: "went",
    criteria: "Correct past simple tense"
          },
    {
        question: "Complete with the correct verb tense: Right now, she ___ (study) for her exam.",
    answer: "is studying",
    criteria: "Correct present continuous tense"
          }
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
      }
    }
    // Add more topic/subtopic specific generators
    return null;
  };

  const generateWorksheet = () => {
    const questions = generateQuestions();
    setWorksheetContent([{questions}]);
    setAnswers({ });
    setFeedback(null);
    setMode('practice');
  };

    return (
    <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Multi-Topic UK SATs Worksheet Generator</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {/* Subject Selection */}
                    <div className="flex gap-4 items-center">
                        <Select
                            value={subject}
                            onValueChange={(value) => {
                                setSubject(value);
                                setSelectedTopics([{ topic: '', subtopics: [] }]);
                            }}
                        >
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="maths">Mathematics</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Question count input */}
                        <Input
                            type="number"
                            min="1"
                            max="20"
                            value={totalQuestions}
                            onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 10)}
                            className="w-32"
                            placeholder="Questions"
                        />
                    </div>

                    {/* Question Type Selection (Maths only) */}
                    {subject === 'maths' && (
                        <Select value={questionType} onValueChange={setQuestionType}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Question type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="arithmetic">Arithmetic only</SelectItem>
                                <SelectItem value="word">Word problems only</SelectItem>
                                <SelectItem value="mixed">Mixed questions</SelectItem>
                            </SelectContent>
                        </Select>
                    )}

                    {/* Topic Selectors */}
                    <div className="space-y-4">
                        {selectedTopics.map((_, index) => (
                            <TopicSelector key={index} index={index} />
                        ))}
                    </div>

                    {/* Add Topic Button */}
                    <button
                        variant="outline"
                        onClick={() => setSelectedTopics([...selectedTopics, { topic: '', subtopics: [] }])}
                        className="w-full"
                        disabled={selectedTopics.length >= 5}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Topic
                    </button>

                    {/* Generate Button */}
                    <button
                        onClick={generateWorksheet}
                        className="flex items-center gap-2 w-fit"
                        disabled={!selectedTopics.some(t => t.topic && t.subtopics.length > 0)}
                    >
                        <RefreshCw className="w-4 h-4" />
                        Generate Worksheet
                    </button>
                </div>
            </CardContent>
        </Card>

        {/* Worksheet Display */}
        {worksheetContent && worksheetContent[0].questions.length > 0 && (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{subject} Mixed Topics Worksheet</CardTitle>
                    <div className="flex gap-2">
                        <button variant="outline" className="flex items-center gap-2">
                            <Printer className="w-4 h-4" />
                            Print
                        </button>
                        <button variant="outline" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                        {mode === 'practice' && Object.keys(answers).length > 0 && (
                            <button className="flex items-center gap-2">
                                Submit for Grading
                            </button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal pl-6 space-y-4">
                        {worksheetContent[0].questions.map((question, index) => (
                            <li key={index} className="pl-2">
                                <div className="mb-2">
                                    <Badge variant="outline" className="mb-2">
                                        {question.topic} - {question.subtopic}
                                    </Badge>
                                </div>
                                {question.question}
                                <div className="mt-2 flex items-center gap-4">
                                    <Input
                                        placeholder="Enter your answer"
                                        value={answers[index] || ''}
                                        onChange={(e) => setAnswers(prev => ({
                                            ...prev,
                                            [index]: e.target.value
                                        }))}
                                        disabled={mode === 'review'}
                                        className="max-w-md"
                                    />
                                </div>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>
        )}
    </div>
    );
};

    export default WorksheetGenerator;