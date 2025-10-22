import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#FF8042", "#00C49F", "#0088FE", "#FFBB28"];

const PaymentMethodChart = ({ filters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`http://localhost:8000/api/payment-method?${params}`);
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

  const paymentData = Object.entries(
    data.reduce((acc, curr) => {
      acc[curr.PaymentMethod] = (acc[curr.PaymentMethod] || 0) + (curr.count || 1);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>Payment Methods</Card.Title>
        {loading ? <Spinner animation="border" /> : (
          <PieChart width={300} height={250}>
            <Pie data={paymentData} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name">
              {paymentData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </Card.Body>
    </Card>
  );
};

export default PaymentMethodChart;
