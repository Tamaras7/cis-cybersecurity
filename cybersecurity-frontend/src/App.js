import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [topics, setTopics] = useState([]);
  const [cisSummaryTopics, setCisSummaryTopics] = useState([]);
  const [cisAdvantageTopics, setCisAdvantageTopics] = useState([]);

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSummary, setSelectedSummary] = useState("");
  const [selectedAdvantage, setSelectedAdvantage] = useState("");

  const [topicData, setTopicData] = useState(null);

  // Fetch catalog
  useEffect(() => {
    fetch("http://cis-cybersecurity-backend.local:5000/api")
      .then(res => res.json())
      .then(data => setTopics(data.availableTopics))
      .catch(err => console.error("Error fetching catalog:", err));

    fetch("http://cis-cybersecurity-backend.local:5000/api/cis-summary")
      .then(res => res.json())
      .then(data => setCisSummaryTopics(data.availableTopics))
      .catch(err => console.error("Error fetching CIS summary catalog:", err));

    fetch("http://cis-cybersecurity-backend.local:5000/api/cis-advantages")
      .then(res => res.json())
      .then(data => setCisAdvantageTopics(data.availableTopics))
      .catch(err => console.error("Error fetching CIS advantages catalog:", err));
  }, []);

  // Fetch topic when selected
  useEffect(() => {
    if (selectedTopic) {
      fetch(`http://cis-cybersecurity-backend.local:5000/api/${selectedTopic}`)
        .then(res => res.json())
        .then(data => setTopicData(data))
        .catch(err => console.error("Error fetching topic:", err));
    }
  }, [selectedTopic]);

  // Fetch CIS Summary company
  useEffect(() => {
    if (selectedSummary) {
      fetch(`http://cis-cybersecurity-backend.local:5000/api/cis-summary/${selectedSummary}`)
        .then(res => res.json())
        .then(data => setTopicData(data))
        .catch(err => console.error("Error fetching CIS summary topic:", err));
    }
  }, [selectedSummary]);

  // Fetch CIS Advantage company
  useEffect(() => {
    if (selectedAdvantage) {
      fetch(`http://cis-cybersecurity-backend.local:5000/api/cis-advantages/${selectedAdvantage}`)
        .then(res => res.json())
        .then(data => setTopicData(data))
        .catch(err => console.error("Error fetching CIS advantage topic:", err));
    }
  }, [selectedAdvantage]);

  return (
    <div className="api-viewer">
      <header>
        <h1>Cybersecurity API Viewer</h1>
        <p>Browse topics and see API responses</p>
      </header>

      {/* Scroll-down #1: Catalog */}
      <section className="endpoint">
        <h2>Catalog Endpoint (/api)</h2>
        {topics.length > 0 ? (
          <ul className="topic-list">
            {topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        ) : (
          <p>No topics loaded yet.</p>
        )}
      </section>

      {/* Scroll-down #2: Topics */}
      <section className="endpoint">
        <h2>Topic Endpoint (/api/:topic)</h2>
        <label>Select Topic: </label>
        <select onChange={e => setSelectedTopic(e.target.value)}>
          <option value="">-- Select a topic --</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </section>

      {/* Scroll-down #3: CIS Security Partners Summary */}
      <section className="endpoint">
        <h2>CIS Security Partners Summary (/api/cis-summary/:company)</h2>
        <label>Select Company: </label>
        <select onChange={e => setSelectedSummary(e.target.value)}>
          <option value="">-- Select a company --</option>
          {cisSummaryTopics.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </section>

      {/* Scroll-down #4: CIS Security Partner Advantages */}
      <section className="endpoint">
        <h2>CIS Security Partner Advantages (/api/cis-advantages/:company)</h2>
        <label>Select Company: </label>
        <select onChange={e => setSelectedAdvantage(e.target.value)}>
          <option value="">-- Select a company --</option>
          {cisAdvantageTopics.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </section>

      {/* Display selected data */}
      {topicData && (
        <div className="topic-details">
          <h3>{topicData.title}</h3>
          <p>{topicData.description}</p>

          {topicData.keyPoints && (
            <>
              <h4>Key Points:</h4>
              <ul>
                {topicData.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </>
          )}

          {topicData.vendors && (
            <>
              <h4>Vendors:</h4>
              <ul>
                {topicData.vendors.map((vendor, index) => (
                  <li key={index}>{vendor}</li>
                ))}
              </ul>
            </>
          )}

          {topicData.businessValue && (
            <p><strong>Business Value:</strong> {topicData.businessValue}</p>
          )}
          {topicData.technicalValue && (
            <p><strong>Technical Value:</strong> {topicData.technicalValue}</p>
          )}

          {topicData.useCases && (
            <>
              <h4>Use Cases:</h4>
              <ul>
                {topicData.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
