import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BASE_URL } from "../services/urls"

const BookingValueChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${BASE_URL}/rides/booking-value?${params}`);
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

  const valueData = data.map((ride) => ({
    date: ride.Date,
    value: ride.BookingValue,
  }));

  return (
    <Card className="shadow-lg rounded-5 border-0 mb-3">
      <Card.Body style={{ width: "100%", height: 300, position: "relative", overflow: "hidden" }}>
        <Card.Title>Daily Booking Value</Card.Title>

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
                borderTop: "6px solid #8884d8",
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
            <AreaChart data={valueData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="url(#colorGradient)"
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookingValueChart;
