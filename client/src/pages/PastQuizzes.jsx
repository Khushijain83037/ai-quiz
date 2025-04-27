import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function PastQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/quiz/history");
        setQuizzes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-cyan-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10 tracking-wide animate-fade-in">
          Past Quizzes
        </h2>

        {quizzes.length === 0 ? (
          <p className="text-center text-gray-600 animate-fade-in">No past quizzes found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {quizzes.map((quiz, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-indigo-100 shadow-xl transition-transform hover:scale-105">
                <h3 className="text-2xl font-bold text-indigo-700 mb-2">{quiz.topic}</h3>
                <p className="text-gray-700 mb-2">Score: {quiz.score} / {quiz.questions.length}</p>
                <p className="text-gray-500 text-sm">
                  Attempted on {new Date(quiz.createdAt).toLocaleDateString()} at {new Date(quiz.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default PastQuizzes;
