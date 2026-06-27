import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'

function App() {
  const path = window.location.pathname;
  if (path === "/admin") return <Admin />;
  return <Home />;
}

export default App
