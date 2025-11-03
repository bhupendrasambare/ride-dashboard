import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BASE_URL } from "../services/urls"

const VehicleTypeChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${BASE_URL}/rides/vehicle-type?${params}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const typeData = Object.entries(
    data.reduce((acc, curr) => {
      acc[curr.VehicleType] = (acc[curr.VehicleType] || 0) + (curr.count || 1);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <Card className="shadow-lg rounded-5 border-0 mb-3">
      <Card.Body style={{ width: "100%", height: 300, position: "relative", overflow: "hidden" }}>
        <Card.Title>Vehicle Type Usage</Card.Title>

        {loading ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(240,240,240,0.9), rgba(220,220,220,0.8))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "1.5rem",
              backdropFilter: "blur(3px)",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                border: "6px solid rgba(0,0,0,0.1)",
                borderTop: "6px solid #007bff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: 10,
              }}
            ></div>
            <span style={{ fontWeight: 600, color: "#333" }}>Loading chart...</span>

            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={typeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" radius={[10, 10, 0, 0]}  activeBar={{ fill: "#82ca9d" }} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default VehicleTypeChart;
