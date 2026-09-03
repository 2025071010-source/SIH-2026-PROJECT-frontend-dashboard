import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import GISMapPage from './pages/GISMapPage';
import ImagesPage from './pages/ImagesPage';
import AnalysisPage from './pages/AnalysisPage';
import ReportsPage from './pages/ReportsPage';

const PAGES = {
  Dashboard,
  'GIS Map': GISMapPage,
  Images: ImagesPage,
  Analysis: AnalysisPage,
  Reports: ReportsPage,
};

function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const ActivePageComponent = PAGES[activePage] || Dashboard;

  return (
    <div className="app-shell">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="app-main">
        <ActivePageComponent />
      </main>
    </div>
  );
}

export default App;
