import React from "react";

// ─── Design tokens (Deep Focus theme) ────────────────────────────────────────

const T = {
  bg: "#0B0F19",
  card: "#1C2534",
  border: "#2A3649",
  text: "#F3F4F6",
  muted: "#9CA3AF",
  accent: "#6366F1",
  accentSoft: "rgba(99,102,241,0.12)",
  accentBorder: "rgba(99,102,241,0.2)",
  orange: "#F59E0B",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const Card: React.FC<{
  variant?: "default" | "highlight" | "warning";
  children: React.ReactNode;
}> = ({ variant = "default", children }) => {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: T.card, border: `1px solid ${T.border}` },
    highlight: { background: T.accentSoft, border: `1px solid ${T.accent}` },
    warning: { background: "rgba(245,158,11,0.08)", border: `1px solid ${T.orange}` },
  };
  return (
    <div style={{ borderRadius: 14, padding: 20, margin: "18px 0", ...styles[variant] }}>
      {children}
    </div>
  );
};

const CardLabel: React.FC<{ variant?: "blue" | "orange"; children: React.ReactNode }> = ({
  variant = "blue",
  children,
}) => (
  <p
    style={{
      fontSize: "0.88rem",
      fontWeight: 600,
      color: variant === "orange" ? T.orange : T.accent,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: 8,
    }}
  >
    {children}
  </p>
);

const SectionHeading: React.FC<{ num: string; children: React.ReactNode }> = ({ num, children }) => (
  <h2
    style={{
      fontSize: "1.35rem",
      fontWeight: 700,
      color: T.text,
      marginTop: 40,
      marginBottom: 16,
      paddingBottom: 8,
      borderBottom: `1px solid ${T.border}`,
    }}
  >
    <span style={{ color: T.accent, marginRight: 8 }}>{num}</span>
    {children}
  </h2>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: T.text, marginTop: 24, marginBottom: 10 }}>
    {children}
  </h3>
);

const Muted: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <p style={{ color: T.muted, fontSize: "0.95rem", marginBottom: 12, ...style }}>{children}</p>
);

const MutedLi: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li style={{ color: T.muted, fontSize: "0.95rem", marginBottom: 8 }}>{children}</li>
);

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong style={{ color: T.text, fontWeight: 600 }}>{children}</strong>
);

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: "none" }}>
    {children}
  </a>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const DeepFocusTerms: React.FC = () => (
  <div
    style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: T.bg,
      color: T.text,
      lineHeight: 1.75,
      minHeight: "100vh",
      WebkitFontSmoothing: "antialiased",
    }}
  >
    {/* ── Hero ── */}
    <div
      style={{
        background: "linear-gradient(135deg, #161B30 0%, #1A1230 50%, #0F0F1A 100%)",
        padding: "70px 20px 50px",
        textAlign: "center",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <span
        style={{
          display: "inline-block",
          background: T.accentSoft,
          color: T.accent,
          padding: "4px 14px",
          borderRadius: 20,
          fontSize: "0.75rem",
          fontWeight: 600,
          marginBottom: 12,
          border: `1px solid ${T.accentBorder}`,
        }}
      >
        Google Play Compliant
      </span>
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: 800,
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 8,
        }}
      >
        Terms & Conditions
      </h1>
      <p style={{ color: T.muted, fontSize: "0.95rem" }}>
        Deep Focus — 21-Day Deep Work Challenge Tracker
      </p>
      <p style={{ color: T.muted, fontSize: "0.85rem", marginTop: 8 }}>
        Effective Date: June 6, 2026 &nbsp;·&nbsp; Last Updated: June 6, 2026
      </p>
    </div>

    {/* ── Content ── */}
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 70px" }}>

      {/* 1. Acceptance */}
      <SectionHeading num="1.">Acceptance of Terms</SectionHeading>
      <Muted>
        By downloading, installing, accessing, or using the Deep Focus mobile application ("the
        App"), developed by <B>Sanzox</B> ("we," "our," or "us"), you agree to be bound by these
        Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the
        application.
      </Muted>

      {/* 2. Description of Service */}
      <SectionHeading num="2.">Description of Service</SectionHeading>
      <Muted>
        Deep Focus is an offline-first productivity and gamified time management tool. Features
        include:
      </Muted>
      <ul style={{ paddingLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
        <MutedLi>
          <B>Focus Timer:</B> Integrated Pomodoro and Flowmodoro counters with local ambient
          soundtrack controls.
        </MutedLi>
        <MutedLi>
          <B>Ivy Lee Planning:</B> Structured daily task listing and 3 priority time allocation
          systems.
        </MutedLi>
        <MutedLi>
          <B>Cornell Journals:</B> Cornell Note-taking tools to structure and summarize study logs.
        </MutedLi>
        <MutedLi>
          <B>Weekly & Daily Analytics:</B> Productivity tracking, distraction rate metrics, and
          streak tracking.
        </MutedLi>
        <MutedLi>
          <B>Supabase Community Sync:</B> Chat messaging boards and multiplayer study room
          accountability lobbies.
        </MutedLi>
        <MutedLi>
          <B>XP & Rewards:</B> Experience-based level progression and unlockable vector
          achievements.
        </MutedLi>
      </ul>

      {/* 3. License & Acceptable Use */}
      <SectionHeading num="3.">License and Acceptable Use</SectionHeading>
      <Muted>
        We grant you a limited, non-exclusive, non-transferable, revocable license to use the App
        on personal mobile devices strictly for personal and non-commercial productivity tracking.
      </Muted>
      <Card variant="warning">
        <CardLabel variant="orange">⚠️ Prohibited Activities</CardLabel>
        <Muted>You agree NOT to engage in any of the following activities while using Deep Focus:</Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 0, listStyleType: "disc" }}>
          <MutedLi>
            Reverse engineering, copying, modifying, or attempts to extract the source code of the App.
          </MutedLi>
          <MutedLi>
            Uploading illegal, offensive, abusive, or copyright-infringing content inside the
            Community chats.
          </MutedLi>
          <MutedLi>Spamming or harassing other community members or study room partners.</MutedLi>
          <MutedLi>
            Automating focus timers or falsifying focused hours stats using external scripts.
          </MutedLi>
          <MutedLi>
            Using our Supabase APIs directly or disrupting our server infrastructure.
          </MutedLi>
        </ul>
      </Card>

      {/* 4. Community Guidelines */}
      <SectionHeading num="4.">Community & Multiplayer Accountability Lobbies</SectionHeading>
      <Muted>
        Our community boards and live study rooms are designed to foster positive productivity
        habits. By using these features, you acknowledge that:
      </Muted>
      <ul style={{ paddingLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
        <MutedLi>
          You are solely responsible for the username, country badge, and bio details you submit.
        </MutedLi>
        <MutedLi>
          You will maintain positive, supportive interactions. We reserve the right to delete
          messages or ban device UUIDs from community access at our sole discretion, without prior
          notice, if these guidelines are violated.
        </MutedLi>
        <MutedLi>
          Study Rooms are anonymous visual lobbies. No persistent audio/video chats are conducted,
          but your active study state and focus metadata are visible to peers in the room.
        </MutedLi>
      </ul>

      {/* 5. User Responsibility */}
      <SectionHeading num="5.">User Responsibility for Data</SectionHeading>
      <Muted>
        Deep Focus is designed with an <B>offline-first</B> architectural model. Most of your work
        logs, Cornell notes, and challenge records are stored locally on your device's storage:
      </Muted>
      <ul style={{ paddingLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
        <MutedLi>
          We do not automatically back up your local Cornell notes or planner blocks to our servers.
          You can manually export your local data via the JSON export tool in settings to prevent
          accidental data loss.
        </MutedLi>
        <MutedLi>
          If you clear your App data, factory reset your device, or uninstall Deep Focus without
          backing up, your local focus logs and notes cannot be recovered. Sanzox is not responsible
          for any local data loss.
        </MutedLi>
      </ul>

      {/* 6. Intellectual Property */}
      <SectionHeading num="6.">Intellectual Property</SectionHeading>

      <SubHeading>6.1 App Ownership</SubHeading>
      <Muted>
        Deep Focus, including its source code, design, UI, logo, gamification assets (XP system,
        achievement badges, level icons), ambient soundscapes, and all related intellectual
        property, is owned by Sanzox and protected by copyright and other applicable intellectual
        property laws.
      </Muted>

      <SubHeading>6.2 License Grant</SubHeading>
      <Muted>
        We grant you a limited, non-exclusive, non-transferable, revocable license to use Deep
        Focus on your personal mobile device(s) for personal, non-commercial productivity purposes
        in accordance with these Terms.
      </Muted>

      <SubHeading>6.3 Your Content</SubHeading>
      <Muted>
        You retain full ownership of all focus logs, Cornell notes, planner entries, and other
        personal data you create within Deep Focus. We do not claim any ownership rights over your
        content. Community messages you post in public boards are visible to other users — by
        posting, you grant Sanzox a limited, non-exclusive license to display that content within
        the app.
      </Muted>

      <SubHeading>6.4 Gamification & Rewards</SubHeading>
      <Muted>
        XP points, levels, achievement badges, and rewards within Deep Focus have no monetary
        value and are not transferable. Sanzox reserves the right to modify, reset, or discontinue
        any part of the gamification system at any time without prior notice or compensation.
      </Muted>

      {/* 7. Indemnification */}
      <SectionHeading num="7.">Indemnification</SectionHeading>
      <Muted>
        You agree to indemnify, defend, and hold harmless Sanzox and its directors, employees, and
        partners from any claims, damages, losses, liabilities, and expenses (including reasonable
        attorney's fees) arising from:
      </Muted>
      <ul style={{ paddingLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
        <MutedLi>Your use or misuse of Deep Focus</MutedLi>
        <MutedLi>Your violation of these Terms</MutedLi>
        <MutedLi>Any content you post in the community boards or study rooms</MutedLi>
        <MutedLi>Your violation of any third-party rights</MutedLi>
        <MutedLi>Any harm caused to other community members through your use of the App</MutedLi>
      </ul>

      {/* 8. Disclaimer of Warranties */}
      <SectionHeading num="8.">Disclaimer of Warranties</SectionHeading>
      <Muted>
        Deep Focus is provided to you <B>"AS IS"</B> and <B>"AS AVAILABLE"</B> without warranty of
        any kind. Sanzox disclaims all warranties, express or implied, including but not limited to
        the implied warranties of merchantability, fitness for a particular purpose, and
        non-infringement.
      </Muted>
      <Muted>
        We do not guarantee that the App will be entirely error-free, uninterrupted, or compatible
        with all devices and Android operating system versions.
      </Muted>

      {/* 9. Limitation of Liability */}
      <SectionHeading num="9.">Limitation of Liability</SectionHeading>
      <Muted>
        To the maximum extent permitted by applicable law, Sanzox, its directors, employees, or
        partners, shall not be liable for any indirect, incidental, special, consequential, or
        punitive damages, including without limitation, loss of data, productivity losses, device
        malfunction, or server downtime resulting from your use of the App.
      </Muted>

      {/* 10. Termination */}
      <SectionHeading num="10.">Termination of Services</SectionHeading>
      <Muted>
        You can terminate these Terms at any time by deleting the App and requesting deletion of
        your community profile. We reserve the right to suspend or block community access for any
        device UUID if terms are violated.
      </Muted>

      {/* 11. Governing Law */}
      <SectionHeading num="11.">Governing Law</SectionHeading>
      <Muted>
        These Terms and Conditions shall be governed by and construed in accordance with the laws
        of Bangladesh. Any dispute arising under these terms shall be subject to the exclusive
        jurisdiction of the courts of Bangladesh.
      </Muted>

      {/* 12. Changes to Terms */}
      <SectionHeading num="12.">Changes to These Terms</SectionHeading>
      <Muted>
        We reserve the right to modify or replace these Terms at any time. If a revision is
        material, we will update the "Last Updated" date. Continued use of Deep Focus after updates
        indicates your agreement to the new Terms.
      </Muted>

      <SubHeading>Contact Us</SubHeading>
      <Muted>
        For questions or concerns regarding these Terms and Conditions, please contact us at:
      </Muted>
      <Card>
        <Muted style={{ marginBottom: 4 }}><B>Sanzox</B></Muted>
        <Muted style={{ marginBottom: 4 }}>
          Website: <Link href="http://www.sanzox.com">www.sanzox.com</Link>
        </Muted>
        <Muted style={{ marginBottom: 0 }}>
          Email:{" "}
          <a href="mailto:hello.sanzox@gmail.com" style={{ color: T.accent }}>hello.sanzox@gmail.com</a>
        </Muted>
      </Card>
    </div>

    {/* ── Footer ── */}
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        borderTop: `1px solid ${T.border}`,
        color: T.muted,
        fontSize: "0.85rem",
      }}
    >
      <p>&copy; 2026 Sanzox. All rights reserved.</p>
      <p style={{ marginTop: 6 }}>
        Deep Focus v1.1.0 &nbsp;·&nbsp;{" "}
        <a href="/deep-focus/privacy-policy" style={{ color: T.accent }}>Privacy Policy</a>
      </p>
    </div>
  </div>
);

export default DeepFocusTerms;