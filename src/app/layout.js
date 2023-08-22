import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import "@/styles/bootstrap.custom.css";
import { Container } from "react-bootstrap";
import MyStoreProvider from "@/RTK/provider/provider";

export default function RootLayout({ children }) {
  return (
    <MyStoreProvider>
      <Header />
      {/* <main className="py-3" style={{ margin: "60px" }}>
        <Container>{children}</Container>
      </main> */}
      {/* <Footer /> */}
    </MyStoreProvider>
  );
}
