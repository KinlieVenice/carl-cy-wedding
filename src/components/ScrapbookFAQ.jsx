import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need to RSVP?",
    a: "Yes. Please RSVP on or before October 27, 2026 so we can plan everything—from the food and seating to all the little details—just right for you.",
  },
  {
    q: "Is parking available at the venue?",
    a: "Yes, parking is available for guests at the venue. Please note that parking spaces are offered on a first-come, first-served basis.",
  },
  {
    q: "I declined the RSVP but my plans have changed and I can attend now. What should I do?",
    a: "We completely understand that plans can change! Please reach out to us as soon as possible, and we'll do our best to accommodate you based on venue capacity and catering arrangements.",
  },
  {
    q: "What if I RSVP'd but can no longer attend?",
    a: "We'll definitely miss you, but we understand that unexpected things happen. Kindly let us know as soon as possible so we can update our guest list and reallocate your seat.",
  },
  {
    q: "Can I bring a plus one?",
    a: "We would love to celebrate with everyone, but due to limited capacity, we kindly ask that only the guests named on the invitation attend. We truly appreciate your understanding.",
  },
  {
    q: "Am I allowed to take photos and videos during the ceremony?",
    a: "Absolutely! Feel free to capture special moments throughout the day. We simply ask that you remain mindful of other guests and avoid obstructing anyone's view during the ceremony.",
  },
  {
    q: "Can I bring my children to the wedding?",
    a: "As much as we adore your little ones, we've chosen to make our wedding an adults-only celebration. We hope you'll still be able to join us and enjoy a wonderful evening with us.",
  },
  {
    q: "Do you have a gift preference?",
    a: "Your presence at our wedding is truly the greatest gift we could ask for. However, if you would like to bless us with a gift, a monetary contribution would be sincerely appreciated as we begin this new chapter of our lives together.",
  },
];

const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];

export default function ScrapbookFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      {/* Title */}
      <div className="mb-14 flex justify-center">
        <div className="relative">
          <div className="absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 rotate-[-6deg] bg-[#f6d9a6]/70" />

          <h2 className="relative bg-[#fffdf8] px-8 py-4 text-4xl font-light tracking-[0.2em] shadow-lg">
            FAQs
          </h2>
        </div>
      </div>

      {/* FAQ Cards */}
      <div className="space-y-8">
        {faqs.map((faq, index) => {
          const isOpen = open === index;

          return (
            <div
              key={index}
              className={`relative bg-[#fffdf8] p-6 shadow-xl transition-all duration-300 ${rotations[index % rotations.length]}`}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-10 h-8 w-24 rotate-[-8deg] bg-[#f4dcb4]/70 backdrop-blur-sm" />

              {/* Border */}
              <div className="pointer-events-none absolute inset-2 border border-[#e6d8c3]" />

              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 text-left"
              >
                <span className="text-lg font-medium text-[#5b5147]">
                  {faq.q}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 text-[#8d7f71] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="leading-8 text-[#7a6f64]">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
