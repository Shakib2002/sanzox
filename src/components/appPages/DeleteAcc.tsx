import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID         = "service_33b6dsl";
const EMAILJS_ADMIN_TEMPLATE_ID  = "template_daxczir";   // → hello.sanzox@gmail.com
const EMAILJS_REPLY_TEMPLATE_ID  = "template_b1hblie";   // → user's email
const EMAILJS_PUBLIC_KEY         = "ahoxuy6rj_mopW2SN";

// ─── Types ────────────────────────────────────────────────────────────────────
type AppChoice   = "maxdrive" | "deepfocus" | "";
type RequestType = "full" | "local" | "cloud" | "";
type FormStatus  = "idle" | "loading" | "success" | "error";

// ─── Per-app config ───────────────────────────────────────────────────────────
const APP_CONFIG = {
  maxdrive: {
    name:             "MaxDrive",
    package:          "com.sanzox.maxdrive",
    accent:           "#4A8BFF",
    accentSoft:       "rgba(74,139,255,0.1)",
    accentBorder:     "rgba(74,139,255,0.3)",
    heroGradient:     "linear-gradient(135deg, #0D1B3E 0%, #0A0A1A 100%)",
    identifierLabel:  "Connected Google account email",
    identifierPlaceholder: "yourname@gmail.com (the account connected to MaxDrive)",
    note: "Your Google Drive files are never affected. MaxDrive only stores file metadata — your actual files remain in your Google account.",
    requestOptions: [
      { value: "full"  as RequestType, title: "Full deletion",      desc: "Local Isar database, SecureStorage tokens, cached metadata, and all associated cloud records" },
      { value: "local" as RequestType, title: "Local data only",                 desc: "Isar database, file metadata cache, upload sessions keeps Google Drive files untouched" },
      { value: "cloud" as RequestType, title: "Cloud / OAuth access only",       desc: "Revoke OAuth access and remove account from MaxDrive; Drive files untouched" },
    ],
  },
  deepfocus: {
    name:             "Deep Focus",
    package:          "com.deepfocus.deep_focus",
    accent:           "#6366F1",
    accentSoft:       "rgba(99,102,241,0.1)",
    accentBorder:     "rgba(99,102,241,0.3)",
    heroGradient:     "linear-gradient(135deg, #161B30 0%, #0F0F1A 100%)",
    identifierLabel:  "Community username",
    identifierPlaceholder: "Your community username (or 'no username set')",
    note: "Local data can also be deleted instantly inside the app via Settings → \"Delete all progress & start over\".",
    requestOptions: [
      { value: "full"  as RequestType, title: "Full deletion",      desc: "Local Hive database + community profile, messages, and all Supabase cloud records" },
      { value: "local" as RequestType, title: "Local data only",                 desc: "Hive database focus logs, Cornell notes, planner data, onboarding preferences" },
      { value: "cloud" as RequestType, title: "Cloud / community profile only",  desc: "Supabase community profile, username, messages, and avatar local data untouched" },
    ],
  },
};

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:          "#08080F",
  surface:     "#0F0F1A",
  card:        "#14141F",
  border:      "#1E1E30",
  borderActive:"#3A3A5C",
  text:        "#EEEEF5",
  muted:       "#8888A8",
  faint:       "#444460",
  red:         "#F75F6F",
  redSoft:     "rgba(247,95,111,0.1)",
  redBorder:   "rgba(247,95,111,0.25)",
  green:       "#34D399",
  greenSoft:   "rgba(52,211,153,0.1)",
  greenBorder: "rgba(52,211,153,0.25)",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getAppFromURL = (): AppChoice => {
  try {
    const val = new URLSearchParams(window.location.search).get("app")?.toLowerCase();
    if (val === "maxdrive" || val === "deepfocus") return val;
  } catch {}
  return "";
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// ─── Sub-components ───────────────────────────────────────────────────────────
const FieldLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label style={{ display:"block", fontSize:"0.76rem", fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:8 }}>
    {children}{required && <span style={{ color:T.red, marginLeft:4 }}>*</span>}
  </label>
);

const inputBase: React.CSSProperties = {
  width:"100%", background:T.surface, border:`1px solid ${T.border}`,
  borderRadius:10, padding:"12px 16px", fontSize:"0.92rem", color:T.text,
  outline:"none", transition:"border-color 0.2s", boxSizing:"border-box", fontFamily:"inherit",
};

const RequestOption: React.FC<{
  opt: { value: RequestType; title: string; desc: string };
  selected: boolean;
  onSelect: (v: RequestType) => void;
}> = ({ opt, selected, onSelect }) => (
  <div
    onClick={() => onSelect(opt.value)}
    style={{
      background: selected ? T.redSoft : T.card,
      border:`1.5px solid ${selected ? T.redBorder : T.border}`,
      borderRadius:12, padding:"14px 16px", cursor:"pointer",
      transition:"all 0.2s", userSelect:"none", display:"flex", alignItems:"flex-start", gap:12,
    }}
  >
    <div style={{
      width:18, height:18, borderRadius:"50%",
      border:`2px solid ${selected ? T.red : T.faint}`,
      background: selected ? T.red : "transparent",
      flexShrink:0, marginTop:2, transition:"all 0.2s",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      {selected && <div style={{ width:6, height:6, borderRadius:"50%", background:"#fff" }} />}
    </div>
    <div>
      <div style={{ fontSize:"0.88rem", fontWeight:600, color: selected ? T.red : T.text, marginBottom:3 }}>{opt.title}</div>
      <div style={{ fontSize:"0.78rem", color:T.muted, lineHeight:1.5 }}>{opt.desc}</div>
    </div>
  </div>
);

// ─── App Selector ─────────────────────────────────────────────────────────────
const AppSelector: React.FC<{ onSelect: (v: AppChoice) => void }> = ({ onSelect }) => (
  <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", background:T.bg, minHeight:"100vh", color:T.text, padding:"60px 20px 80px" }}>
    <div style={{ maxWidth:480, margin:"0 auto" }}>
      <div style={{ marginBottom:40 }}>
        <div style={{
          display:"inline-block", background:T.redSoft, border:`1px solid ${T.redBorder}`,
          color:T.red, fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.8px",
          textTransform:"uppercase", padding:"4px 12px", borderRadius:20, marginBottom:16,
        }}>Sanzox · Data Deletion</div>
        <h1 style={{ fontSize:"1.9rem", fontWeight:800, color:T.text, marginBottom:10, lineHeight:1.2 }}>
          Request account deletion
        </h1>
        <p style={{ color:T.muted, fontSize:"0.92rem", lineHeight:1.7 }}>
          Select the app you want to delete data from. All requests are processed within{" "}
          <span style={{ color:T.text }}>7 business days</span>.
        </p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {(["maxdrive","deepfocus"] as const).map(key => {
          const cfg = APP_CONFIG[key];
          return (
            <div
              key={key}
              onClick={() => onSelect(key)}
              style={{
                background:T.card, border:`1.5px solid ${T.border}`, borderRadius:16,
                padding:"22px 20px", cursor:"pointer", transition:"all 0.2s", userSelect:"none",
                display:"flex", alignItems:"center", gap:16,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = cfg.accentBorder)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
            >
              <div style={{ fontSize:"2rem", flexShrink:0 }}></div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"1rem", fontWeight:700, color:T.text, marginBottom:3 }}>{cfg.name}</div>
                <div style={{ fontSize:"0.72rem", color:T.faint, fontFamily:"monospace" }}>{cfg.package}</div>
              </div>
              <div style={{ color:T.faint, fontSize:"1.1rem" }}>→</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop:40, textAlign:"center" }}>
        <p style={{ fontSize:"0.75rem", color:T.faint }}>
          Questions?{" "}
          <a href="mailto:hello.sanzox@gmail.com" style={{ color:T.muted, textDecoration:"none" }}>hello.sanzox@gmail.com</a>
        </p>
        <p style={{ fontSize:"0.7rem", color:T.faint, marginTop:4 }}>© 2026 Sanzox</p>
      </div>
    </div>
  </div>
);

// ─── Delete Form ──────────────────────────────────────────────────────────────
const DeleteForm: React.FC<{ appKey: "maxdrive" | "deepfocus" }> = ({ appKey }) => {
  const cfg = APP_CONFIG[appKey];

  const [requestType, setRequestType] = useState<RequestType>("");
  const [identifier,  setIdentifier]  = useState("");   // email (maxdrive) OR username (deepfocus)
  const [userEmail,   setUserEmail]   = useState("");   // email field for both apps
  const [reason,      setReason]      = useState("");
  const [agreed,      setAgreed]      = useState(false);
  const [status,      setStatus]      = useState<FormStatus>("idle");
  const [errorMsg,    setErrorMsg]    = useState("");

  const resolvedEmail = userEmail.trim();

  const canSubmit =
    requestType !== "" &&
    identifier.trim().length > 0 &&
    isValidEmail(resolvedEmail) &&
    agreed &&
    status !== "loading";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("loading");
    setErrorMsg("");

    const requestTypeLabel =
      requestType === "full"  ? "Full Account Deletion" :
      requestType === "local" ? "Local Data Only" : "Cloud Profile Only";

    const sentTime = new Date().toLocaleString("en-US", { dateStyle:"full", timeStyle:"short" });

    const sharedVars = {
      app_name:     cfg.name,
      request_type: requestTypeLabel,
      user_email:   resolvedEmail,
      identifier:   identifier.trim(),
      reason:       reason.trim() || "Not provided",
      sent_time:    sentTime,
    };

    try {
      // Send both emails in parallel
      await Promise.all([
        // 1. Admin notification → hello.sanzox@gmail.com
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, sharedVars, EMAILJS_PUBLIC_KEY),
        // 2. User auto-reply → user's email
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_REPLY_TEMPLATE_ID, sharedVars, EMAILJS_PUBLIC_KEY),
      ]);

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.text || err?.message || "Something went wrong. Please email hello.sanzox@gmail.com directly.");
    }
  };

  // ── Success ──
  if (status === "success") {
    return (
      <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", background:T.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
        <div style={{ maxWidth:460, width:"100%", textAlign:"center" }}>
          <div style={{
            width:72, height:72, borderRadius:"50%",
            background:T.greenSoft, border:`2px solid ${T.greenBorder}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            margin:"0 auto 24px", fontSize:"1.8rem",
          }}>✓</div>
          <h1 style={{ fontSize:"1.6rem", fontWeight:700, color:T.text, marginBottom:12 }}>Request received</h1>
          <p style={{ color:T.muted, fontSize:"0.92rem", lineHeight:1.7, marginBottom:6 }}>
            Your <span style={{ color:T.text, fontWeight:600 }}>{cfg.name}</span> data deletion
            request has been submitted. All data will be permanently purged within{" "}
            <span style={{ color:T.green, fontWeight:600 }}>7 business days</span>.
          </p>
          <p style={{ color:T.muted, fontSize:"0.82rem", lineHeight:1.6, marginBottom:32 }}>
            A confirmation has been sent to{" "}
            <span style={{ color:T.text }}>{resolvedEmail}</span>.
            For questions, reply to that email or contact{" "}
            <span style={{ color:T.text }}>hello.sanzox@gmail.com</span>.
          </p>
          <a
            href="/"
            style={{
              background:"transparent", border:`1px solid ${T.border}`,
              borderRadius:10, padding:"10px 24px", color:T.muted,
              fontSize:"0.85rem", textDecoration:"none", display:"inline-block",
            }}
          >
            Meet Sanzox
          </a>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", background:T.bg, minHeight:"100vh", color:T.text }}>

      {/* Hero banner */}
      <div style={{ background:cfg.heroGradient, padding:"48px 20px 36px", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <a href="?" style={{ display:"inline-flex", alignItems:"center", gap:6, color:T.muted, fontSize:"0.8rem", textDecoration:"none", marginBottom:24 }}>
            ← All apps
          </a>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
            <span style={{ fontSize:"2.2rem" }}></span>
            <div>
              <h1 style={{ fontSize:"1.7rem", fontWeight:800, color:T.text, marginBottom:2 }}>Delete {cfg.name} data</h1>
              <div style={{ fontSize:"0.72rem", color:T.faint, fontFamily:"monospace" }}>{cfg.package}</div>
            </div>
          </div>
          <p style={{ color:T.muted, fontSize:"0.88rem", lineHeight:1.7 }}>
            Submit a deletion request below. You'll receive a confirmation email once submitted.
            Requests are processed within <span style={{ color:T.text }}>7 business days</span>.
          </p>
        </div>
      </div>

      {/* Form body */}
      <div style={{ maxWidth:560, margin:"0 auto", padding:"40px 20px 80px" }}>

        {/* Request type */}
        <div style={{ marginBottom:32 }}>
          <FieldLabel required>What do you want deleted?</FieldLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {cfg.requestOptions.map(opt => (
              <RequestOption key={opt.value} opt={opt} selected={requestType === opt.value} onSelect={setRequestType} />
            ))}
          </div>
          <div style={{
            marginTop:12, background:cfg.accentSoft, border:`1px solid ${cfg.accentBorder}`,
            borderRadius:10, padding:"10px 14px", fontSize:"0.78rem", color:T.muted, lineHeight:1.6,
          }}>
            <span style={{ color:cfg.accent, fontWeight:600 }}>Note: </span>{cfg.note}
          </div>
        </div>

        {/* Identifier */}
        {requestType !== "" && (
          <div style={{ marginBottom:20, animation:"fadeIn 0.25s ease" }}>
            <FieldLabel required>{cfg.identifierLabel}</FieldLabel>
            <input
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder={cfg.identifierPlaceholder}
              style={inputBase}
              onFocus={e => (e.target.style.borderColor = T.borderActive)}
              onBlur={e  => (e.target.style.borderColor = T.border)}
            />
          </div>
        )}

        {/* Email field — both apps */}
        {requestType !== "" && (
          <div style={{ marginBottom:20, animation:"fadeIn 0.25s ease" }}>
            <FieldLabel required>Your email address</FieldLabel>
            <input
              type="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              placeholder="yourname@gmail.com"
              style={inputBase}
              onFocus={e => (e.target.style.borderColor = T.borderActive)}
              onBlur={e  => (e.target.style.borderColor = T.border)}
            />
            <p style={{ fontSize:"0.75rem", color:T.faint, marginTop:6, lineHeight:1.5 }}>
              We'll send a confirmation to this address. We won't use it for anything else.
            </p>
          </div>
        )}

        {/* Reason */}
        {requestType !== "" && (
          <div style={{ marginBottom:28, animation:"fadeIn 0.25s ease" }}>
            <FieldLabel>Reason for deletion (optional)</FieldLabel>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Let us know why you're deleting your data..."
              rows={3}
              style={{ ...inputBase, resize:"vertical", lineHeight:1.6 }}
              onFocus={e => (e.target.style.borderColor = T.borderActive)}
              onBlur={e  => (e.target.style.borderColor = T.border)}
            />
          </div>
        )}

        {/* Confirm checkbox */}
        {requestType !== "" && (
          <div style={{ marginBottom:28, animation:"fadeIn 0.25s ease" }} onClick={() => setAgreed(!agreed)}>
            <div style={{
              background: agreed ? T.redSoft : T.card,
              border:`1.5px solid ${agreed ? T.redBorder : T.border}`,
              borderRadius:12, padding:"14px 16px", cursor:"pointer",
              display:"flex", alignItems:"flex-start", gap:12, transition:"all 0.2s",
            }}>
              <div style={{
                width:18, height:18, borderRadius:4,
                border:`2px solid ${agreed ? T.red : T.faint}`,
                background: agreed ? T.red : "transparent",
                flexShrink:0, marginTop:1, transition:"all 0.2s",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                {agreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p style={{ fontSize:"0.82rem", color: agreed ? T.text : T.muted, lineHeight:1.6, margin:0 }}>
                I understand this action is <strong style={{ color:T.red }}>irreversible</strong>. Deleted data cannot be recovered. I confirm I want to proceed.
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div style={{ marginBottom:16, background:T.redSoft, border:`1px solid ${T.redBorder}`, borderRadius:10, padding:"12px 16px", fontSize:"0.82rem", color:T.red, lineHeight:1.6 }}>
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        {requestType !== "" && (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              width:"100%", padding:"14px", borderRadius:12, border:"none",
              background: canSubmit ? "linear-gradient(135deg, #F75F6F, #D94455)" : T.card,
              color: canSubmit ? "#fff" : T.faint,
              fontSize:"0.95rem", fontWeight:700,
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition:"all 0.2s", fontFamily:"inherit", letterSpacing:"0.3px",
            }}
          >
            {status === "loading" ? "Submitting..." : "Submit deletion request"}
          </button>
        )}

        {/* Footer */}
        <div style={{ marginTop:48, paddingTop:24, borderTop:`1px solid ${T.border}`, textAlign:"center" }}>
          <p style={{ fontSize:"0.75rem", color:T.faint }}>
            Questions?{" "}
            <a href="mailto:hello.sanzox@gmail.com" style={{ color:T.muted, textDecoration:"none" }}>hello.sanzox@gmail.com</a>
          </p>
          <p style={{ fontSize:"0.7rem", color:T.faint, marginTop:4 }}>© 2026 Sanzox · MaxDrive & Deep Focus</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        input::placeholder, textarea::placeholder { color:#444460; }
      `}</style>
    </div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
const DeleteAccount: React.FC = () => {
  const [app, setApp] = useState<AppChoice>(() => getAppFromURL());

  useEffect(() => {
    const detected = getAppFromURL();
    if (detected) setApp(detected);
  }, []);

  if (app === "maxdrive" || app === "deepfocus") return <DeleteForm appKey={app} />;
  return <AppSelector onSelect={setApp} />;
};

export default DeleteAccount;