export default function PolaroidCard({
  image,
  colors = [],
  selectedColor,
  onColorSelect,
  caption,

  // Polaroid
  rotation = 0,
  position = "",
  className = "",
  polaroidClassName = "",
  style = {},

  // Scrap
  scrapWidth = 120,
  scrapHeight = 60,
  scrapPosition = "bottom-right",
  scrapRotation = -12,
  scrapClassName = "",

  // Scrap Text
  scrapText = [],
  scrapTextMaxWidth = 120,
  scrapTextClassName = "",

  // Tape
  tapeText = "",
  tapeClassName = "",
}) {
  const scrapPositions = {
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",

    "outside-left": "-left-24 top-1/2 -translate-y-1/2",
    "outside-right": "-right-24 top-1/2 -translate-y-1/2",
    "outside-top": "-top-14 left-1/2 -translate-x-1/2",
    "outside-bottom": "-bottom-14 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={`relative inline-block overflow-visible ${position} ${className}`}
    >
      {/* ================= TAPE ================= */}
      {tapeText && (
        <div
          className={`
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            z-20
            bg-yellow-200/80
            shadow-md
            text-xs
            font-medium
            px-10
            py-5
            whitespace-nowrap
            ${tapeClassName}
          `}
          
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {tapeText}
        </div>
      )}

      {/* ================= SCRAP ================= */}
      <div
        className={`
          absolute
          z-0
          pointer-events-none
          select-none
          ${scrapPositions[scrapPosition]}
          ${scrapClassName}
        `}
        style={{
          width: scrapWidth,
          height: scrapHeight,
          transform: `rotate(${scrapRotation}deg)`,
        }}
      >
        <img
          src="/images/scrap.png"
          alt=""
          className="absolute inset-0 h-full w-full object-fill"
        />

        {scrapText?.length > 0 && (
          <ul
            className={`
              absolute inset-0
              flex flex-col justify-center
              text-md leading-tight
              px-4
              ${scrapTextClassName}
            `}
            style={{
              transform: `rotate(${-scrapRotation}deg)`,
              maxWidth: scrapTextMaxWidth,
              margin: "0 auto",
            }}
          >
            {scrapText.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= POLAROID ================= */}
      <div
        className={`
          relative
          z-10
          w-[350px]
          bg-white
          p-3
          pb-6
          shadow-xl
          ${polaroidClassName}
        `}
        style={{
          transform: `rotate(${rotation}deg)`,
          ...style,
        }}
      >
        {/* Photo */}
        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>

        {/* Content */}
        <div className="mt-5 flex flex-col items-center gap-4">
          {caption && (
            <p className="text-center text-sm font-medium">{caption}</p>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => onColorSelect?.(color)}
                className={`h-7 w-7 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "scale-110 border-black"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
