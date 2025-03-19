import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSolutions, addSolution } from "../api/solutions";

const ContestDetails = () => {
  const { id } = useParams();
  const [solutions, setSolutions] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState("");

  useEffect(() => {
    const fetchSolutions = async () => {
      const data = await getSolutions(id);
      setSolutions(data);
    };
    fetchSolutions();
  }, [id]);

  const handleAddSolution = async () => {
    const newSolution = await addSolution({ contestId: id, youtubeLink }, "user-token"); // Replace with real auth token
    if (newSolution) {
      setSolutions([...solutions, newSolution]);
      setYoutubeLink("");
    }
  };

  return (
    <div>
      <h1>Contest Solutions</h1>
      <ul>
        {solutions.map((sol) => (
          <li key={sol._id}>
            <a href={sol.youtubeLink} target="_blank" rel="noopener noreferrer">
              {sol.youtubeLink}
            </a>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="YouTube link"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
      />
      <button onClick={handleAddSolution}>Add Solution</button>
    </div>
  );
};

export default ContestDetails;
