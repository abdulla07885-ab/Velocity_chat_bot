import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Chat } from './pages/Chat';
import { RoutingPlayground } from './pages/RoutingPlayground';
import { History } from './pages/History';
import { Analytics } from './pages/Analytics';
import { Models } from './pages/Models';
import { Security } from './pages/Security';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="c/:id" element={<Chat />} />
          <Route path="playground" element={<RoutingPlayground />} />
          <Route path="history" element={<History />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="models" element={<Models />} />
          <Route path="security" element={<Security />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
