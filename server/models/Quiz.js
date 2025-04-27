import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
      selectedAnswer: String
    }
  ],
  score: { type: Number },
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);
