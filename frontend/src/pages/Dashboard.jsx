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
    start_date: "1800-10-01",
    end_date: "2025-10-10",
    vehicle_type: "All",
  });

  
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h3 className="my-4 text-center fw-bold">Uber Ride Analytics Dashboard</h3>


      <Row className="mb-4 w-100 d-flex justify-content-around">
        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold">Start Date</Form.Label>
            <Form.Control
              className="shadow-lg rounded-5 border-0 mb-4 py-3 px-2"
              type="date"
              name="start_date" 
              value={filters.start_date}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold">End Date</Form.Label>
            <Form.Control
              className="shadow-lg rounded-5 border-0 mb-4 py-3 px-2"
              type="date"
              name="end_date"
              value={filters.end_date}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold">Vehicle Type</Form.Label>
            <Form.Select
              className="shadow-lg rounded-5 border-0 mb-4 py-3 px-2"
              name="vehicle_type" 
              value={filters.vehicle_type}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Bike">Bike</option>
              <option value="eBike">eBike</option>
              <option value="Auto">Auto</option>
              <option value="Go Mini">Go Mini</option>
              <option value="Go Sedan">Go Sedan</option>
              <option value="Premier Sedan">Premier Sedan</option>
              <option value="Uber XL">Uber XL</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* 📊 Dashboard Charts */}
      <Row>
        <Col md={6}>
          <PaymentMethodChart filters={filters} />
        </Col>
        <Col md={6}>
          <VehicleTypeChart filters={filters} />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <BookingStatusChart filters={filters} />
        </Col>
        <Col md={6}>
          <RatingsChart filters={filters} />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <BookingValueChart filters={filters} />
        </Col>
        <Col md={6}>
          <TrendForecastChart filters={filters} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
