import { useState, useEffect } from "react";
import axios from "axios";

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contests");
        setContests(res.data);
        console.log("Contests: ", contests);
        console.log("Res Data: ", res.data);    
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setLoading(false);
      }
    };

    const fetchBookmarks = async () => {
      if (userToken) {
        try {
          const res = await axios.get("http://localhost:5000/api/bookmarks", {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          setBookmarks(res.data.map((b) => b.contestId));
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      }else{
        console.log("User not logged in") ;
      }
    };

    fetchContests();
    fetchBookmarks();
  }, [userToken]);

  const handleBookmark = async (contest) => {
    console.log("User Token: ", userToken);
    
    if (!userToken) return alert("You must be logged in to bookmark contests");

    try {
      if (bookmarks.includes(contest.id)) {
        await axios.delete(`http://localhost:5000/api/bookmarks/:${contest.contestId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setBookmarks(bookmarks.filter((id) => id !== contest.id));
      } else {
        console.log("Contest ID: ", contest);
        await axios.post(
          "http://localhost:5000/api/bookmarks/",
          {
            contestId: contest.contestId,
            name: contest.name,
            platform: contest.platform,
            start_time: contest.start_time,
            duration: contest.duration,
            url: contest.url,
          },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        setBookmarks([...bookmarks, contest.id]);
        console.log(bookmarks) ;

      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  return (
    <div>
      <h2>Upcoming Contests</h2>
      {loading ? (
        <p>Loading contests...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Contest Name</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Action</th>
              <th>Bookmark</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr key={contest.id}>
                <td>{contest.platform}</td>
                <td>{contest.name}</td>
                <td>{new Date(contest.start_time).toLocaleString()}</td>
                <td>{Math.floor(contest.duration / 60)} hrs</td>
                <td>
                  <a href={contest.url} target="_blank" rel="noopener noreferrer">Register</a>
                </td>
                <td>
                  <button onClick={() => handleBookmark(contest)}>
                    {bookmarks.includes(contest.id) ? "★ Unbookmark" : "☆ Bookmark"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contests;
