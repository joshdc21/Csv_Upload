import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DashboardMeta.css";

function DashboardMeta() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/dashboard")
      .then((res) => setUrl(res.data.url))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <button onClick={() => navigate("/")} className="dashboard-button">
        Back
      </button>

      {url ? (
        <iframe src={url} className="dashboard-iframe" title="Metabase Dashboard" />
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default DashboardMeta;
