import { list } from "postcss";
import React from "react";


type TagVariant = "green" | "red" | "blue";

interface TableRow {
  cells: React.ReactNode[];
}


const Tag: React.FC<{ variant: TagVariant; children: React.ReactNode }> = ({
  variant,
  children,
}) => {
  const styles: Record<TagVariant, React.CSSProperties> = {
    green: { background: "rgba(52,211,153,0.15)", color: "#34D399" },
    red: { background: "rgba(255,107,107,0.15)", color: "#FF6B6B" },
    blue: { background: "rgba(74,139,255,0.12)", color: "#4A8BFF" },
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: "0.7rem",
        fontWeight: 600,
        ...styles[variant],
      }}
    >
      {children}
    </span>
  );
};

const Card: React.FC<{
  highlight?: boolean;
  children: React.ReactNode;
}> = ({ highlight = false, children }) => (
  <div
    style={{
      background: highlight ? "rgba(74,139,255,0.12)" : "#1A1A25",
      border: `1px solid ${highlight ? "#4A8BFF" : "#2A2A3A"}`,
      borderRadius: 12,
      padding: "18px 20px",
      margin: "14px 0",
    }}
  >
    {children}
  </div>
);

const CardLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      fontSize: "0.85rem",
      fontWeight: 600,
      color: "#4A8BFF",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: 8,
    }}
  >
    {children}
  </p>
);

const SectionHeading: React.FC<{ num: string; children: React.ReactNode }> = ({
  num,
  children,
}) => (
  <h2
    style={{
      fontSize: "1.3rem",
      fontWeight: 700,
      color: "#E8E8F0",
      marginTop: 36,
      marginBottom: 14,
      paddingBottom: 8,
      borderBottom: "1px solid #2A2A3A",
    }}
  >
    <span style={{ color: "#4A8BFF", marginRight: 8 }}>{num}</span>
    {children}
  </h2>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3
    style={{
      fontSize: "1.05rem",
      fontWeight: 600,
      color: "#E8E8F0",
      marginTop: 20,
      marginBottom: 8,
    }}
  >
    {children}
  </h3>
);

const Muted: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <p style={{ color: "#9898A8", fontSize: "0.92rem", marginBottom: 10, ...style }}>
    {children}
  </p>
);

const MutedLi: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li style={{ color: "#9898A8", fontSize: "0.92rem", marginBottom: 6 }}>{children}</li>
);

const DataTable: React.FC<{ headers: string[]; rows: TableRow[] }> = ({
  headers,
  rows,
}) => (
  <div style={{ overflowX: "auto", margin: "14px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              style={{
                padding: "10px 14px",
                textAlign: "left",
                borderBottom: "1px solid #2A2A3A",
                background: "#1A1A25",
                color: "#E8E8F0",
                fontWeight: 600,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.cells.map((cell, j) => (
              <td
                key={j}
                style={{
                  padding: "10px 14px",
                  textAlign: "left",
                  borderBottom: "1px solid #2A2A3A",
                  color: "#9898A8",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#4A8BFF", textDecoration: "none" }}
  >
    {children}
  </a>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const PrivacyPolicy: React.FC = () => {
  return (
    <div
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#0A0A0F",
        color: "#E8E8F0",
        lineHeight: 1.7,
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Hero ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0D1B3E 0%, #1A0D3E 50%, #0A0A1A 100%)",
          padding: "60px 20px 40px",
          textAlign: "center",
          borderBottom: "1px solid #2A2A3A",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(74,139,255,0.12)",
            color: "#4A8BFF",
            padding: "4px 14px",
            borderRadius: 20,
            fontSize: "0.75rem",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Google Play Compliant
        </span>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #4A8BFF, #7C5CFF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 8,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ color: "#9898A8", fontSize: "0.9rem" }}>
          MaxDrive — Multi-Account Google Drive Manager
        </p>
        <p style={{ color: "#9898A8", fontSize: "0.8rem", marginTop: 6 }}>
          Effective Date: June 6, 2026 &nbsp;·&nbsp; Last Updated: June 6, 2026
        </p>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "30px 20px 60px" }}>

        {/* At a Glance */}
        <Card highlight>
          <CardLabel>Privacy at a Glance</CardLabel>
          <Muted>
            MaxDrive is a <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>local-first</strong> app.
            Your files stay in your Google Drive accounts, we never operate our own cloud servers to store
            your data. All sensitive information (tokens, encryption keys, biometric data) is stored{" "}
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>only on your device</strong> using
            Android's hardware-backed Keystore encryption.
          </Muted>
        </Card>

        {/* 1. Introduction */}
        <SectionHeading num="1.">Introduction</SectionHeading>
        <Muted>
          Sanzox ("we," "our," or "us") develops and operates{" "}
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>MaxDrive</strong> (package:{" "}
          <code>com.sanzox.maxdrive</code>), a mobile application available on the Google Play Store.
          This Privacy Policy explains how we collect, use, store, and protect your information when
          you use MaxDrive.
        </Muted>
        <Muted>
          By downloading, installing, or using MaxDrive, you agree to this Privacy Policy. If you do
          not agree, please uninstall the app and discontinue use.
        </Muted>

        {/* 2. Information We Collect */}
        <SectionHeading num="2.">Information We Collect</SectionHeading>

        <SubHeading>2.1 Google Account Information</SubHeading>
        <Muted>When you sign in with Google, we receive:</Muted>
        <DataTable
          headers={["Data", "Purpose", "Storage"]}
          rows={[
            {
              cells: [
                "Email address",
                "Account identification & multi-account management",
                <Tag variant="green">On-device (Isar DB)</Tag>,
              ],
            },
            {
              cells: [
                "Display name",
                "UI personalization",
                <Tag variant="green">On-device (Isar DB)</Tag>,
              ],
            },
            {
              cells: [
                "Profile photo URL",
                "UI display",
                <Tag variant="green">On-device (Isar DB)</Tag>,
              ],
            },
            {
              cells: [
                "OAuth access token",
                "Google Drive API authentication",
                <Tag variant="green">On-device (SecureStorage)</Tag>,
              ],
            },
            {
              cells: [
                "OAuth refresh token",
                "Session persistence without re-sign-in",
                <Tag variant="green">On-device (SecureStorage)</Tag>,
              ],
            },
          ]}
        />
        <Muted>
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>
            We do not store your Google password.
          </strong>{" "}
          Authentication is handled entirely through Google's OAuth 2.0 protocol.
        </Muted>

        <SubHeading>2.2 Google Drive File Metadata</SubHeading>
        <Muted>
          MaxDrive syncs your file metadata (not file contents) from Google Drive to provide file
          browsing, search, and organization features:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14, listStyleType: "disc" }}>
          <MutedLi>File name, size, MIME type, creation/modification dates</MutedLi>
          <MutedLi>Folder hierarchy and parent-child relationships</MutedLi>
          <MutedLi>Thumbnail URLs and file owner names</MutedLi>
          <MutedLi>Storage quota (used space, total space)</MutedLi>
        </ul>
        <Muted>
          This metadata is cached{" "}
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>locally on your device</strong> in an
          Isar database for offline access and fast loading.
        </Muted>

        <SubHeading>2.3 Device Photos & Videos</SubHeading>
        <Muted>
          If you enable the{" "}
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Photo Auto-Backup</strong> feature,
          MaxDrive accesses your device's photo library (via <code>READ_MEDIA_IMAGES</code> and{" "}
          <code>READ_MEDIA_VIDEO</code> permissions) to upload new photos and videos to your Google
          Drive. We:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14, listStyleType: "disc" }}>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Do not</strong> upload photos
            without your explicit consent
          </MutedLi>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Do not</strong> access photos
            unless backup is enabled
          </MutedLi>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Do not</strong> send photos to any
            server other than your own Google Drive
          </MutedLi>
        </ul>

        <SubHeading>2.4 Crash Reports & Diagnostics</SubHeading>
        <Muted>
          We use <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Firebase Crashlytics</strong>{" "}
          (by Google) to collect anonymous crash reports in production builds. This includes:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14, listStyleType: "disc" }}>
          <MutedLi>Stack traces and exception details</MutedLi>
          <MutedLi>Device model, OS version, and app version</MutedLi>
          <MutedLi>Crash timestamps</MutedLi>
        </ul>
        <Muted>
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>
            No personal data, file names, email addresses, or file contents
          </strong>{" "}
          are included in crash reports.
        </Muted>

        <SubHeading>2.5 Push Notification Tokens</SubHeading>
        <Muted>
          We use{" "}
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>
            Firebase Cloud Messaging (FCM)
          </strong>{" "}
          to receive real-time sync notifications when your Google Drive files change. Your FCM device
          token is:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc"  }}>
          <MutedLi>Stored locally on your device</MutedLi>
          <MutedLi>Used only to deliver Drive change notifications</MutedLi>
          <MutedLi>Not shared with third parties for advertising</MutedLi>
        </ul>

        <SubHeading>2.6 Biometric Data</SubHeading>
        <Muted>
          MaxDrive supports biometric authentication (fingerprint/face) via Android's{" "}
          <code>BiometricPrompt</code> API for the Vault feature.{" "}
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>
            We never access, process, or store your biometric data.
          </strong>{" "}
          All biometric operations are handled entirely by Android's hardware-backed security system.
        </Muted>

        <SubHeading>2.7 Encryption Keys</SubHeading>
        <Muted>
          When you use the{" "}
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Vault</strong> (encrypted file
          storage) feature, an AES-256-GCM encryption key is generated and stored in{" "}
          <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>
            Android's hardware-backed Keystore
          </strong>{" "}
          via Flutter Secure Storage. This key:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>Never leaves your device</MutedLi>
          <MutedLi>Is not transmitted to any server</MutedLi>
          <MutedLi>Is not accessible to us or any third party</MutedLi>
        </ul>

        {/* 3. Data We Do NOT Collect */}
        <SectionHeading num="3.">Data We Do NOT Collect</SectionHeading>
        <Card>
          <ul style={{ paddingLeft: 24, marginBottom: 0}}>
            {[
              "Your Google password or credentials",
              "Contents of your files (documents, photos, videos)",
              "Location data or GPS coordinates",
              "Contact lists, call logs, or SMS",
              "Advertising identifiers or tracking data",
              "Browsing history or search queries outside the app",
              "Biometric fingerprint/face templates",
            ].map((item) => (
              <MutedLi key={item}>
                <Tag variant="red">Never</Tag>&nbsp;&nbsp;{item}
              </MutedLi>
            ))}
          </ul>
        </Card>

        {/* 4. How We Use Your Information */}
        <SectionHeading num="4.">How We Use Your Information</SectionHeading>
        <DataTable
          headers={["Purpose", "Legal Basis"]}
          rows={[
            { cells: ["Authenticate with Google Drive API", "Contract / Consent"] },
            { cells: ["Sync and display your file metadata", "Contract / Consent"] },
            { cells: ["Upload and download files to/from your Drive", "Consent"] },
            { cells: ["Auto-backup photos to your Drive (if enabled)", "Explicit Consent"] },
            { cells: ["Encrypt/decrypt files in the Vault", "Consent"] },
            { cells: ["Display sync progress and notifications", "Legitimate Interest"] },
            { cells: ["Diagnose and fix crashes", "Legitimate Interest"] },
            { cells: ["Deliver real-time sync notifications via FCM", "Legitimate Interest"] },
          ]}
        />

        {/* 5. On-Device AI File Tagging */}
        <SectionHeading num="5.">On-Device AI File Tagging</SectionHeading>
        <Muted>
          MaxDrive includes an intelligent file tagging system ("NeuralMesh") that automatically
          categorizes your files into smart tags (e.g., "Invoice," "Identity," "Media"). This system:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>
           Runs{" "}
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>entirely on your device</strong>{" "}
            (in a background isolate)
          </MutedLi>
          <MutedLi>
           Analyzes only{" "}
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>
              file names and MIME types
            </strong>{" "}
            — never file contents
          </MutedLi>
          <MutedLi>Does not use any cloud-based AI or machine learning APIs</MutedLi>
          <MutedLi>Tags are stored locally in the on-device Isar database</MutedLi>
        </ul>

        {/* 6. Third-Party Services */}
        <SectionHeading num="6.">Third-Party Services</SectionHeading>
        <DataTable
          headers={["Service", "Provider", "Data Shared", "Privacy Policy"]}
          rows={[
            {
              cells: [
                "Google Sign-In",
                "Google LLC",
                "Email, name, profile photo",
                <ExternalLink href="https://policies.google.com/privacy">Link</ExternalLink>,
              ],
            },
            {
              cells: [
                "Google Drive API",
                "Google LLC",
                "File metadata, file content (upload/download)",
                <ExternalLink href="https://policies.google.com/privacy">Link</ExternalLink>,
              ],
            },
            {
              cells: [
                "Firebase Crashlytics",
                "Google LLC",
                "Anonymous crash reports, device info",
                <ExternalLink href="https://firebase.google.com/support/privacy">Link</ExternalLink>,
              ],
            },
            {
              cells: [
                "Firebase Cloud Messaging",
                "Google LLC",
                "FCM device token",
                <ExternalLink href="https://firebase.google.com/support/privacy">Link</ExternalLink>,
              ],
            },
            {
              cells: [
                "Firebase Remote Config",
                "Google LLC",
                "App instance ID (anonymous)",
                <ExternalLink href="https://firebase.google.com/support/privacy">Link</ExternalLink>,
              ],
            },
          ]}
        />
        <Muted>
          We do not use any advertising SDKs, analytics trackers, or third-party data brokers.
        </Muted>

        {/* 7. Data Storage & Security */}
        <SectionHeading num="7.">Data Storage & Security</SectionHeading>
        <SubHeading>7.1 Local Storage</SubHeading>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Isar Database:</strong> File
            metadata, account info, upload sessions, and partitions
          </MutedLi>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Flutter Secure Storage:</strong>{" "}
            OAuth tokens, encryption keys, FCM tokens, and app settings — encrypted using Android
            Keystore (AES-256)
          </MutedLi>
        </ul>

        <SubHeading>7.2 Security Measures</SubHeading>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>All OAuth tokens are stored in Android's hardware-backed Keystore</MutedLi>
          <MutedLi>Vault files are encrypted with AES-256-GCM with unique per-chunk IVs</MutedLi>
          <MutedLi>Per-account mutex locks prevent token race conditions</MutedLi>
          <MutedLi>
           API credentials are loaded at runtime via Firebase Remote Config — never compiled into
            the APK
          </MutedLi>
          <MutedLi>Network communication uses HTTPS/TLS exclusively</MutedLi>
          <MutedLi>R8 code shrinking and ProGuard obfuscation in production builds</MutedLi>
          <MutedLi> 
            <code>android:allowBackup="false"</code> prevents backup extraction of sensitive data
          </MutedLi>
        </ul>

        {/* 8. Data Retention */}
        <SectionHeading num="8.">Data Retention</SectionHeading>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Account data:</strong> Retained
            until you disconnect the account or uninstall the app
          </MutedLi>
          <MutedLi> 
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>File metadata cache:</strong>{" "}
            Synced and refreshed periodically; cleared on account disconnect
          </MutedLi>
          <MutedLi> 
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Upload sessions:</strong>{" "}
            Automatically cleaned after 24 hours of inactivity
          </MutedLi>
          <MutedLi>
           <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Crash reports:</strong> Retained
            by Firebase Crashlytics for 90 days per Google's policy
          </MutedLi>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>FCM tokens:</strong> Retained
            until you uninstall the app or clear app data
          </MutedLi>
        </ul>

        {/* 9. Your Rights */}
        <SectionHeading num="9.">Your Rights</SectionHeading>
        <Muted>
          Depending on your jurisdiction (GDPR, CCPA, or other applicable laws), you have the right
          to:
        </Muted>
        <Card>
          <CardLabel>User Rights</CardLabel>
          <ul style={{ paddingLeft: 24, marginBottom: 0,listStyleType: "disc" }}>
            <MutedLi>
              <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Access:</strong> View all data
              stored by the app (available in Settings)
            </MutedLi>
            <MutedLi>
              <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Deletion:</strong> Disconnect
              your account to remove all locally stored data, or uninstall the app to delete
              everything
            </MutedLi>
            <MutedLi>
              <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Portability:</strong> Your files
              remain in your Google Drive — accessible from any device at any time
            </MutedLi>
            <MutedLi>
              <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Revoke access:</strong> Remove
              MaxDrive's access to your Google account at{" "}
              <ExternalLink href="https://myaccount.google.com/permissions">
                myaccount.google.com/permissions
              </ExternalLink>
            </MutedLi>
            <MutedLi>
              <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>
                Opt-out of crash reporting:
              </strong>{" "}
              Crashlytics is only active in production builds; debug builds send no data
            </MutedLi>
            <MutedLi>
              <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Disable features:</strong> Photo
              backup, biometric lock, and push notifications can each be independently disabled
            </MutedLi>
          </ul>
        </Card>

        {/* 10. Data Deletion */}
        <SectionHeading num="10.">Data Deletion</SectionHeading>
        <Muted>
          You can request complete data deletion through any of these methods:
        </Muted>
        <ol style={{ paddingLeft: 24, marginBottom: 14, listStyleType: "disc" }}>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>In-app:</strong> Disconnect your
            Google account in Settings → all local data for that account is immediately deleted
          </MutedLi>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Uninstall:</strong> Removing the
            app deletes all locally stored data including the Isar database, SecureStorage, and
            cached files
          </MutedLi>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Google Permissions:</strong>{" "}
            Revoke MaxDrive's access at{" "}
            <ExternalLink href="https://myaccount.google.com/permissions">
              Google Account Permissions
            </ExternalLink>
          </MutedLi>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Web form:</strong> Visit{" "}
            <ExternalLink href="https://www.sanzox.com/delete-account">
              www.sanzox.com/delete-account
            </ExternalLink>{" "}
            to submit a deletion request without reinstalling the app. All associated data will be
            permanently purged within 7 business days.
          </MutedLi>
          <MutedLi>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Email:</strong> Contact us at{" "}
            <a href="mailto:hello.sanzox@gmail.com" style={{ color: "#4A8BFF" }}>
              hello.sanzox@gmail.com
            </a>{" "}
            for any data deletion requests
          </MutedLi>
        </ol>

        {/* 11. Children's Privacy */}
        <SectionHeading num="11.">Children's Privacy</SectionHeading>
        <Muted>
          MaxDrive is not intended for children under the age of 13. We do not knowingly collect
          personal information from children. If you believe a child under 13 has provided us with
          personal information, please contact us and we will take immediate steps to delete such
          information.
        </Muted>

        {/* 12. Google API Services */}
        <SectionHeading num="12.">Google API Services User Data Policy</SectionHeading>
        <Card highlight>
          <Muted>
            MaxDrive's use and transfer of information received from Google APIs adheres to the{" "}
            <ExternalLink href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </ExternalLink>
            , including the{" "}
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Limited Use</strong> requirements.
          </Muted>
          <Muted>Specifically, MaxDrive:</Muted>
          <ul style={{ paddingLeft: 24, marginBottom: 0,listStyleType: "disc" }}>
            <MutedLi>
              Only uses Google Drive data to provide and improve app features visible to you
            </MutedLi>
            <MutedLi>
              Does not transfer Google user data to third parties except as necessary to provide the
              app's functionality
            </MutedLi>
            <MutedLi>Does not use Google user data for advertising purposes</MutedLi>
            <MutedLi>
              Does not allow humans to read Google user data (except with your explicit consent, for
              security investigations, or to comply with law)
            </MutedLi>
          </ul>
        </Card>

        {/* 13. International Transfers */}
        <SectionHeading num="13.">International Data Transfers</SectionHeading>
        <Muted>
          Your file data is stored in your Google Drive, which may be hosted in data centers
          worldwide per Google's infrastructure. MaxDrive does not independently transfer your data
          to any servers. Crash reports are processed by Firebase (Google) under their standard data
          processing terms.
        </Muted>

        {/* 14. Changes */}
        <SectionHeading num="14.">Changes to This Policy</SectionHeading>
        <Muted>
          We may update this Privacy Policy from time to time. When we make significant changes, we
          will:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>Update the "Last Updated" date at the top of this page</MutedLi>
          <MutedLi>
            Notify you through an in-app notification or the app's update notes on Google Play
          </MutedLi>
        </ul>
        <Muted>
          Continued use of MaxDrive after changes constitutes acceptance of the updated policy.
        </Muted>

        {/* 15. Contact */}
        <SectionHeading num="15.">Contact Us</SectionHeading>
        <Muted>
          If you have questions about this Privacy Policy or your data, contact us at:
        </Muted>
        <Card>
          <Muted style={{ marginBottom: 4 }}>
            <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>Sanzox</strong>
          </Muted>
          <Muted style={{ marginBottom: 4 }}>
            Email:{" "}
            <a href="mailto:hello.sanzox@gmail.com" style={{ color: "#4A8BFF" }}>
              hello.sanzox@gmail.com
            </a>
          </Muted>
          <Muted style={{ marginBottom: 4 }}>App: MaxDrive (com.sanzox.maxdrive)</Muted>
          <Muted style={{ marginBottom: 0 }}>Developer: Sanzox</Muted>
        </Card>
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          textAlign: "center",
          padding: "30px 20px",
          borderTop: "1px solid #2A2A3A",
          color: "#9898A8",
          fontSize: "0.8rem",
        }}
      >
        <p>&copy; 2026 Sanzox. All rights reserved.</p>
        <p style={{ marginTop: 6 }}>
          MaxDrive v1.2.0 &nbsp;·&nbsp;{" "}
          <a href="/maxdrive/terms-and-conditions" style={{ color: "#4A8BFF" }}>
            Terms & Conditions
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;