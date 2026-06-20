import { useEffect, useState } from "react";

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const vh = window.screen.height; // use screen height — unaffected by browser bar
  const small = vh < 750;
  const tiny = vh < 620;
  const micro = vh < 500;

  const Box = ({ value, label }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <div style={{
        border: "1.5px solid rgba(255,255,255,0.9)",
        borderRadius: "6px",
        minWidth: micro ? "34px" : tiny ? "42px" : small ? "52px" : "72px",
        padding: micro ? "3px 3px 3px" : tiny ? "4px 4px 4px" : small ? "6px 6px 5px" : "10px 8px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
        background: "rgba(0,0,0,0.35)",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: micro ? "0.85rem" : tiny ? "1.1rem" : small ? "1.5rem" : "2.4rem",
          lineHeight: 1,
          color: "#fff",
          letterSpacing: "0.02em",
          textShadow: "0 1px 8px rgba(0,0,0,0.5)",
        }}>
          {String(value).padStart(2, "0")}
        </span>
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.6)" }} />
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
          fontSize: micro ? "0.3rem" : tiny ? "0.38rem" : small ? "0.45rem" : "0.58rem",
          letterSpacing: "0.18em",
          color: "#fff",
          textTransform: "uppercase",
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
        }}>
          {label}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@300&display=swap');
      `}</style>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 500,
        fontStyle: "italic",
        fontSize: micro ? "0.65rem" : tiny ? "0.85rem" : small ? "1.1rem" : "1.6rem",
        letterSpacing: "0.06em",
        color: "#fff",
        textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)",
        marginTop: micro ? "0.05rem" : tiny ? "0.1rem" : small ? "0.25rem" : "0.6rem",
        marginBottom: micro ? "0.05rem" : tiny ? "0.1rem" : small ? "0.2rem" : "0.4rem",
      }}>
        counting down to
      </p>

      <div style={{ display: "flex", gap: micro ? "6px" : tiny ? "8px" : "12px", alignItems: "center" }}>
        <Box value={timeLeft.days} label="Days" />

        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: micro ? "1.2rem" : "1.8rem", fontWeight: 300,
          color: "rgba(255,255,255,0.5)",
          marginBottom: "18px",
        }}>·</span>

        <Box value={timeLeft.hours} label="Hours" />

        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: micro ? "1.2rem" : "1.8rem", fontWeight: 300,
          color: "rgba(255,255,255,0.5)",
          marginBottom: "18px",
        }}>·</span>

        <Box value={timeLeft.minutes} label="Minutes" />
      </div>
    </>
  );
}

export default Countdown;
