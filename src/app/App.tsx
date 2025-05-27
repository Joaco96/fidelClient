import { Toaster } from "sonner";
import { AuthProvider } from "./providers/AuthProvider";
import RoutesProvider from "./providers/RoutesProvider";

function App() {
  return (
    <AuthProvider>
      <Toaster richColors position={"bottom-right"} />
      <RoutesProvider />
    </AuthProvider>
  );
}

export default App;
