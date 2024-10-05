import { Toaster } from "react-hot-toast";
import ApiChainBuilder from "./components/ApiChainBuilder";
import HeaderBuilder from "./components/HeaderBuilder";
import { store } from "./state/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col md:flex-row items-start h-full w-screen">
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <ApiChainBuilder />
        <HeaderBuilder />
      </div>
    </Provider>
  );
};

export default App;
