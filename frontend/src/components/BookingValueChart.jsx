import { Card } from "react-bootstrap";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BookingValueChart = ({ data }) => {
  const valueData = data.map((ride) => ({
    date: ride.Date,
    value: ride.BookingValue,
  }));

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Daily Booking Value</Card.Title>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={valueData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default BookingValueChart;
