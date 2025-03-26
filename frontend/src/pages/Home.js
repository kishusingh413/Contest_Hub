import { useEffect, useState, useContext } from "react";
import { getContests } from "../api/contests";
import {ThemeContext} from "../context/ThemeContext";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 

const Home = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      const data = await getContests();
      setContests(data);
    };
    fetchContests();
  }, []);

  const { theme, toggleTheme } = useContext(ThemeContext);
      // Apply the theme to the <body> tag when the component mounts
      useEffect(() => {
          document.body.classList.toggle("dark-mode", theme === "dark");
      }, [theme]);

  return (
    <div className={`home ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
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
