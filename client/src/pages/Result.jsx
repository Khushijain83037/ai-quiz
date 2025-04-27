import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Result() {
  const [resultData, setResultData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = JSON.parse(localStorage.getItem("quizResult"));
    const topic = localStorage.getItem("topic");

    if (storedResult && topic) {
      setResultData({ ...storedResult, topic });
      // Submit the quiz to backend
      API.post("/quiz/submit", {
        topic,
        questions: storedResult.questions,
        score: storedResult.score,
      }).catch((err) => {
        console.error("Error submitting quiz:", err);
      });
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  if (!resultData) {
    return null; // Loading...
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="bg-white/80 backdrop-blur-md border border-green-100 shadow-2xl rounded-3xl p-10 text-center mb-10">
          <h2 className="text-5xl font-bold text-green-600 mb-6 tracking-wide">Quiz Completed!</h2>
          <p className="text-xl mb-4">Topic: <span className="font-semibold text-indigo-600">{resultData.topic}</span></p>
          <p className="text-3xl font-bold text-indigo-700">
            Your Score: {resultData.score} / {resultData.questions.length}
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="space-y-8">
          {resultData.questions.map((q, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">{index + 1}. {q.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-center ${
                      option === q.correctAnswer
                        ? "bg-green-100 border-green-300 text-green-700 font-semibold"
                        : option === q.selectedAnswer
                        ? "bg-red-100 border-red-300 text-red-700 font-semibold"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                {q.selectedAnswer
                  ? q.selectedAnswer === q.correctAnswer
                    ? <span className="inline-block bg-green-200 text-green-800 font-semibold px-4 py-2 rounded-full text-sm">Correct</span>
                    : <span className="inline-block bg-red-200 text-red-800 font-semibold px-4 py-2 rounded-full text-sm">Wrong (You selected: {q.selectedAnswer})</span>
                  : <span className="inline-block bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-full text-sm">Not Attempted</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Result;
