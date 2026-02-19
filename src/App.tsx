import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import ChatList from '@/pages/ChatList';
import ChatRoom from '@/pages/ChatRoom';
import Profile from '@/pages/Profile';
import Listing from '@/pages/Listing';
import Settings from '@/pages/Settings';
import ItemDetail from '@/pages/ItemDetail';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/chat/:matchId" element={<ChatRoom />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

