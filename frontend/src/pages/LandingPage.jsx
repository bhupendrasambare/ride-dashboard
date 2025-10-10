import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const backendTech = [
    { name: "Python", logo: "https://www.python.org/static/community_logos/python-logo.png" },
    { name: "FastAPI", logo: "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" },
    { name: "MongoDB", logo: "https://www.svgrepo.com/show/331488/mongodb.svg" },
    { name: "Pandas", logo: "https://pandas.pydata.org/static/img/pandas_mark.svg" },
    { name: "NumPy", logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg" },
    { name: "Matplotlib", logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
  ];

  const frontendTech = [
    { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { name: "Bootstrap 5", logo: "https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo-shadow.png" },
    { name: "Vite", logo: "https://vitejs.dev/logo.svg" },
    { name: "React Router", logo: "https://reactrouter.com/_brand/react-router-mark-color.png" },
    { name: "React Toastify", logo: "https://react-toastify.js.org/img/logo.svg" },
    { name: "Zustand", logo: "https://zustand-demo.pmnd.rs/favicon.ico" },
  ];

  const tools = [
    { name: "Uvicorn", logo: "https://uvicorn.dev/uvicorn.png" },
    { name: "PyJWT", logo: "https://jwt.io/img/pic_logo.svg" },
    { name: "Bcrypt", logo: "https://raw.githubusercontent.com/BcryptNet/bcrypt.net/main/logo.svg" },
    { name: "Axios", logo: "https://axios-http.com/assets/favicon.ico" },
    { name: "GitHub", logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
    { name: "ESLint", logo: "https://eslint.org/icon-512.png" },
  ];

  return (
    <div>
      {/* ===== Navbar ===== */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid container">
          <a className="navbar-brand fw-bold" href="#">
            Data Insights Hub
          </a>
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              <i className="bi bi-github"></i> GitHub
            </a>
          </div>
        </div>
      </nav>

    <Carousel interval={5000} fade>
        {/* Slide 1 */}
        <Carousel.Item
            style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "80vh",
        }}
        >
            <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white">
                <h1 className="display-5 fw-bold bg-dark bg-opacity-75 p-3 rounded">
                    Welcome to Your Data Insights Hub
                </h1>
                <p className="lead bg-dark bg-opacity-50 p-2 rounded">
                    Explore patterns, trends, and predictions from your datasets using Python-powered analytics.
                </p>
            </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item
            style={{
                backgroundImage:
                "url('https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "80vh",
            }}
        >
            <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white">
                <h2 className="fw-bold bg-dark bg-opacity-75 p-3 rounded">
                    Visualize. Analyze. Predict.
                </h2>
                <p className="lead bg-dark bg-opacity-50 p-2 rounded">
                    Dive deep into your data using modern visualization techniques.
                </p>
            </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item
            style={{
                backgroundImage:
                "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "80vh",
            }}
        >
            <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white">
                <h2 className="fw-bold bg-dark bg-opacity-75 p-3 rounded">
                    AI + Python = Insights
                </h2>
                <p className="lead bg-dark bg-opacity-50 p-2 rounded">
                    Unleash machine learning power for smarter decisions.
                </p>
            </div>
        </Carousel.Item>
    </Carousel>

      {/* ===== Technologies Section ===== */}
      <section className="container my-5">
        <h3 className="text-center mb-4 fw-bold">Technologies & Libraries Used</h3>

        {/* Backend */}
        <h5 className="text-secondary mt-4 mb-3">🔹 Backend Stack</h5>
        <div className="row g-4">
          {backendTech.map((tech, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-2">
              <div className="card shadow-sm border-0 text-center rounded-4 p-3 h-100">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="mx-auto mb-2"
                  style={{ width: "60px", height: "60px", objectFit: "contain" }}
                />
                <h6 className="fw-semibold">{tech.name}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* Frontend */}
        <h5 className="text-secondary mt-5 mb-3">🔹 Frontend Stack</h5>
        <div className="row g-4">
          {frontendTech.map((tech, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-2">
              <div className="card shadow-sm border-0 text-center rounded-4 p-3 h-100">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="mx-auto mb-2"
                  style={{ width: "60px", height: "60px", objectFit: "contain" }}
                />
                <h6 className="fw-semibold">{tech.name}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <h5 className="text-secondary mt-5 mb-3">🔹 Tools & Utilities</h5>
        <div className="row g-4">
          {tools.map((tech, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-2">
              <div className="card shadow-sm border-0 text-center rounded-4 p-3 h-100">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="mx-auto mb-2"
                  style={{ width: "60px", height: "60px", objectFit: "contain" }}
                />
                <h6 className="fw-semibold">{tech.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-dark text-white py-4">
        <div className="container d-flex flex-wrap justify-content-around text-center text-md-start">
          <div>
            <h6 className="fw-bold">👨‍💻 Developer</h6>
            <p>Bhupendra Sambare</p>
          </div>
          <div>
            <h6 className="fw-bold">📧 Email</h6>
            <p>bhupendra@example.com</p>
          </div>
          <div>
            <h6 className="fw-bold">📞 Contact</h6>
            <p>+91-9876543210</p>
          </div>
          <div>
            <h6 className="fw-bold">🌐 GitHub</h6>
            <a
              href="https://github.com/bhupendra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none"
            >
              github.com/bhupendra
            </a>
          </div>
        </div>
        <p className="text-center mt-3 mb-0 small">
          © 2025 Data Insights Hub. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
