import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("quizQuestions"));
    const topic = localStorage.getItem("topic");

    if (storedQuestions && topic) {
        setQuestions(storedQuestions);
    } else {
        navigate("/dashboard"); // If no quiz data, redirect
    }
}, [navigate]);


  const handleOptionSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    const updatedQuestions = questions.map((q, index) => {
      const selected = selectedAnswers[index];
      if (selected === q.correctAnswer) {
        score++;
      }
      return {
        ...q,
        selectedAnswer: selected || "",
      };
    });

    localStorage.setItem("quizResult", JSON.stringify({
      questions: updatedQuestions,
      score,
    }));

    navigate("/result");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Answer the Questions</h2>
        {questions.map((q, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">{index + 1}. {q.question}</h3>
            <div className="space-y-3">
              {q.options.map((option, i) => (
                <div key={i}>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={selectedAnswers[index] === option}
                      onChange={() => handleOptionSelect(index, option)}
                      className="form-radio text-indigo-600"
                    />
                    <span>{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmitQuiz}
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default Quiz;
