import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import MoreDetails from "./Pages/MoreDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import stepperReducer from './Components/feature/stepperSlice';
import LoginPage from "./Pages/LoginPage";

const store = configureStore({
  reducer: {
    stepper: stepperReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
     <Router>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/dashboard" exact element={<LandingPage />} />
          <Route path="dashboard/d365f&o/:id" element={<MoreDetails />} />
        </Routes>
      </Router>
  </Provider>
    
     
      
  );
}

export default App;
