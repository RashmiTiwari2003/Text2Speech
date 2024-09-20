import Image from "next/image";
import TextBox from "./(components)/textBox";
import Navbar from "./(components)/navbar";

export default function Home() {
  return (
    <div className="flex flex-col bg-slate-200 h-full sm:h-screen">
      <Navbar/>
      <TextBox/>
    </div>
  );
}