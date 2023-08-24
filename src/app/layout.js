import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import "@/styles/bootstrap.custom.css";
import { Container } from "@/components/ReactBootStrap";
import MyStoreProvider from "@/RTK/provider/provider";

export default function RootLayout({ children }) {
  return (
    <MyStoreProvider>
      <html lang="en">
        <body>
          <Header />
          <main className="py-3" style={{ margin: "60px" }}>
            <Container>{children}</Container>
          </main>
          <Footer />
        </body>
      </html>
    </MyStoreProvider>
  );
}
