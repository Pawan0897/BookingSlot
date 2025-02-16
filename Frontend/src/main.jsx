import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layouts from "./Components/Layouts.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { persiststore, store } from "./Redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
const Queryclient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persiststore}>
        <QueryClientProvider client={Queryclient}>
          <Layouts />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
