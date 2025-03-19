import { useState, useEffect } from "react";
import axios from "axios";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookmarks", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setBookmarks(res.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [userToken]);

  return (
    <div>
      <h2>Bookmarked Contests</h2>
      {bookmarks.length === 0 ? <p>No bookmarks yet.</p> : bookmarks.map((contest) => <p key={contest.contestId}>{contest.name}</p>)}
    </div>
  );
};

export default Bookmarks;
