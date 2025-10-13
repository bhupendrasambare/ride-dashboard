import { Card } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TrendForecastChart = ({ data }) => {
  const forecastData = data.map((ride, i) => ({
    date: ride.Date,
    value: ride.BookingValue + (Math.random() * 100 - 50),
  }));

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Booking Trend Forecast</Card.Title>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default TrendForecastChart;
