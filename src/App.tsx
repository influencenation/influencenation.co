import React from 'react';

import './App.css';
import useAuth from './contexts/auth-context/use-auth';
import Anonymous from './pages/anonymous';

function App() {
  const auth = useAuth();
  if (!auth.user) {
    return <Anonymous />;
  }
  return (
    <div>
      <div>Authenticated user</div>
    </div>
  );
}

export default App;
