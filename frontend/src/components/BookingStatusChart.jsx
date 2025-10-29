import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BASE_URL } from "../services/urls";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BookingStatusChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabledKeys, setDisabledKeys] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${BASE_URL}/rides/booking-status?${params}`);
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

  const statusData = Object.entries(
    data.reduce((acc, curr) => {
      acc[curr.BookingStatus] = (acc[curr.BookingStatus] || 0) + (curr.count || 1);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const handleLegendClick = (e) => {
    const { value } = e;
    setDisabledKeys((prev) =>
      prev.includes(value) ? prev.filter((k) => k !== value) : [...prev, value]
    );
  };

  const renderLegend = ({ payload }) => (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {payload.map((entry, index) => {
        const isDisabled = disabledKeys.includes(entry.value);
        return (
          <li
            key={index}
            onClick={() => handleLegendClick(entry)}
            style={{
              cursor: "pointer",
              textDecoration: isDisabled ? "line-through" : "none",
              opacity: isDisabled ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: entry.color,
              }}
            />
            {entry.value}
          </li>
        );
      })}
    </ul>
  );

  return (
    <Card className="shadow-lg rounded-5 border-0 mb-3">
      <Card.Body style={{ width: "100%", height: 300, position: "relative", overflow: "hidden" }}>
        <Card.Title>Booking Status Distribution</Card.Title>

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
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="45%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                >
                  {statusData.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={COLORS[i % COLORS.length]}
                      fillOpacity={disabledKeys.includes(entry.name) ? 0.1 : 1}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  content={renderLegend}
                  wrapperStyle={{
                    left: "70%",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card.Body>
    </Card>

  );
};

export default BookingStatusChart;
