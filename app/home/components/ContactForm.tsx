export function ContactForm() {
  return (
    <section className="max-w-[636px] pb-[196px] space-y-12 mx-auto px-7">
      <h1 className="text-[40px] text-white leading-[100%] italic font-play-italic font-black text-center">
        Have a question, idea, or project in mind?
      </h1>
      <p className=" text-center text-lg">
        {" "}
Whether you are seeking specialized developmental support for your child or professional
 counseling for your own mental well-being, I am here to help.
  we open to new connections and creative possibilities. We’d love to hear from you.
      </p>
      <form className="space-y-9">
        <div className="space-y-[10pxs]">
            <label htmlFor="" className="block font-bold text-base">Your email address</label>
            <input type="text" className="border block outline-[#32CD32] border-[#353535] h-[63px] bg-white rounded-[15px] w-full text-black" />
        </div> 
        <div className="space-y-[10pxs]">
            <label htmlFor="" className="block  font-bold text-base">Your Name</label>
            <input type="text" className="border outline-[#32CD32] block border-[#353535] h-[63px] bg-white rounded-[15px] w-full text-black" />
        </div> <div className="space-y-[10pxs]">
            <label htmlFor="" className="block font-bold text-base">Subject</label>
            <input type="text" className="border outline-[#32CD32] block border-[#353535] h-[63px] bg-white rounded-[15px] w-full  text-black" />
        </div> <div className="space-y-[10pxs]">
            <label htmlFor="" className="block font-bold text-base">Description</label>
            <textarea className="border block outline-[#32CD32] border-[#353535] h-[247px] resize-none bg-white rounded-[15px] w-full  text-black" />
        </div>
        <div className="pt-[17px] max-w-[212px] mx-auto">
            <button className="bg-[#32CD32] text-white h-11 rounded-full w-full font-bold text-sm">Submit</button>
        </div>
      </form>
    </section>
  );
}