import type { AppProps } from "next/app";
import { ThemeProvider } from "@/hooks/useTheme";
import { UsuarioProvider } from "@/hooks/useUsuario";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UsuarioProvider>
        <Component {...pageProps} />
      </UsuarioProvider>
    </ThemeProvider>
  );
}
