import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store  from "./App/Store";
import Dashboard from "./layouts/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Coach_dashboard from "./layouts/Coach_dashboard";
import Entreprise_dashboard from "./layouts/Entreprise_dashboard";
import User_dashboard from "./layouts/User_dashboard";
import Formation from "./pages/Formation";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/coach_dashboard" element={<Coach_dashboard />} />
          <Route path="/entreprise_dashboard" element={<Entreprise_dashboard />} />
          <Route path="/user_dashboard" element={<User_dashboard />} />
          <Route path="/formation" element={<Formation />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
