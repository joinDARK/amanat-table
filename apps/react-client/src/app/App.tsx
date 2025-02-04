import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import { SnackbarProvider } from 'notistack'

import './index.css';
import LoginPage from '@/pages/LoginPage';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = (state: boolean) => {
    setIsLogin(state);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
      <SnackbarProvider/>
    </BrowserRouter>
  );
}

export default App;
