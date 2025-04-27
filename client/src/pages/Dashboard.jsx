import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaBookOpen } from "react-icons/fa";

function Dashboard() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("topic");

    try {
      const res = await API.post("/quiz/generate", { topic });

      localStorage.setItem("quizQuestions", JSON.stringify(res.data));
      localStorage.setItem("topic", topic);

      navigate("/quiz", { state: { questions: res.data, topic } });
    } catch (error) {
      alert("Quiz generation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex justify-center items-center p-4">
      <div className="bg-white/5 backdrop-blur-2xl shadow-2xl border border-purple-300/20 rounded-3xl px-10 py-12 w-full max-w-2xl transition-transform duration-500 hover:scale-105">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-500 mb-4">
          Generate Custom Quiz
        </h1>
        <p className="text-lg text-center text-purple-100 mb-8">
          Enter a topic below to create your personalized quiz instantly.
        </p>
        <form onSubmit={handleGenerateQuiz} className="space-y-6">
          <div className="relative">
            <FaBookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" size={24} />
            <input
              type="text"
              placeholder="e.g., Quantum Physics, JavaScript, World War II"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full py-4 pl-14 pr-6 rounded-xl border border-purple-400/20 bg-purple-50/10 text-purple-100 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-xl hover:from-purple-600 hover:to-purple-800 transition duration-300 flex justify-center items-center ${{
              "opacity-60 cursor-not-allowed": isLoading,
            }}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate Quiz"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/history")}
            className="w-full text-purple-300 hover:text-purple-100 transition-colors"
          >
            View Past Quizzes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;