import { Routes, Route } from "react-router"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <div>

      <Routes>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="/auth"
          element={<AuthPage />}
        />
      </Routes>
    </div>
  )
}

export default App
