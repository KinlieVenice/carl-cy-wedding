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

export default function RSVPModal({ isOpen, onClose }) {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.phone.trim()) e.phone = "Please enter your phone number.";
    if (!form.attending) e.attending = "Please let us know if you'll attend.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
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

  const handleClose = () => {
    setForm(INITIAL);
    setSubmitted(false);
    setErrors({});
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

          {/* Bottom accent bar */}
          <div style={{ height: "3px", background: `linear-gradient(90deg, ${BURGUNDY}, ${OLIVE}, ${BURGUNDY})` }} />
        </div>
      </div>
    </>
  );
}
