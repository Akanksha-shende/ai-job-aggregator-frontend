import React, { useState } from 'react';
import axios from 'axios';
import './JobCard.css';

const JobCard = ({ job }) => {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://ai-job-aggregator-backend.onrender.com/api/analyze-job', {
    description: job.description
});
            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error("Error with AI analysis:", error);
            setAnalysis("Error: Could not perform AI analysis.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job-card">
            <div className="job-header">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.company}</p>
            </div>
            <div className="job-body">
                <p className="job-description">{job.description}</p>
            </div>
            <div className="job-footer">
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="job-link">
                    View Job
                </a>
                <button 
                    onClick={handleAnalyze} 
                    disabled={loading}
                    className="analyze-button"
                >
                    {loading ? "Analyzing..." : "Analyze with AI"}
                </button>
            </div>

            {analysis && (
                <div className="job-analysis">
                    <h4>AI Analysis:</h4>
                    <p>{analysis}</p>
                </div>
            )}
        </div>
    );
};

export default JobCard;

