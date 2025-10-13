import { Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28"];

const PaymentMethodChart = ({ data }) => {
  const paymentData = Object.entries(
    data.reduce((acc, curr) => {
      acc[curr.PaymentMethod] = (acc[curr.PaymentMethod] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Payment Methods</Card.Title>
        <PieChart width={300} height={250}>
          <Pie
            data={paymentData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            nameKey="name"
          >
            {paymentData.map((_, i) => (
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

export default PaymentMethodChart;
