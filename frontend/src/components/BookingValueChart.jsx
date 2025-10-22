import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BookingValueChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`http://localhost:8000/api/booking-value?${params}`);
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
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Daily Booking Value</Card.Title>
        {loading ? <Spinner animation="border" /> : (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={valueData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookingValueChart;
