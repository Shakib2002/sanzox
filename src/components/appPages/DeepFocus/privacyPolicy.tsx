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

const DeepFocusPrivacyPolicy: React.FC = () => (
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
        Privacy Policy
      </h1>
      <p style={{ color: T.muted, fontSize: "0.95rem" }}>
        Deep Focus 21-Day Deep Work Challenge Tracker
      </p>
      <p style={{ color: T.muted, fontSize: "0.85rem", marginTop: 8 }}>
        Effective Date: June 6, 2026 &nbsp;·&nbsp; Last Updated: June 6, 2026
      </p>
    </div>

    {/* ── Content ── */}
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 70px" }}>

      <Muted>
        At Deep Focus, developed by <B>Sanzox</B> ("we," "our," or "us"), your privacy is our top
        priority. This Privacy Policy explains how our mobile application ("Deep Focus" or the "App")
        collects, uses, stores, and protects your information, in compliance with the latest Google
        Play Developer Policies.
      </Muted>

      {/* 1. Data Collection & Processing */}
      <SectionHeading num="1.">Data Collection & Processing</SectionHeading>
      <Muted>
        We classify the data processed by the App into two categories:{" "}
        <B>Local Data</B> (stored only on your device) and{" "}
        <B>Shared/Cloud Data</B> (synchronized with our servers for specific features).
      </Muted>

      <SubHeading>1.1 Local Data (On-Device Only)</SubHeading>
      <Muted>
        To help you track your deep work challenges, the following data is processed and stored{" "}
        <B>strictly locally</B> on your device using a secure database (Hive).{" "}
        <B>We do not upload or access this data on our servers:</B>
      </Muted>
      <ul style={{ paddingLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
        <MutedLi>
          <B>Focus Session Logs:</B> Duration of focus blocks, completion status, category tags,
          energy levels (1–10), focus ratings (1–10), and satisfaction ratings.
        </MutedLi>
        <MutedLi>
          <B>Daily Planner & Todo Data:</B> Time-blocked schedules, custom tasks, note descriptions,
          and Ivy Lee priority checklists.
        </MutedLi>
        <MutedLi>
          <B>Cornell Notes:</B> Custom journals containing headers, keywords/clues, text
          descriptions, summary blocks, and tags.
        </MutedLi>
        <MutedLi>
          <B>Onboarding & App Preferences:</B> Focus goals, selected challenges, daily targets,
          selected UI themes, and language settings.
        </MutedLi>
      </ul>

      <SubHeading>1.2 Shared & Cloud Data (Supabase Backend)</SubHeading>
      <Muted>
        If you explicitly opt-in to use our community and multiplayer collaborative features, the
        following data is synchronized and stored securely on our cloud infrastructure hosted by
        Supabase. Supabase may store data in data centers located in the United States or other
        regions depending on your selected Supabase project region. By using these features, you
        consent to this international transfer of data.
      </Muted>
      <ul style={{ paddingLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
        <MutedLi>
          <B>Community Profiles:</B> When you set up a community identity, your custom username,
          country flag/name, biography, total focused hours, and custom avatar selections are saved
          on the database to represent you in the forum. We generate a random device UUID to
          identify your profile — this identifier is not linked to your name, email, or any
          personally identifiable information, and cannot be used to identify you outside the app.
          No email or password account is required. Community profile data is retained until you
          delete your profile or request deletion.
        </MutedLi>
        <MutedLi>
          <B>Community Messages:</B> Messages and achievement alerts you post in the public
          community board are stored on our servers so other users can see them in real-time.
          Messages are retained as long as your community profile exists. Upon profile deletion,
          all associated messages are permanently purged within 7 business days.
        </MutedLi>
        <MutedLi>
          <B>Live Study Rooms (Presence):</B> When joining collaborative study rooms, your username,
          selected avatar icon, active timer status, and active focused duration are broadcasted in
          real-time to other participants using Supabase Presence. This real-time metadata is
          memory-based and is <B>not persistently stored</B> on our databases once you leave the
          study room.
        </MutedLi>
      </ul>

      {/* 2. Sensitive Device Permissions */}
      <SectionHeading num="2.">Sensitive Device Permissions</SectionHeading>
      <Muted>
        To provide advanced productivity features, Deep Focus requests access to certain device
        features. These permissions are requested only when necessary, and you can revoke them at
        any time in your device settings:
      </Muted>
      <Card variant="highlight">
        <CardLabel>System Permissions Breakdown</CardLabel>
        <ul style={{ paddingLeft: 24, marginBottom: 0, listStyleType: "disc" }}>
          <MutedLi>
            <B>Calendar Access (device_calendar_plus):</B> Used to export your planned focus blocks
            directly to your device's native calendar. We only write events you request and do not
            scan or harvest your personal calendar data.
          </MutedLi>
          <MutedLi>
            <B>Do Not Disturb / Sound Settings (sound_mode):</B> Triggers silent/DND mode
            automatically during your active focus timer to prevent incoming interruptions.
          </MutedLi>
          <MutedLi>
            <B>Storage / Photos Access (gal & image_picker):</B> Used to select local images for
            your community avatar and to save charts or achievement badge images to your photo
            gallery.
          </MutedLi>
          <MutedLi>
            <B>Notifications (flutter_local_notifications):</B> Schedules reminder notifications
            for your planned blocks, break activities, and daily evening reflections.
          </MutedLi>
        </ul>
      </Card>

      {/* 3. Data Retention & Account Deletion */}
      <SectionHeading num="3.">Data Retention & Account Deletion</SectionHeading>
      <Muted>
        In accordance with Google Play's App Account Deletion policy, we provide clear controls to
        delete your local and cloud data:
      </Muted>

      <SubHeading>3.1 Local Data Deletion</SubHeading>
      <Muted>
        You can instantly delete all focus logs, tasks, Cornell notes, and onboarding preferences
        stored on your device. Go to <B>Settings / More</B> → tap on{" "}
        <B>"Delete all progress & start over"</B>. This clears all local databases (Hive boxes)
        permanently.
      </Muted>

      <SubHeading>3.2 Server/Cloud Profile Deletion</SubHeading>
      <Muted>
        Although Deep Focus does not require email registration, a community profile is stored on
        our Supabase servers if you join the community space. You can request complete deletion of
        your community profile, messages, and associated server data in one of two ways:
      </Muted>
      <ol style={{ paddingLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
        <MutedLi>
          <B>In-App Deletion:</B> Tap on your community avatar profile, select "Clear Profile,"
          which removes your local identity, or request deletion inside the App Settings.
        </MutedLi>
        <MutedLi>
          <B>Web-based Deletion Request:</B> If you have uninstalled the App and want to delete
          your cloud data, visit{" "}
          <Link href="/delete-account?app=deepfocus">www.sanzox.com/delete-account</Link>{" "}
          or email us at{" "}
          <a href="mailto:hello.sanzox@gmail.com" style={{ color: T.accent }}>hello.sanzox@gmail.com</a>{" "}
          with your username. All associated server records will be permanently purged within 7
          business days.
        </MutedLi>
      </ol>

      {/* 4. Third-Party Services & SDKs */}
      <SectionHeading num="4.">Third-Party Services & SDKs</SectionHeading>
      <Muted>
        We use trusted third-party SDKs to support app functions. These services process data under
        their own privacy policies:
      </Muted>
      <ul style={{ paddingLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
        <MutedLi>
          <B>Supabase:</B> Provides cloud database hosting, real-time channels, and database sync.
          Read their privacy policy at{" "}
          <Link href="https://supabase.com/privacy">supabase.com/privacy</Link>.
        </MutedLi>
        <MutedLi>
          <B>Google Fonts:</B> Dynamically downloads beautiful typography to your device. Google
          Fonts does not track users or set cookies.
        </MutedLi>
      </ul>

      {/* 5. Children's Privacy */}
      <SectionHeading num="5.">Children's Privacy</SectionHeading>
      <Muted>
        Deep Focus does not knowingly collect or solicit personal data from children under 13 years
        of age. If we learn that we have collected server-side profile data from a child under 13,
        we will immediately delete that information from our databases. If you believe a child under
        13 has shared profile data with us, please contact us at{" "}
        <a href="mailto:hello.sanzox@gmail.com" style={{ color: T.accent }}>hello.sanzox@gmail.com</a>.
      </Muted>

      {/* 6. Security */}
      <SectionHeading num="6.">Security of Your Data</SectionHeading>
      <Muted>
        All cloud transmissions between Deep Focus and Supabase are encrypted using HTTPS/TLS
        protocols. Local data is protected by the operating system's sandbox. However, no method of
        transmission or electronic storage is 100% secure, and we cannot guarantee absolute
        security.
      </Muted>

      {/* 7. Policy Updates */}
      <SectionHeading num="7.">Changes to This Privacy Policy</SectionHeading>
      <Muted>
        We may update this Privacy Policy from time to time to reflect policy or feature changes.
        We will notify you of any updates by posting the new policy in the App and on our website
        with a revised "Last Updated" date. Continued use of Deep Focus after updates constitutes
        acceptance of the new policy.
      </Muted>

      {/* 8. Contact */}
      <SectionHeading num="8.">Contact & Developer Info</SectionHeading>
      <Muted>If you have any questions or concerns about this Privacy Policy, please contact us:</Muted>
      <Card>
        <Muted style={{ marginBottom: 4 }}><B>Sanzox</B></Muted>
        <Muted style={{ marginBottom: 4 }}>
          Website: <Link href="http://www.sanzox.com">www.sanzox.com</Link>
        </Muted>
        <Muted style={{ marginBottom: 4 }}>
          Email:{" "}
          <a href="mailto:hello.sanzox@gmail.com" style={{ color: T.accent }}>hello.sanzox@gmail.com</a>
        </Muted>
        <Muted style={{ marginBottom: 0 }}>Developer Identity: Sanzox (com.deepfocus.deep_focus)</Muted>
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
        <a href="/deep-focus/terms-and-conditions" style={{ color: T.accent }}>Terms & Conditions</a>
      </p>
    </div>
  </div>
);

export default DeepFocusPrivacyPolicy;