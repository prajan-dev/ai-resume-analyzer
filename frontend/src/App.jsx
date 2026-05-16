import { useState } from "react";
import axios from "axios";
import {
  FaRobot,
  FaBrain,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

function App() {

  const [file, setFile] = useState(null);

  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
//        await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData
      );

      console.log(response.data);
      setResult(response.data);
      setLoading(false);

    } catch (error) {

      console.log(error);
      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-cyan-950 text-white flex items-center justify-center p-10">

     <div className="w-[900px] p-10 rounded-3xl border border-cyan-400 shadow-[0_0_40px_#00ffff] bg-white/5 backdrop-blur-lg">

        <div className="flex items-center justify-center gap-4 mb-8">

            <FaRobot className="text-cyan-400 text-5xl" />

                <h1 className="text-5xl font-bold text-cyan-400">
                    AI Resume Analyzer
                </h1>

         </div>

        <div className="mb-6">

          <label className="block text-lg mb-2 text-pink-400">
            Upload Resume
          </label>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 rounded-xl bg-black border border-cyan-400"
          />

        </div>

        <div className="mb-6">

          <label className="block text-lg mb-2 text-pink-400">
            Job Description
          </label>

          <textarea
            rows="8"
            placeholder="Paste Job Description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-4 rounded-xl bg-black border border-cyan-400"
          />

        </div>

        <button
          onClick={handleSubmit}
          className="w-full p-4 rounded-xl bg-cyan-400 text-black text-xl font-bold hover:bg-pink-400 hover:scale-105 hover:shadow-[0_0_25px_#00ffff] transition-all duration-300"
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

        {result && (

          <div className="mt-10 p-6 rounded-2xl border border-pink-400 bg-black">

            <h2 className="text-3xl text-pink-400 mb-4">
              Analysis Result
            </h2>

            <div className="mt-4 text-cyan-300 overflow-auto max-h-[500px]">
                 <div className="space-y-6">

  <div>
    <h3 className="text-2xl text-cyan-400 mb-3">
      Skills
    </h3>

    <div className="flex flex-wrap gap-3">
      {result.analysis.skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:scale-110 hover:shadow-[0_0_15px_#00ffff] transition-all duration-300 cursor-pointer"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>

  <div>
    <h3 className="text-2xl text-pink-400 mb-3">
      Strengths
    </h3>

    <ul className="space-y-2">
      {result.analysis.strength.map((item, index) => (
        <li
          key={index}
          className="p-3 rounded-xl bg-zinc-800 border border-pink-400"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>

  <div>
    <h3 className="text-2xl text-red-400 mb-3">
      Missing Skills
    </h3>

    <div className="flex flex-wrap gap-3">
      {result.analysis.missing_skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 rounded-full bg-red-500/20 border border-red-400 text-red-300"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>

  <div className="p-6 rounded-2xl border border-green-400 bg-zinc-900">

  <h3 className="text-3xl text-green-400 mb-6 text-center">
    ATS Match Score
  </h3>

  <div className="w-full bg-zinc-800 rounded-full h-8 overflow-hidden">

    <div
      className="h-8 bg-green-400 text-black font-bold flex items-center justify-center transition-all duration-1000"
      style={{
        width: `${result.analysis.resume_score * 10}%`
      }}
    >
      {result.analysis.resume_score * 10}%
    </div>

  </div>

</div>

</div>
            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default App;