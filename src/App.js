import "./App.css";
import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Importación de componentes
import Login from "./components/auths/Login";
import Landing from "./components/landing/Landing";
import ForgotPassword from "./components/auths/ForgotPassword";
import ResetPassword from "./components/auths/ResetPassword";
import Registro from "./components/auths/Registro";

// Admin Components
import AdminPage from "./components/dashboard/admin/AdminPage";
import AddAdmin from "./components/dashboard/admin/AddAdmin";
import GetAllLoans from "./components/dashboard/pages/loans/ClientLoans";
import AddLoan from "./components/dashboard/pages/loans/AddLoan";
import EditLoan from "./components/dashboard/pages/loans/EditLoan";
import AddLoans from "./components/dashboard/pages/loans/AddLoans";
import Home from "./components/dashboard/pages/home/Home";
import AddBorrower from "./components/dashboard/pages/borrowers/AddBorrower";
import Borrower from "./components/dashboard/pages/borrowers/Borrower";
import Borrowers from "./components/dashboard/pages/borrowers/Borrowers";
import EditBorrower from "./components/dashboard/pages/borrowers/EditBorrower";
import Payments from "./components/dashboard/pages/payments/AllPayments";
import EmailPage from "./components/dashboard/pages/messages/EmailPage";
import PaymentLoansInfo from "./components/dashboard/pages/payments/PaymentLoanInfo";

// User Components (Mismos que admin pero en carpetas diferentes)
import HomeUser from "./components/dashboard/pagesUser/homeUser/HomeUser";
import GetAllLoansUser from "./components/dashboard/pagesUser/loansUser/ClientLoansUser";
import AddLoanUser from "./components/dashboard/pagesUser/loansUser/AddLoanUser";
import EditLoanUser from "./components/dashboard/pagesUser/loansUser/EditLoanUser";
import AddLoansUser from "./components/dashboard/pagesUser/loansUser/AddLoansUser";
import BorrowersUser from "./components/dashboard/pagesUser/borrowersUser/BorrowersUser";
import BorrowerUser from "./components/dashboard/pagesUser/borrowersUser/BorrowerUser";
import EditBorrowerUser from "./components/dashboard/pagesUser/borrowersUser/EditBorrowerUser";
import PaymentsUser from "./components/dashboard/pagesUser/paymentsUser/AllPaymentsUser";
import EmailPageUser from "./components/dashboard/pagesUser/messagesUser/EmailPageUser";
import PaymentLoansInfoUser from "./components/dashboard/pagesUser/paymentsUser/PaymentLoanInfoUser";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <div className="App py-10 px-10">
        <Fragment>
          <Routes>
            {/* LANDING PAGE */}
            <Route path="/" element={<Landing />} />
            <Route path="/registro" element={<Registro />} />

            {/* AUTH */}
            <Route
              path="/login"
              element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/home" />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={isAuthenticated ? <AdminPage setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              path="/addAdmin"
              element={isAuthenticated ? <AddAdmin setAuth={setAuth} /> : <Navigate to="/admin" />}
            />

            {/* HOME */}
            <Route
              path="/home"
              element={isAuthenticated ? <Home setAuth={setAuth} /> : <Navigate to="/login" />}
            />

            {/* BORROWERS */}
            <Route
              path="/borrowers"
              element={isAuthenticated ? <Borrowers setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              path="/borrower/:id"
              element={isAuthenticated ? <Borrower setAuth={setAuth} /> : <Navigate to="/borrowers" />}
            />
            <Route
              path="/editBorrower/:id"
              element={isAuthenticated ? <EditBorrower setAuth={setAuth} /> : <Navigate to="/borrowers" />}
            />
            <Route
              path="/addBorrower"
              element={isAuthenticated ? <AddBorrower setAuth={setAuth} /> : <Navigate to="/borrowers" />}
            />

            {/* LOANS */}
            <Route
              path="/loans"
              element={isAuthenticated ? <GetAllLoans setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              path="/addLoan"
              element={isAuthenticated ? <AddLoans setAuth={setAuth} /> : <Navigate to="/loans" />}
            />
            <Route
              path="/editLoan/:id"
              element={isAuthenticated ? <EditLoan setAuth={setAuth} /> : <Navigate to="/loans" />}
            />

            {/* PAYMENTS */}
            <Route
              path="/payments"
              element={isAuthenticated ? <Payments setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment/:client_id/:loan_id"
              element={isAuthenticated ? <PaymentLoansInfo setAuth={setAuth} /> : <Navigate to="/loans" />}
            />

            {/* MESSAGES */}
            <Route
              path="/emailClient"
              element={isAuthenticated ? <EmailPage setAuth={setAuth} /> : <Navigate to="/home" />}
            />

            {/* USUARIOS */}
            {[
              { path: "homeUser", component: <HomeUser setAuth={setAuth} /> },
              { path: "loansUser", component: <GetAllLoansUser setAuth={setAuth} /> },
              { path: "addLoanUser", component: <AddLoansUser setAuth={setAuth} /> },
              { path: "editLoanUser/:id", component: <EditLoanUser setAuth={setAuth} /> },
              { path: "borrowersUser", component: <BorrowersUser setAuth={setAuth} /> },
              { path: "borrowerUser/:id", component: <BorrowerUser setAuth={setAuth} /> },
              { path: "editBorrowerUser/:id", component: <EditBorrowerUser setAuth={setAuth} /> },
              { path: "paymentsUser", component: <PaymentsUser setAuth={setAuth} /> },
              { path: "paymentUser/:client_id/:loan_id", component: <PaymentLoansInfoUser setAuth={setAuth} /> },
              { path: "emailClientUser", component: <EmailPageUser setAuth={setAuth} /> },
            ].map(({ path, component }) => (
              <Route key={path} path={`/${path}`} element={isAuthenticated ? component : <Navigate to="/login" />} />
            ))}
          </Routes>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
