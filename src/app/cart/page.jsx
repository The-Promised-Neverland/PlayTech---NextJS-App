import store from "@/RTK/store/store";
import ShowCart from "@/components/ShowCart";

export async function generateMetadata() {
  return {
    title: `Cart`,
    description:
      "Explore the world of cutting-edge technology with PlayTech, an e-commerce platform built using Next.js and React. Dive into a vast array of electronics, gadgets, and top-of-the-line products. Play hard, Play Tech",
    generator: "Next.js 13",
    applicationName: "PlayTech",
    keywords: ["CartItems"],
    authors: [
      {
        name: "Abhijit Roy (RainX)",
        url: [
          "https://github.com/The-Promised-Neverland",
          "https://leetcode.com/Decode_Apocalypse/",
          "https://auth.geeksforgeeks.org/user/rainx",
          "https://pastebin.com/u/RainX_69",
        ],
      },
    ],
    creator: "Abhijit Roy (RainX)",
    icons: {
      icon: "/cart.ico",
    },
  };
}

const Cart = () => {
  return <ShowCart />;
};

export default Cart;
