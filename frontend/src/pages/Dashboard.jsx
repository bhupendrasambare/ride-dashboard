import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { format, parseISO, isWithinInterval } from "date-fns";
import BookingStatusChart from "/src/components/BookingStatusChart";
import VehicleTypeChart from "/src/components/VehicleTypeChart";
import RatingsChart from "/src/components/RatingsChart";
import PaymentMethodChart from "/src/components/PaymentMethodChart";
import BookingValueChart from "/src/components/BookingValueChart";
import TrendForecastChart from "/src/components/TrendForecastChart";

const mockData = [
  { Date: "2025-10-01", BookingStatus: "Completed", VehicleType: "SUV", BookingValue: 450, DriverRatings: 4.8, CustomerRating: 4.7, PaymentMethod: "UPI" },
  { Date: "2025-10-02", BookingStatus: "Cancelled", VehicleType: "Sedan", BookingValue: 0, DriverRatings: 4.0, CustomerRating: 3.9, PaymentMethod: "Cash" },
  { Date: "2025-10-03", BookingStatus: "Completed", VehicleType: "Bike", BookingValue: 120, DriverRatings: 4.9, CustomerRating: 5.0, PaymentMethod: "Card" },
  { Date: "2025-10-04", BookingStatus: "Completed", VehicleType: "SUV", BookingValue: 500, DriverRatings: 4.6, CustomerRating: 4.5, PaymentMethod: "UPI" },
  { Date: "2025-10-05", BookingStatus: "Incomplete", VehicleType: "Sedan", BookingValue: 200, DriverRatings: 4.3, CustomerRating: 4.2, PaymentMethod: "Cash" },
];

const Dashboard = () => {
  const [filters, setFilters] = useState({
    startDate: "2025-10-01",
    endDate: "2025-10-10",
    vehicleType: "All",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredData = mockData.filter((ride) => {
    const inRange = isWithinInterval(parseISO(ride.Date), {
      start: parseISO(filters.startDate),
      end: parseISO(filters.endDate),
    });
    const matchVehicle =
      filters.vehicleType === "All" || ride.VehicleType === filters.vehicleType;
    return inRange && matchVehicle;
  });

  return (
    <div fluid className="p-3">
        <h3 className="mb-4 text-center">Uber Ride Analytics Dashboard</h3>

        <div className="container">
            
            <div className="d-flex">
                <Row className="mb-4 shadow-lg rounded-3 py-3 w-100 d-flex justify-content-around">
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
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
            </div>

            {/* Charts */}
            <Row>
                <Col md={6}><BookingStatusChart data={filteredData} /></Col>
                <Col md={6}><VehicleTypeChart data={filteredData} /></Col>
            </Row>
            <Row>
                <Col md={6}><RatingsChart data={filteredData} /></Col>
                <Col md={6}><PaymentMethodChart data={filteredData} /></Col>
            </Row>
            <Row>
                <Col md={6}><BookingValueChart data={filteredData} /></Col>
                <Col md={6}><TrendForecastChart data={filteredData} /></Col>
            </Row>
        </div>

    </div>
  );
};

export default Dashboard;
