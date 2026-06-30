import { useState, useEffect } from "react";

const PIN = "090122";
const B = "#722F37";
const BD = "#4a1c21";
const OLIVE = "#6B7041";
const CREAM = "#fffdf8";
const PARCH = "#f6edd9";
const FT = "'Cormorant Garamond', serif";
const FB = "'Jost', sans-serif";

// ── PIN Screen ────────────────────────────────────────────────
function PinScreen({ onUnlock }) {
  const [digits, setDigits] = useState("");
  const [shake, setShake] = useState(false);

  const press = (d) => {
    if (digits.length >= 6) return;
    const next = digits + d;
    setDigits(next);
    if (next.length === 6) {
      if (next === PIN) {
        setTimeout(() => onUnlock(), 300);
      } else {
        setTimeout(() => {
          setShake(true);
          setTimeout(() => { setShake(false); setDigits(""); }, 500);
        }, 100);
      }
    }
  };

  const del = () => setDigits(d => d.slice(0, -1));
  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: CREAM, fontFamily: FB,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@300;400&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
        .pin-key:active { background: ${PARCH} !important; }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px", padding: "3rem 2rem" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: FT, fontStyle: "italic", fontWeight: 300, fontSize: "2.4rem", color: B }}>Admin</div>
          <p style={{ fontFamily: FB, fontSize: "0.7rem", letterSpacing: "0.18em", color: OLIVE, textTransform: "uppercase", marginTop: "8px", marginBottom: 0 }}>
            Enter PIN
          </p>
        </div>

        <div style={{ display: "flex", gap: "14px", animation: shake ? "shake 0.4s ease" : "none" }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{
              width: "13px", height: "13px", borderRadius: "50%",
              background: digits.length > i ? B : "none",
              border: `2px solid ${digits.length > i ? B : "rgba(114,47,55,0.3)"}`,
              transition: "background 0.15s",
            }} />
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {keys.map((k, i) => (
            k === "" ? <div key={i} /> :
            <button key={i} className="pin-key" onClick={() => k === "⌫" ? del() : press(k)}
              style={{
                width: "68px", height: "68px", borderRadius: "50%",
                border: k === "⌫" ? "none" : `1.5px solid rgba(114,47,55,0.2)`,
                background: k === "⌫" ? "none" : CREAM,
                color: BD, fontFamily: k === "⌫" ? FB : FT,
                fontSize: k === "⌫" ? "1.2rem" : "1.7rem", fontWeight: 300,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: k === "⌫" ? "none" : "0 1px 4px rgba(114,47,55,0.1)",
                justifySelf: "center",
              }}
            >{k}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Edit Modal ────────────────────────────────────────────────
function EditModal({ rsvp, onSave, onClose }) {
  const [form, setForm] = useState({
    name: rsvp.name,
    phone: rsvp.phone,
    email: rsvp.email || "",
    attending: rsvp.attending,
    message: rsvp.message || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const save = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.attending) {
      setError("Name, phone, and attendance required."); return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/rsvp/carycyadmin/${rsvp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Error saving."); setSaving(false); return; }
      onSave(data.rsvp);
    } catch { setError("Network error."); setSaving(false); }
  };

  const inp = {
    width: "100%", padding: "0.45rem 0.7rem", fontFamily: FB,
    fontSize: "0.88rem", color: BD, border: "1px solid rgba(114,47,55,0.25)",
    borderRadius: "3px", background: "white", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(74,28,33,0.5)", padding: "1rem",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: CREAM, borderRadius: "4px", width: "100%", maxWidth: "420px", padding: "2rem", boxShadow: "0 20px 60px rgba(74,28,33,0.25)" }}>
        <div style={{ fontFamily: FT, fontSize: "1.5rem", fontStyle: "italic", color: B, marginBottom: "1.2rem" }}>Edit RSVP #{rsvp.id}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <div><label style={{ fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BD }}>Name</label><input style={inp} value={form.name} onChange={set("name")} /></div>
          <div><label style={{ fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BD }}>Phone</label><input style={inp} value={form.phone} onChange={set("phone")} /></div>
          <div><label style={{ fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BD }}>Email</label><input style={inp} value={form.email} onChange={set("email")} /></div>
          <div>
            <label style={{ fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BD }}>Attending</label>
            <select style={{ ...inp, marginTop: "4px" }} value={form.attending} onChange={set("attending")}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div><label style={{ fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: BD }}>Message</label><textarea style={{ ...inp, resize: "vertical", minHeight: "60px" }} value={form.message} onChange={set("message")} /></div>
        </div>
        {error && <p style={{ color: B, fontFamily: FB, fontSize: "0.78rem", marginTop: "0.7rem" }}>{error}</p>}
        <div style={{ display: "flex", gap: "10px", marginTop: "1.2rem", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "0.5rem 1.4rem", border: `1px solid rgba(114,47,55,0.3)`, background: "none", color: BD, fontFamily: FB, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "3px", cursor: "pointer" }}>Cancel</button>
          <button onClick={save} disabled={saving} style={{ padding: "0.5rem 1.4rem", border: "none", background: B, color: CREAM, fontFamily: FB, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "3px", cursor: "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving…" : "Save"}</button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────
function Dashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/rsvp/carycyadmin")
      .then(r => r.json())
      .then(d => { setRows(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/rsvp/carycyadmin/${id}`, { method: "DELETE" });
    setRows(r => r.filter(x => x.id !== id));
    setDeleting(null);
  };

  const handleSave = (updated) => {
    setRows(r => r.map(x => x.id === updated.id ? updated : x));
    setEditing(null);
  };

  const visible = rows.filter(r => {
    const matchFilter = filter === "all" || r.attending === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.phone.includes(q) || (r.email || "").toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const yesCount = rows.filter(r => r.attending === "yes").length;
  const noCount = rows.filter(r => r.attending === "no").length;

  const cellStyle = { padding: "10px 12px", fontFamily: FB, fontSize: "0.82rem", color: BD, borderBottom: "1px solid rgba(114,47,55,0.1)", verticalAlign: "middle" };
  const headStyle = { padding: "10px 12px", fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: OLIVE, borderBottom: `2px solid rgba(114,47,55,0.15)`, textAlign: "left", whiteSpace: "nowrap" };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f4ee", fontFamily: FB }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@300;400&display=swap');
        * { box-sizing: border-box; }
        .row-hover:hover { background: #fdf6ee !important; }
        .act-btn:hover { opacity: 0.75; }
      `}</style>

      {/* Header */}
      <div style={{ background: B, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ fontFamily: FT, fontStyle: "italic", fontSize: "1.5rem", color: CREAM }}>Carl &amp; Cy</div>
        <div style={{ width: "1px", height: "20px", background: "rgba(255,253,248,0.3)" }} />
        <div style={{ fontFamily: FB, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,253,248,0.7)" }}>RSVP Admin</div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {[["Total", rows.length, "#555"], ["Attending", yesCount, OLIVE], ["Declining", noCount, B]].map(([label, val, color]) => (
            <div key={label} style={{ background: CREAM, border: "1px solid rgba(114,47,55,0.12)", borderRadius: "6px", padding: "14px 20px", minWidth: "100px" }}>
              <div style={{ fontFamily: FT, fontSize: "2rem", fontWeight: 300, color, lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: OLIVE, marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "1rem", flexWrap: "wrap" }}>
          <input
            placeholder="Search name, phone, email…"
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: "0.45rem 0.8rem", fontFamily: FB, fontSize: "0.82rem", border: "1px solid rgba(114,47,55,0.2)", borderRadius: "4px", background: CREAM, color: BD, outline: "none", flexGrow: 1, minWidth: "180px" }}
          />
          {["all","yes","no"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "0.45rem 1rem", fontFamily: FB, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", border: `1px solid rgba(114,47,55,0.2)`, borderRadius: "4px", background: filter === f ? B : CREAM, color: filter === f ? CREAM : BD, cursor: "pointer" }}>
              {f === "all" ? "All" : f === "yes" ? "Attending" : "Declining"}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: CREAM, borderRadius: "6px", border: "1px solid rgba(114,47,55,0.12)", overflowX: "auto" }}>
          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center", fontFamily: FB, color: OLIVE }}>Loading…</div>
          ) : visible.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", fontFamily: FB, color: OLIVE }}>No records found.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr>
                  {["#","Name","Phone","Email","Attending","Message","Date","Actions"].map(h => (
                    <th key={h} style={headStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map(r => (
                  <tr key={r.id} className="row-hover" style={{ background: "transparent" }}>
                    <td style={{ ...cellStyle, color: "rgba(74,28,33,0.4)", fontSize: "0.75rem" }}>{r.id}</td>
                    <td style={{ ...cellStyle, fontWeight: 400 }}>{r.name}</td>
                    <td style={cellStyle}>{r.phone}</td>
                    <td style={{ ...cellStyle, color: r.email ? BD : "rgba(74,28,33,0.3)" }}>{r.email || "—"}</td>
                    <td style={cellStyle}>
                      <span style={{
                        display: "inline-block", padding: "2px 10px", borderRadius: "20px", fontSize: "0.65rem",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        background: r.attending === "yes" ? "rgba(107,112,65,0.12)" : "rgba(114,47,55,0.1)",
                        color: r.attending === "yes" ? OLIVE : B,
                        border: `1px solid ${r.attending === "yes" ? "rgba(107,112,65,0.3)" : "rgba(114,47,55,0.25)"}`,
                      }}>
                        {r.attending === "yes" ? "Yes" : "No"}
                      </span>
                    </td>
                    <td style={{ ...cellStyle, maxWidth: "160px" }}>
                      {r.message ? (
                        <span onClick={() => setViewing(r)} style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: B, cursor: "pointer", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "3px" }}>
                          {r.message}
                        </span>
                      ) : <span style={{ color: "rgba(74,28,33,0.3)" }}>—</span>}
                    </td>
                    <td style={{ ...cellStyle, fontSize: "0.75rem", whiteSpace: "nowrap" }}>{new Date(r.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td style={{ ...cellStyle, whiteSpace: "nowrap" }}>
                      <button className="act-btn" onClick={() => setEditing(r)}
                        style={{ padding: "4px 12px", fontFamily: FB, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", border: `1px solid rgba(114,47,55,0.25)`, borderRadius: "3px", background: "none", color: BD, cursor: "pointer", marginRight: "6px" }}>
                        Edit
                      </button>
                      <button className="act-btn" onClick={() => setDeleting(r.id)}
                        style={{ padding: "4px 12px", fontFamily: FB, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", border: `1px solid rgba(114,47,55,0.3)`, borderRadius: "3px", background: B, color: CREAM, cursor: "pointer" }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p style={{ fontFamily: FB, fontSize: "0.65rem", color: "rgba(74,28,33,0.4)", marginTop: "0.8rem" }}>
          Showing {visible.length} of {rows.length} records
        </p>
      </div>

      {viewing && (
        <div style={{ position: "fixed", inset: 0, zIndex: 150, background: "#f8f4ee", overflowY: "auto" }}>
          <div style={{ background: B, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setViewing(null)} style={{ background: "none", border: "none", color: CREAM, cursor: "pointer", fontFamily: FB, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px", padding: 0 }}>
              ← Back
            </button>
            <div style={{ width: "1px", height: "18px", background: "rgba(255,253,248,0.3)" }} />
            <div style={{ fontFamily: FT, fontStyle: "italic", fontSize: "1.2rem", color: CREAM }}>Message from {viewing.name}</div>
          </div>
          <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1.5rem" }}>
            <div style={{ background: CREAM, borderRadius: "6px", border: "1px solid rgba(114,47,55,0.12)", padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", marginBottom: "1.5rem" }}>
                {[["Name", viewing.name], ["Phone", viewing.phone], ["Email", viewing.email || "—"], ["Attending", viewing.attending === "yes" ? "Yes" : "No"], ["Date", new Date(viewing.createdAt).toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" })]].map(([k, v]) => (
                  <>
                    <span key={k+"-k"} style={{ fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: OLIVE, paddingTop: "2px" }}>{k}</span>
                    <span key={k+"-v"} style={{ fontFamily: FB, fontSize: "0.85rem", color: BD }}>{v}</span>
                  </>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(114,47,55,0.1)", paddingTop: "1.2rem" }}>
                <div style={{ fontFamily: FB, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: OLIVE, marginBottom: "0.6rem" }}>Message</div>
                <p style={{ fontFamily: FB, fontSize: "0.92rem", color: BD, lineHeight: 1.75, whiteSpace: "pre-wrap", margin: 0 }}>{viewing.message}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
              <button onClick={() => { setEditing(viewing); setViewing(null); }} style={{ padding: "0.5rem 1.4rem", border: `1px solid rgba(114,47,55,0.3)`, background: "none", color: BD, fontFamily: FB, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: "3px", cursor: "pointer" }}>Edit</button>
              <button onClick={() => { setDeleting(viewing.id); setViewing(null); }} style={{ padding: "0.5rem 1.4rem", border: "none", background: B, color: CREAM, fontFamily: FB, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: "3px", cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {editing && <EditModal rsvp={editing} onSave={handleSave} onClose={() => setEditing(null)} />}

      {/* Delete confirm */}
      {deleting && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(74,28,33,0.5)", padding: "1rem" }}
          onClick={e => e.target === e.currentTarget && setDeleting(null)}>
          <div style={{ background: CREAM, borderRadius: "4px", padding: "2rem", maxWidth: "360px", width: "100%", boxShadow: "0 20px 60px rgba(74,28,33,0.25)", textAlign: "center" }}>
            <div style={{ fontFamily: FT, fontStyle: "italic", fontSize: "1.4rem", color: B, marginBottom: "0.5rem" }}>Delete RSVP?</div>
            <p style={{ fontFamily: FB, fontSize: "0.85rem", color: BD, marginBottom: "1.5rem" }}>This cannot be undone.</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setDeleting(null)} style={{ padding: "0.5rem 1.4rem", border: `1px solid rgba(114,47,55,0.3)`, background: "none", color: BD, fontFamily: FB, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "3px", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => handleDelete(deleting)} style={{ padding: "0.5rem 1.4rem", border: "none", background: B, color: CREAM, fontFamily: FB, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", borderRadius: "3px", cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Entry ─────────────────────────────────────────────────────
export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) return <PinScreen onUnlock={() => setUnlocked(true)} />;
  return <Dashboard />;
}
