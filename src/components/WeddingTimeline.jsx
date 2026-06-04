const timeline = [
  {
    time: "2:00 PM",
    title: "Wedding Ceremony",
    desc: "The moment we say I do 💍",
  },
  {
    time: "4:30 PM",
    title: "Cocktail Hour",
    desc: "Drinks, snacks, and mingling 🍸",
  },
  {
    time: "6:30 PM",
    title: "First Dance",
    desc: "Our first dance as husband & wife 💃",
  },
  {
    time: "7:30 PM",
    title: "Dinner",
    desc: "Let’s eat and celebrate together 🍽️",
  },
  {
    time: "9:00 PM",
    title: "After Party",
    desc: "Let’s dance the night away 🎉",
  },
];

export default function WeddingTimeline() {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="relative w-[420px]">
        {/* CENTER LINE */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-300" />

        {/* ITEMS */}
        <div className="flex flex-col gap-10">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex items-start">
              {/* DOT */}
              <div className="absolute left-5 w-4 h-4 bg-white border-2 border-gray-400 rounded-full z-10" />

              {/* CARD */}
              <div className="ml-14 bg-white shadow-lg p-4 rounded-lg w-full border border-gray-100">
                {/* TIME */}
                <div className="text-xs font-semibold text-gray-500">
                  {item.time}
                </div>

                {/* TITLE */}
                <div className="text-base font-bold text-gray-800 mt-1">
                  {item.title}
                </div>

                {/* DESC */}
                <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
