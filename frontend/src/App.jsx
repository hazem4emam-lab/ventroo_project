
import { useEffect, useState } from "react";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");

  useEffect(() => {
    fetch("http://localhost:3000/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }
        return response.json();
      })
      .then((data) => {
        setBackendStatus(data.status);
      })
      .catch(() => {
        setBackendStatus("Connection failed");
      });
  }, []);

  return (
    <div>
      <h1 id="project-name">
        <span id="projectname">Ventro</span>
        </h1>
      <p>Find skilled professionals for your home services.</p>

      <h2>Backend Status: {backendStatus}</h2>
    </div>
  );
}

export default App;
