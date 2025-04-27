import Quiz from '../models/Quiz.js';
import openai from '../config/openai.js';  // Already setup correctly

// @desc Generate Quiz MCQs from Topic
export const generateQuiz = async (req, res) => {
  const { topic } = req.body;

  try {
    const prompt = `
      Generate 10 multiple-choice questions (with 4 options each) on the topic "${topic}".
      Format like:
      [
        {
          "question": "",
          "options": ["", "", "", ""],
          "correctAnswer": ""
        },
        ...
      ]
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 1600,
    });

    const text = response.choices[0].message.content;  // No 'data' property in v4
    const questions = JSON.parse(text);

    res.json(questions);

  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ message: "Error generating quiz" });
  }
};

// @desc Submit Quiz Answers
export const submitQuiz = async (req, res) => {
  const { topic, questions, score } = req.body;

  try {
    const quiz = new Quiz({
      user: req.user._id,
      topic,
      questions,
      score,
    });

    await quiz.save();

    res.status(201).json({ message: "Quiz submitted successfully" });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Past Quizzes
export const getPastQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: error.message });
  }
};
