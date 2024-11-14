import { QueryClient, QueryClientProvider } from "react-query";
import { PropsWithChildren } from "react";

const client = new QueryClient();

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
