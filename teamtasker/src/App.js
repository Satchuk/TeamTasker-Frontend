import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { SignUp } from './components/Pages/signUp';
import { Login } from './components/Pages/logIn';
import MainContainer from './components/Pages/MainContainer';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} /> */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainContainer />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
