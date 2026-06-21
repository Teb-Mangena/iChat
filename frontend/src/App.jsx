import { Routes, Route, Navigate } from "react-router"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import { useAuth } from "@clerk/react"

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <p>Loading...</p>

  return (
    <div>

      <Routes>
        <Route
          index
          element={isSignedIn ? <HomePage /> : <Navigate to='/auth' replace />}
        />
        <Route
          path="/auth"
          element={!isSignedIn ? <AuthPage /> : <Navigate to='/' replace />}
        />
      </Routes>
    </div>
  )
}

export default App
