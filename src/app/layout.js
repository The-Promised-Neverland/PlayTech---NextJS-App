import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import "@/styles/bootstrap.custom.css";
import { Container } from "@/components/ReactBootStrap";
import MyStoreProvider from "@/RTK/provider/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MyStoreProvider>
          <Header />
          <main className="py-3" style={{ margin: "60px" }}>
            <Container>{children}</Container>
          </main>
          <Footer />
          <ToastContainer />
        </MyStoreProvider>
      </body>
    </html>
  );
}
