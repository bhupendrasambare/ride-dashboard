import { Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const VehicleTypeChart = ({ data }) => {
  const typeData = Object.entries(
    data.reduce((acc, curr) => {
      acc[curr.VehicleType] = (acc[curr.VehicleType] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Vehicle Type Usage</Card.Title>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={typeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default VehicleTypeChart;
