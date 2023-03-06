import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { AuthContextComponent } from "./contexts/authContext";
import { ErrorPage } from "./pages/ErrorPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { List } from "./pages/ListPage";
import { Create } from "./pages/createPage";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<ProtectedRoute component={List} />} />
          <Route
            path="/create"
            element={<ProtectedRoute component={Create} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
