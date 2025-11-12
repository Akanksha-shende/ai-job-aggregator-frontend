import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import JobCard from './JobCard'; // New import

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://raj-job-api.onrender.com/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI-Powered Job Aggregator</h1>
      </header>
      <main>
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="job-list">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
