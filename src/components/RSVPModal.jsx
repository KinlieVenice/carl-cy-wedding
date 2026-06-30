import { useState } from "react";
import { X } from "lucide-react";

const BURGUNDY      = "#722F37";
const BURGUNDY_DARK = "#4a1c21";
const OLIVE         = "#6B7041";
const CREAM         = "#fffdf8";
const PARCHMENT     = "#f6edd9";
const FONT_TITLE    = "'Cormorant Garamond', serif";
const FONT_BODY     = "'Jost', sans-serif";

const INITIAL = {
  name: "",
  phone: "",
  email: "",
  attending: "",
  message: "",
};

const PIN = "0401";

function PinScreen({ onUnlock }) {
  const [digits, setDigits] = useState("");
  const [shake, setShake] = useState(false);

  const press = (d) => {
    if (digits.length >= 4) return;
    const next = digits + d;
    setDigits(next);
    if (next.length === 4) {
      if (next === PIN) {
        setTimeout(() => onUnlock(), 300);
      } else {
        setTimeout(() => { setShake(true); setTimeout(() => { setShake(false); setDigits(""); }, 500); }, 100);
      }
    }
  };

  const del = () => setDigits(d => d.slice(0, -1));

  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px", padding: "2.5rem 2rem 2rem" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: FONT_TITLE, fontStyle: "italic", fontWeight: 300, fontSize: "2.2rem", color: BURGUNDY, lineHeight: 1 }}>RSVP</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
          <div style={{ height: "1px", width: "36px", background: OLIVE, opacity: 0.5 }} />
          <span style={{ color: OLIVE, fontSize: "0.55rem" }}>✦</span>
          <div style={{ height: "1px", width: "36px", background: OLIVE, opacity: 0.5 }} />
        </div>
        <p style={{ fontFamily: FONT_BODY, fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.18em", color: OLIVE, textTransform: "uppercase", marginTop: "6px", marginBottom: 0 }}>
          Enter PIN to continue
        </p>
      </div>

      {/* dots */}
      <div style={{
        display: "flex", gap: "18px",
        animation: shake ? "shake 0.4s ease" : "none",
      }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width: "14px", height: "14px", borderRadius: "50%",
            background: digits.length > i ? BURGUNDY : "none",
            border: `2px solid ${digits.length > i ? BURGUNDY : "rgba(114,47,55,0.35)"}`,
            transition: "background 0.15s",
          }} />
        ))}
      </div>

      {/* keypad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", width: "220px" }}>
        {keys.map((k, i) => (
          k === "" ? <div key={i} /> :
          <button
            key={i}
            onClick={() => k === "⌫" ? del() : press(k)}
            style={{
              width: "64px", height: "64px", borderRadius: "50%",
              border: k === "⌫" ? "none" : `1.5px solid rgba(114,47,55,0.2)`,
              background: k === "⌫" ? "none" : CREAM,
              color: BURGUNDY_DARK,
              fontFamily: k === "⌫" ? FONT_BODY : FONT_TITLE,
              fontSize: k === "⌫" ? "1.1rem" : "1.6rem",
              fontWeight: 300,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: k === "⌫" ? "none" : "0 1px 4px rgba(114,47,55,0.1)",
              transition: "background 0.15s",
              justifySelf: "center",
            }}
            onMouseDown={e => { if (k !== "⌫") e.currentTarget.style.background = PARCHMENT; }}
            onMouseUp={e => { if (k !== "⌫") e.currentTarget.style.background = CREAM; }}
            onTouchStart={e => { if (k !== "⌫") e.currentTarget.style.background = PARCHMENT; }}
            onTouchEnd={e => { if (k !== "⌫") e.currentTarget.style.background = CREAM; }}
          >
            {k}
          </button>
        ))}
      </div>

      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }`}</style>
    </div>
  );
}

export default function RSVPModal({ isOpen, onClose }) {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [pinVerified, setPinVerified] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.phone.trim()) e.phone = "Please enter your phone number.";
    if (!form.attending) e.attending = "Please let us know if you'll attend.";
    return e;
  };

  const doSubmit = async () => {
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrors({ name: data.error || "Something went wrong. Please try again." });
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors({ name: "Could not reach the server. Please try again." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    try {
      const res = await fetch(`/api/rsvp/check-name?name=${encodeURIComponent(form.name.trim())}`);
      const data = await res.json();
      if (data.exists) {
        setDuplicateWarning(data.matchedName);
        return;
      }
    } catch { /* network error — proceed anyway */ }
    await doSubmit();
  };

  const handleClose = () => {
    setForm(INITIAL);
    setSubmitted(false);
    setErrors({});
    setPinVerified(false);
    setDuplicateWarning(null);
    onClose();
  };

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "0.5rem 0.75rem",
    fontSize: "0.9rem",
    fontFamily: FONT_BODY,
    color: BURGUNDY_DARK,
    border: `1px solid ${hasError ? BURGUNDY : "rgba(114,47,55,0.25)"}`,
    borderRadius: "2px",
    background: "white",
    outline: "none",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=Jost:wght@300;400&display=swap');
        .rsvp-submit:hover { opacity: 0.88; }
        .rsvp-close:hover { opacity: 0.7; }
        .rsvp-radio { accent-color: ${BURGUNDY}; }
      `}</style>

      <div
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
          backgroundColor: "rgba(74,28,33,0.55)",
          backdropFilter: "blur(4px)",
        }}
        onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      >
        <div
          style={{
            position: "relative",
            width: "100%", maxWidth: "440px",
            backgroundColor: CREAM,
            border: `1px solid ${PARCHMENT}`,
            borderRadius: "2px",
            boxShadow: "0 20px 60px rgba(74,28,33,0.25)",
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
  

          {/* Close button */}
          <button
            className="rsvp-close"
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: "absolute", top: "14px", right: "14px",
              background: "none", border: "none", cursor: "pointer",
              color: BURGUNDY, padding: "4px",
            }}
          >
            <X size={18} />
          </button>

          {duplicateWarning && (
            <div style={{
              position: "absolute", inset: 0, background: "rgba(255,253,248,0.96)",
              zIndex: 10, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", padding: "2rem",
              borderRadius: "inherit", gap: "1.2rem", textAlign: "center",
            }}>
              <div style={{ fontFamily: FONT_TITLE, fontStyle: "italic", fontSize: "1.5rem", color: BURGUNDY }}>Just a moment</div>
              <p style={{ fontFamily: FONT_BODY, fontWeight: 300, fontSize: "0.85rem", color: "#3a1a1e", lineHeight: 1.6, maxWidth: "280px" }}>
                <strong style={{ fontFamily: FONT_TITLE, fontStyle: "italic", fontWeight: 400 }}>{duplicateWarning}</strong> has already answered the RSVP.<br />Are you sure you want to submit another?
              </p>
              <div style={{ display: "flex", gap: "0.8rem" }}>
                <button
                  onClick={() => setDuplicateWarning(null)}
                  style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", letterSpacing: "0.12em", padding: "0.5rem 1.4rem", border: `1.5px solid ${BURGUNDY}`, background: "none", color: BURGUNDY, borderRadius: "2px", cursor: "pointer" }}
                >
                  Go back
                </button>
                <button
                  onClick={() => { setDuplicateWarning(null); doSubmit(); }}
                  style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", letterSpacing: "0.12em", padding: "0.5rem 1.4rem", border: "none", background: BURGUNDY, color: "#fffdf8", borderRadius: "2px", cursor: "pointer" }}
                >
                  Submit anyway
                </button>
              </div>
            </div>
          )}

          {!pinVerified ? (
            <PinScreen onUnlock={() => setPinVerified(true)} />
          ) : (
          <div style={{ padding: "2.5rem 2rem 2rem" }}>
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem 0", textAlign: "center" }}>
                <div style={{ fontFamily: FONT_TITLE, fontSize: "2.4rem", fontStyle: "italic", fontWeight: 300, color: BURGUNDY, lineHeight: 1 }}>
                  Thank You!
                </div>
                <p style={{ fontFamily: FONT_BODY, fontWeight: 300, fontSize: "0.9rem", color: BURGUNDY_DARK, lineHeight: 1.8 }}>
                  We've received your RSVP and can't wait to celebrate with you.
                </p>
                <span style={{ color: OLIVE, fontSize: "1.4rem" }}>✦</span>
                <button
                  onClick={handleClose}
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem 2rem",
                    border: `1px solid ${BURGUNDY}`,
                    background: "none",
                    color: BURGUNDY,
                    fontFamily: FONT_BODY,
                    fontWeight: 400,
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: "2px",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <div style={{ fontFamily: FONT_TITLE, fontStyle: "italic", fontWeight: 300, fontSize: "2.2rem", color: BURGUNDY, lineHeight: 1 }}>
                    RSVP
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                    <div style={{ height: "1px", width: "36px", background: OLIVE, opacity: 0.5 }} />
                    <span style={{ color: OLIVE, fontSize: "0.55rem" }}>✦</span>
                    <div style={{ height: "1px", width: "36px", background: OLIVE, opacity: 0.5 }} />
                  </div>
                  <p style={{ fontFamily: FONT_BODY, fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.22em", color: OLIVE, textTransform: "uppercase", marginTop: "6px" }}>
                    Carl &amp; Cy · November 26, 2026
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

                  {/* Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontFamily: FONT_BODY, fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BURGUNDY_DARK }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your name"
                      style={inputStyle(errors.name)}
                    />
                    {errors.name && <span style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: BURGUNDY }}>{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontFamily: FONT_BODY, fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BURGUNDY_DARK }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+63 912 345 6789"
                      style={inputStyle(errors.phone)}
                    />
                    {errors.phone && <span style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: BURGUNDY }}>{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontFamily: FONT_BODY, fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BURGUNDY_DARK }}>
                      Email{" "}
                      <span style={{ textTransform: "none", color: OLIVE, fontWeight: 300 }}>(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="your@email.com"
                      style={inputStyle(false)}
                    />
                  </div>

                  {/* Attending */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontFamily: FONT_BODY, fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BURGUNDY_DARK }}>
                      Will you attend? *
                    </label>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                      {[["yes", "Joyfully Accept"], ["no", "Regretfully Decline"]].map(([val, label]) => (
                        <label key={val} style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: FONT_BODY, fontWeight: 300, fontSize: "0.88rem", color: BURGUNDY_DARK, cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="attending"
                            value={val}
                            checked={form.attending === val}
                            onChange={set("attending")}
                            className="rsvp-radio"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                    {errors.attending && <span style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: BURGUNDY }}>{errors.attending}</span>}
                  </div>

                  {/* Message */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontFamily: FONT_BODY, fontWeight: 400, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BURGUNDY_DARK }}>
                      Message to the Couple{" "}
                      <span style={{ textTransform: "none", color: OLIVE, fontWeight: 300 }}>(optional)</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Share your wishes..."
                      rows={3}
                      style={{ ...inputStyle(false), resize: "none" }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="rsvp-submit"
                    style={{
                      marginTop: "0.25rem",
                      padding: "0.75rem",
                      background: BURGUNDY,
                      color: CREAM,
                      fontFamily: FONT_BODY,
                      fontWeight: 400,
                      fontSize: "0.7rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      border: "none",
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                  >
                    Send RSVP
                  </button>
                </form>
              </>
            )}
          </div>
          )}

          {/* Bottom accent bar */}
          <div style={{ height: "3px", background: `linear-gradient(90deg, ${BURGUNDY}, ${OLIVE}, ${BURGUNDY})` }} />
        </div>
      </div>
    </>
  );
}
