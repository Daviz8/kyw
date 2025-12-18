"use client";

import { faqs } from "@/lib";
import { useState } from "react";
import { ContactForm } from "../home/components/ContactForm";
import { Navbar , Footer } from "../components";

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-[18px]">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            onClick={() => toggle(index)}
            className="bg-[#121521] rounded-lg px-6 py-4 cursor-pointer transition-all"
          >
            {/* QUESTION ROW */}
            <div className="flex justify-between items-center">
              <p className="text-sm md:text-base">{faq.question}</p>

              {/* ICON */}
              <span className="text-[30px] transition-transform duration-300">
                {isOpen ? "−" : "+"}
              </span>
            </div>

            {/* ANSWER */}
            <div
              className={`grid transition-all duration-300 overflow-hidden ${
                isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
              }`}
            >
              <div className="text-gray-400 text-base leading-relaxed overflow-hidden">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}



export default function Page() {
  return (
    <>
    <Navbar/>
    <section className="max-w-[867px] px-4 mx-auto">
      <header className="mt-[109px] mb-[54px]">
        <div className="flex items-center justify-center space-x-4">
          <span className="w-16 h-0.5 bg-[#32CD32]"></span>
          <h2 className="lg:text-2xl font-play text-sm font-semibold text-white">
            Help
          </h2>
          <span className="w-16 h-0.5 bg-[#32CD32]"></span>
        </div>

        <div className="text-center pt-[37px] italic font-black text-base md:text-[40px] leading-10 py-5">
          <h1 className="text-white font-play-italic">
            Frequently Asked Questions
          </h1>
        </div>
      </header>
      <FAQ />
      <div className="h-[109px]" />
      <ContactForm />
    </section>
    <Footer/>
    </>
  );
}
