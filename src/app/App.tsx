import { Toaster } from "sonner";
import { AuthProvider } from "./providers/AuthProvider";
import RoutesProvider from "./providers/RoutesProvider";

function App() {
  return (
    <>
      <Toaster
        richColors
        position={"bottom-right"}
      />
      <AuthProvider>
        <RoutesProvider />
      </AuthProvider>
    </>
  );
}

export default App;
