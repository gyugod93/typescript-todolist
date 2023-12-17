import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

export default App;
