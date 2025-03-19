import axios from "axios";
import {getCodeChefContests} from "../services/codechefScraper.js";
import {getLeetCodeContests} from "../services/leetcodeScraper.js";

export const getContests = async (req, res) => {
    try {
      // Fetch Codeforces contests
      const cfResponse = await axios.get("https://codeforces.com/api/contest.list");
      let cfContests = cfResponse.data.result
        .filter(contest => contest.phase === "BEFORE")
        .map(contest => ({
          name: contest.name,
          platform: "Codeforces",
          startTime: new Date(contest.startTimeSeconds * 1000),
          duration: contest.durationSeconds / 3600, // Convert to hours
          url: `https://codeforces.com/contest/${contest.id}`
        }));
  
      // Fetch CodeChef and LeetCode contests
      const codeChefContests = await getCodeChefContests();
      const leetCodeContests = await getLeetCodeContests();
  
      // Merge all contests
      const allContests = [...cfContests, ...codeChefContests, ...leetCodeContests];
      allContests.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

      res.json(allContests);
    } catch (error) {
      console.error("Error fetching contests:", error);
      res.status(500).json({ error: "Failed to fetch contests" });
    }
  };

//   const getCodeChefContests = async () => {
//     try {
//       const response = await axios.get("https://kontests.net/api/v1/code_chef");
//       return response.data.map(contest => ({
//         name: contest.name,
//         platform: "CodeChef",
//         startTime: new Date(contest.start_time),
//         duration: contest.duration / 3600, // Convert to hours
//         url: contest.url
//       }));
//     } catch (error) {
//       console.error("Error fetching CodeChef contests:", error);
//       return [];
//     }
//   };

// //    const getLeetCodeContests = async () => {
// //     try {
// //       const response = await axios.get("https://kontests.net/api/v1/leet_code");
//       return response.data.map(contest => ({
//         name: contest.name,
//         platform: "LeetCode",
//         startTime: new Date(contest.start_time),
//         duration: contest.duration / 3600, // Convert to hours
//         url: contest.url
//       }));
//     } catch (error) {
//       console.error("Error fetching LeetCode contests:", error);
//       return [];
//     }
//   };
