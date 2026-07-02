import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Speakers from './pages/Speakers';
import Faq from './pages/Faq';
import Registration from './pages/Registration';
import Resources from './pages/Resources';
import Team from './pages/Team';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="speakers" element={<Speakers />} />
        <Route path="faq" element={<Faq />} />
        <Route path="registration" element={<Registration />} />
        <Route path="resources" element={<Resources />} />
        <Route path="team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
