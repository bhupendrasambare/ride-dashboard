import { Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BookingStatusChart = ({ data }) => {
  const statusData = Object.entries(
    data.reduce((acc, curr) => {
      acc[curr.BookingStatus] = (acc[curr.BookingStatus] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Booking Status Distribution</Card.Title>
        <PieChart width={300} height={250}>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {statusData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Card.Body>
    </Card>
  );
};

export default BookingStatusChart;
