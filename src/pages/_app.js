import "@/index.css";
import useLocalStorage from "use-local-storage";
import { Provider, CartProvider } from "@/templates/appContext";
import Template from "@/Components/Template/Template";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useLocalStorage("user", null);
  return (
    <Provider value={{ user, setUser }}>
      <CartProvider>
        <Template>
          <Component {...pageProps} />
        </Template>
      </CartProvider>
    </Provider>
  );
}
