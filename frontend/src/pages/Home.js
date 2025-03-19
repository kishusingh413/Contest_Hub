import { useEffect, useState } from "react";
import { getContests } from "../api/contests";
import { Link } from "react-router-dom";

const Home = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      const data = await getContests();
      setContests(data);
    };
    fetchContests();
  }, []);

  return (
    <div>
      <h1>Upcoming Contests</h1>
      <ul>
        {contests.map((contest) => (
          <li key={contest._id}>
            <Link to={`/contest/${contest._id}`}>{contest.name}</Link> - {contest.platform} - {contest.startTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
