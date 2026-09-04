import { useState } from "react";
import "./FAQ.css";

function FAQ() {

  const data = [
    {
      question:"How do I place an order?",
      answer:"Browse products, add them to your cart, and proceed to checkout."
    },
    {
      question:"Are your products certified?",
      answer:"Yes. All medical equipment is sourced from trusted suppliers."
    },
    {
      question:"Can I return a product?",
      answer:"Yes. Products can be returned according to our return policy."
    },
    {
      question:"Do you provide customer support?",
      answer:"Yes. Our support team is available 24/7."
    }
  ];

  const [open,setOpen]=useState(null);

  return(
    <section className="faq">

      <h1>Frequently Asked Questions</h1>

      {data.map((item,index)=>(
        <div className="faq-item" key={index}>

          <div
            className="faq-question"
            onClick={()=>setOpen(open===index?null:index)}
          >
            {item.question}
          </div>

          {open===index && (
            <div className="faq-answer">
              {item.answer}
            </div>
          )}

        </div>
      ))}

    </section>
  );
}

export default FAQ;