import React from "react";

// Context
import { UserContextProvider } from "./context/UserContext";

import { RootNavigator } from "./navigation";

export default function App() {
  return (
    <UserContextProvider>
      <RootNavigator />
    </UserContextProvider>
  );
}
