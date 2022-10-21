import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './Component/LogIn/login.component';
import ResetPassword from './Component/ForgotPassword/forgotpassword.component';
import Dashboard from "./Pages/Dashboard/dashboard.page";
import Header from "./Component/Header/header.component";
import Donation from "./Pages/Donation/donation";
import Usage from "./Pages/Usage/usage";
import ProductList from "./Pages/Product/product";
import Reports from "./Pages/Reports/report";

function App() {
  return (
<div className="App">
<Header IS_ACTIVE={Boolean(localStorage.getItem('ActiveSession')) ? true : false}/>
<BrowserRouter>
<Routes>
<Route path="/" element={ Boolean(localStorage.getItem('ActiveSession')) ? <Dashboard /> :<LogIn />} />
<Route path="/FortgotPassword" element={<ResetPassword />} />
<Route path="/Dashboard" element={<Dashboard />} />
<Route path="/AddDonation" element={<Donation />} />
<Route path="/AddUsage" element={<Usage />} />
<Route path="/AddItem" element={<ProductList />} />
<Route path="/Reports" element={<Reports />} />
</Routes>
</BrowserRouter>
</div>
  );
}

export default App;
