import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/Redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { SocketProvider } from "./utils/Context/SocketContext.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StrictMode>
        <BrowserRouter>
          <SocketProvider>
            <App />
          </SocketProvider>
          <ToastContainer />
        </BrowserRouter>
      </StrictMode>
    </PersistGate>
  </Provider>
);
