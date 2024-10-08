import TextBox from "./(components)/textBox";
import Navbar from "./(components)/navbar";
import Footer from "./(components)/footer";

export default function Home() {
  return (
    <div className="flex flex-col bg-slate-200 h-full sm:h-screen">
      <Navbar />
      <TextBox />
      <Footer />
    </div>
  );
}