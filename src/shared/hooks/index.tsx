import React, {ReactNode} from 'react';

import {AuthProvider} from './globalContext';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({children}: AppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProvider;
