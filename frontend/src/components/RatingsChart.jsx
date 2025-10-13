import { Card } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const RatingsChart = ({ data }) => {
  const ratingsData = data.map((ride) => ({
    date: ride.Date,
    Driver: ride.DriverRatings,
    Customer: ride.CustomerRating,
  }));

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Driver vs Customer Ratings</Card.Title>
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
      </Card.Body>
    </Card>
  );
};

export default RatingsChart;
