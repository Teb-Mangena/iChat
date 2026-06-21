import { Routes, Route, Navigate } from "react-router"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import { useAuth } from "@clerk/react"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"

function App() {
  const { isLoaded, isSignedIn } = useAuth();
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) checkAuth()
    else clearAuth()
  }, [checkAuth, clearAuth, isLoaded, isSignedIn])

  if (!isLoaded || (isSignedIn && isCheckingAuth)) return <p>Loading...</p>

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
      <Toaster />
    </div>
  )
}

export default App
