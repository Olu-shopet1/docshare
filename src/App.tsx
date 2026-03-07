import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocumentProvider } from '@/context/DocumentContext';
import { Layout } from '@/components/Layout';
import { ProfilePage } from '@/pages/ProfilePage';
import { Dashboard } from '@/pages/Dashboard';
import { Gallery } from '@/pages/Gallery';
import { PageBuilder } from '@/pages/PageBuilder';

function App() {
  return (
    <BrowserRouter>
      <DocumentProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/builder" element={<PageBuilder />} />
          </Routes>
        </Layout>
      </DocumentProvider>
    </BrowserRouter>
  );
}

export default App;
