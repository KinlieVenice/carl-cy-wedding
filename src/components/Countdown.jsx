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

  const Box = ({ value, label }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <div style={{
        border: "2.5px solid rgba(255,255,255,1)",
        borderRadius: "6px",
        minWidth: "72px",
        padding: "10px 8px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
        background: "none",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "2.4rem",
          lineHeight: 1,
          color: "#fff",
          letterSpacing: "0.02em",
        }}>
          {String(value).padStart(2, "0")}
        </span>
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.6)" }} />
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 400,
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          color: "#fff",
          textTransform: "uppercase",
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

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        marginTop: "0.6rem",
        marginBottom: "0.4rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.8)", lineHeight: 1 }}>✦</span>
          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "1.6rem",
          letterSpacing: "0.12em",
          color: "#fff",
          margin: 0,
        }}>
          Counting Down To
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Box value={timeLeft.days} label="Days" />

        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.8rem", fontWeight: 300,
          color: "rgba(255,255,255,0.5)",
          marginBottom: "18px",
        }}>·</span>

        <Box value={timeLeft.hours} label="Hours" />

        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.8rem", fontWeight: 300,
          color: "rgba(255,255,255,0.5)",
          marginBottom: "18px",
        }}>·</span>

        <Box value={timeLeft.minutes} label="Minutes" />
      </div>
    </>
  );
}

export default Countdown;
