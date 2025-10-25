import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BASE_URL } from "../services/urls"

const RatingsChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${BASE_URL}/rides/ratings?${params}`);
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

  const ratingsData = data.map((ride) => ({
    date: ride.Date,
    Driver: ride.DriverRatings,
    Customer: ride.CustomerRating,
  }));

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Driver vs Customer Ratings</Card.Title>
        {loading ? <Spinner animation="border" /> : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ratingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Driver" stroke="#8884d8" />
              <Line type="monotone" dataKey="Customer" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default RatingsChart;
