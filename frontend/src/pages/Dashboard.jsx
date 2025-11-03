import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import BookingStatusChart from "../components/BookingStatusChart";
import VehicleTypeChart from "../components/VehicleTypeChart";
import RatingsChart from "../components/RatingsChart";
import PaymentMethodChart from "../components/PaymentMethodChart";
import BookingValueChart from "../components/BookingValueChart";
import TrendForecastChart from "../components/TrendForecastChart";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    startDate: "2025-10-01",
    endDate: "2025-10-10",
    vehicleType: "All",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h3 className="my-4 text-center">Uber Ride Analytics Dashboard</h3>

      <Row className="mb-4 w-100 d-flex justify-content-around">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
             className="shadow-lg rounded-5 border-0 mb-4 py-3 px-2"
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
             className="shadow-lg rounded-5 border-0 mb-4 py-3 px-2"
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Select
             className="shadow-lg rounded-5 border-0 mb-4 py-3 px-2"
              name="vehicleType"
              value={filters.vehicleType}
              onChange={handleFilterChange}
            >
              <option>All</option>
              <option>Bike</option>
              <option>SUV</option>
              <option>Sedan</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Charts */}
      <Row>
        <Col md={6}><PaymentMethodChart filters={filters} /></Col>
        <Col md={6}><VehicleTypeChart filters={filters} /></Col>
      </Row>
      <Row>
        <Col md={6}><BookingStatusChart filters={filters} /></Col>
        <Col md={6}><RatingsChart filters={filters} /></Col>
      </Row>
      <Row>
        <Col md={6}><BookingValueChart filters={filters} /></Col>
        <Col md={6}><TrendForecastChart filters={filters} /></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
