import React from "react";


const Card: React.FC<{
  variant?: "default" | "highlight" | "warning";
  children: React.ReactNode;
}> = ({ variant = "default", children }) => {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: "#1A1A25", border: "1px solid #2A2A3A" },
    highlight: { background: "rgba(74,139,255,0.12)", border: "1px solid #4A8BFF" },
    warning: { background: "rgba(251,191,36,0.08)", border: "1px solid #FBBF24" },
  };
  return (
    <div
      style={{
        borderRadius: 12,
        padding: "18px 20px",
        margin: "14px 0",
        ...styles[variant],
      }}
    >
      {children}
    </div>
  );
};

const CardLabel: React.FC<{
  variant?: "blue" | "orange";
  children: React.ReactNode;
}> = ({ variant = "blue", children }) => (
  <p
    style={{
      fontSize: "0.85rem",
      fontWeight: 600,
      color: variant === "orange" ? "#FBBF24" : "#4A8BFF",
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

const Bold: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong style={{ color: "#E8E8F0", fontWeight: 600 }}>{children}</strong>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const TermsAndConditions: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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
          background: "linear-gradient(135deg, #0D1B3E 0%, #1A0D3E 50%, #0A0A1A 100%)",
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
          Terms & Conditions
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

        {/* 1. Acceptance of Terms */}
        <SectionHeading num="1.">Acceptance of Terms</SectionHeading>
        <Muted>
          By downloading, installing, accessing, or using MaxDrive ("the App"), developed by Sanzox
          ("we," "our," or "us"), you ("User" or "you") agree to be bound by these Terms and
          Conditions ("Terms"). If you do not agree to these Terms, do not use the App.
        </Muted>
        <Muted>
          These Terms constitute a legally binding agreement between you and Sanzox governing your
          use of MaxDrive.
        </Muted>

        {/* 2. Description of Service */}
        <SectionHeading num="2.">Description of Service</SectionHeading>
        <Muted>MaxDrive is a mobile application that provides:</Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>
            <Bold>Multi-Account Google Drive Management:</Bold> Connect and manage multiple Google
            Drive accounts from a single interface
          </MutedLi>
          <MutedLi>
            <Bold>File Synchronization:</Bold> Real-time and background syncing of file metadata
            from Google Drive
          </MutedLi>
          <MutedLi>
            <Bold>Distributed File Upload:</Bold> Chunked file uploads distributed across multiple
            Google Drive accounts
          </MutedLi>
          <MutedLi>
            <Bold>Encrypted Vault:</Bold> AES-256-GCM encrypted file storage on Google Drive
          </MutedLi>
          <MutedLi>
            <Bold>Photo Auto-Backup:</Bold> Automatic backup of device photos and videos to Google
            Drive
          </MutedLi>
          <MutedLi>
            <Bold>Smart File Tagging:</Bold> On-device AI-powered file categorization
          </MutedLi>
          <MutedLi>
            <Bold>File Partitions:</Bold> Logical grouping and organization of files across accounts
          </MutedLi>
          <MutedLi>
            <Bold>Storage Analytics:</Bold> Visual representation of storage usage and file
            distribution
          </MutedLi>
        </ul>

        {/* 3. Account & Authentication */}
        <SectionHeading num="3.">Account & Authentication</SectionHeading>

        <SubHeading>3.1 Google Account Requirement</SubHeading>
        <Muted>
          MaxDrive requires at least one Google account to function. By connecting your Google
          account, you authorize MaxDrive to access your Google Drive files and metadata through
          Google's OAuth 2.0 protocol.
        </Muted>

        <SubHeading>3.2 Multiple Accounts</SubHeading>
        <Muted>
          You may connect multiple Google accounts. You are responsible for ensuring you have
          authorization to access each connected account.
        </Muted>

        <SubHeading>3.3 Account Security</SubHeading>
        <Muted>You are responsible for:</Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>Maintaining the security of your Google account credentials</MutedLi>
          <MutedLi>
            All activities that occur through your connected accounts in MaxDrive
          </MutedLi>
          <MutedLi>
            Immediately notifying us if you suspect unauthorized use of your accounts through the App
          </MutedLi>
        </ul>

        {/* 4. Acceptable Use */}
        <SectionHeading num="4.">Acceptable Use Policy</SectionHeading>
        <Muted>You agree NOT to use MaxDrive to:</Muted>
        <Card variant="warning">
          <CardLabel variant="orange">⚠️ Prohibited Activities</CardLabel>
          <ul style={{ paddingLeft: 24, marginBottom: 0,listStyleType: "disc" }}>
            <MutedLi>
              Violate any applicable laws, regulations, or Google's Terms of Service
            </MutedLi>
            <MutedLi>
              Upload, store, or distribute illegal content, malware, or harmful software
            </MutedLi>
            <MutedLi>
              Circumvent Google Drive's storage limitations through deceptive means
            </MutedLi>
            <MutedLi>Reverse-engineer, decompile, or disassemble the App</MutedLi>
            <MutedLi>
              Attempt to gain unauthorized access to other users' accounts or data
            </MutedLi>
            <MutedLi>Use the App's encryption features to conceal illegal activities</MutedLi>
            <MutedLi>
              Resell, redistribute, or sublicense the App without written permission
            </MutedLi>
            <MutedLi>Interfere with or disrupt the App's services or Google's APIs</MutedLi>
          </ul>
        </Card>

        {/* 5. Intellectual Property */}
        <SectionHeading num="5.">Intellectual Property</SectionHeading>

        <SubHeading>5.1 App Ownership</SubHeading>
        <Muted>
          MaxDrive, including its source code, design, UI, logo, and all related intellectual
          property, is owned by Sanzox and protected by copyright and other intellectual property
          laws.
        </Muted>

        <SubHeading>5.2 License Grant</SubHeading>
        <Muted>
          We grant you a limited, non-exclusive, non-transferable, revocable license to use MaxDrive
          on your personal device(s) for personal, non-commercial purposes in accordance with these
          Terms.
        </Muted>

        <SubHeading>5.3 Your Content</SubHeading>
        <Muted>
          You retain full ownership of all files you upload, sync, or manage through MaxDrive. We do
          not claim any ownership rights over your content.
        </Muted>

        {/* 6. Google Drive & Third-Party Services */}
        <SectionHeading num="6.">Google Drive & Third-Party Services</SectionHeading>

        <SubHeading>6.1 Google's Terms</SubHeading>
        <Muted>
          Your use of Google Drive through MaxDrive is additionally subject to{" "}
          <ExternalLink href="https://policies.google.com/terms">
            Google's Terms of Service
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink href="https://www.google.com/drive/terms-of-service/">
            Google Drive's Terms of Service
          </ExternalLink>
          . In case of conflict between our Terms and Google's Terms regarding Google Drive usage,
          Google's Terms prevail.
        </Muted>

        <SubHeading>6.2 API Quota & Limitations</SubHeading>
        <Muted>
          MaxDrive operates within Google Drive API quotas. Excessive usage may result in temporary
          rate limiting imposed by Google. MaxDrive automatically handles rate limits with API key
          rotation and exponential backoff.
        </Muted>

        <SubHeading>6.3 Third-Party Dependencies</SubHeading>
        <Muted>
          MaxDrive uses third-party open-source libraries and Firebase services. These components are
          governed by their respective licenses and terms.
        </Muted>

        {/* 7. Encryption & Vault */}
        <SectionHeading num="7.">Encryption & Vault Feature</SectionHeading>
        <Card variant="highlight">
          <CardLabel>Important: Encryption Responsibility</CardLabel>
          <Muted>
            The Vault feature uses AES-256-GCM encryption. The encryption key is stored{" "}
            <Bold>only on your device</Bold> in Android's hardware-backed Keystore.{" "}
            <Bold>We do not have access to your encryption key.</Bold>
          </Muted>
          <Muted style={{ marginBottom: 0 }}>
            <Bold>
              If you lose your encryption key (e.g., by clearing app data, factory resetting your
              device, or uninstalling the app without backing up your recovery key), your encrypted
              files cannot be recovered. Sanzox is not liable for data loss resulting from lost
              encryption keys.
            </Bold>
          </Muted>
        </Card>

        {/* 8. Distributed Upload */}
        <SectionHeading num="8.">Distributed Upload Feature</SectionHeading>
        <Muted>
          MaxDrive can split large files into smaller chunks and upload them across multiple Google
          Drive accounts. By using this feature, you acknowledge that:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>
            Each chunk is uploaded to the Google Drive account with the most free space
          </MutedLi>
          <MutedLi>
            Removing any connected account may make chunked files unrecoverable
          </MutedLi>
          <MutedLi>
            Storage quota consumption on each account is proportional to the chunks stored there
          </MutedLi>
          <MutedLi>
            MaxDrive tracks chunk metadata locally — clearing app data may prevent reassembly of
            distributed files
          </MutedLi>
        </ul>
        <Muted>
          <Bold>Sanzox is not responsible for any file loss or irrecoverability resulting from
          the removal of a connected Google account, clearing of app data, or uninstallation of
          the app while distributed chunks are stored across multiple accounts.</Bold> It is your
          responsibility to ensure all connected accounts remain active until distributed files are
          no longer needed.
        </Muted>

        {/* 9. Auto-Backup */}
        <SectionHeading num="9.">Photo & Video Auto-Backup</SectionHeading>
        <Muted>The Photo Auto-Backup feature, when enabled by you:</Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>
            Runs in the background using Android WorkManager (every 15 minutes)
          </MutedLi>
          <MutedLi>
            Only uploads photos and videos created <Bold>after</Bold> you enabled the feature
          </MutedLi>
          <MutedLi>
            Uploads files directly to your Google Drive — no intermediary servers
          </MutedLi>
          <MutedLi>Respects battery optimization (pauses when battery is low)</MutedLi>
          <MutedLi>Can be disabled at any time in Settings</MutedLi>
        </ul>
        <Muted>
          You are responsible for ensuring you have sufficient Google Drive storage quota for
          auto-backup.
        </Muted>

        {/* 10. Disclaimer of Warranties */}
        <SectionHeading num="10.">Disclaimer of Warranties</SectionHeading>
        <Muted>
          MaxDrive is provided <Bold>"AS IS"</Bold> and <Bold>"AS AVAILABLE"</Bold> without
          warranties of any kind, either express or implied, including but not limited to:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>
            Implied warranties of merchantability, fitness for a particular purpose, or
            non-infringement
          </MutedLi>
          <MutedLi>Uninterrupted or error-free operation</MutedLi>
          <MutedLi>Availability or reliability of Google Drive API services</MutedLi>
          <MutedLi>Security of data transmitted over the internet</MutedLi>
          <MutedLi>
            Compatibility with all devices, OS versions, or configurations
          </MutedLi>
        </ul>

        {/* 11. Limitation of Liability */}
        <SectionHeading num="11.">Limitation of Liability</SectionHeading>
        <Muted>
          To the maximum extent permitted by applicable law, Sanzox shall not be liable for:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>
            Any indirect, incidental, special, consequential, or punitive damages
          </MutedLi>
          <MutedLi>Loss of data, files, or encryption keys</MutedLi>
          <MutedLi>Business interruption or loss of profits</MutedLi>
          <MutedLi>Unauthorized access to your accounts or data</MutedLi>
          <MutedLi>
            Service interruptions caused by Google Drive API downtime
          </MutedLi>
          <MutedLi>
            Damages exceeding the amount you paid for the App (if any)
          </MutedLi>
        </ul>

        {/* 12. Indemnification */}
        <SectionHeading num="12.">Indemnification</SectionHeading>
        <Muted>
          You agree to indemnify, defend, and hold harmless Sanzox from any claims, damages, losses,
          liabilities, and expenses (including attorney's fees) arising from:
        </Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>Your use or misuse of MaxDrive</MutedLi>
          <MutedLi>Your violation of these Terms</MutedLi>
          <MutedLi>Your violation of any third-party rights</MutedLi>
          <MutedLi>Content you upload, store, or manage through the App</MutedLi>
        </ul>

        {/* 13. Termination */}
        <SectionHeading num="13.">Termination</SectionHeading>

        <SubHeading>13.1 By You</SubHeading>
        <Muted>
          You may terminate your use of MaxDrive at any time by disconnecting all accounts and
          uninstalling the App.
        </Muted>

        <SubHeading>13.2 By Us</SubHeading>
        <Muted>
          We reserve the right to suspend or terminate your access to MaxDrive if you violate these
          Terms, with or without notice.
        </Muted>

        <SubHeading>13.3 Effect of Termination</SubHeading>
        <Muted>Upon termination:</Muted>
        <ul style={{ paddingLeft: 24, marginBottom: 14,listStyleType: "disc" }}>
          <MutedLi>Your license to use the App is immediately revoked</MutedLi>
          <MutedLi>All locally stored data is deleted upon uninstallation</MutedLi>
          <MutedLi>
            Your files on Google Drive are not affected — they remain in your Google account
          </MutedLi>
          <MutedLi>
            Provisions that by their nature should survive termination (including Sections 10, 11,
            12) will survive
          </MutedLi>
        </ul>

        {/* 14. App Updates */}
        <SectionHeading num="14.">App Updates</SectionHeading>
        <Muted>
          We may release updates to MaxDrive that may add, modify, or remove features. Continued use
          of the App after updates constitutes acceptance of any changes. Some updates may be
          required for security or compatibility reasons.
        </Muted>

        {/* 15. Governing Law */}
        <SectionHeading num="15.">Governing Law</SectionHeading>
        <Muted>
          These Terms shall be governed by and construed in accordance with the laws of Bangladesh,
          without regard to conflict of law principles. Any disputes shall be resolved in the courts
          of Bangladesh.
        </Muted>

        {/* 16. Severability */}
        <SectionHeading num="16.">Severability</SectionHeading>
        <Muted>
          If any provision of these Terms is found to be invalid or unenforceable, the remaining
          provisions will continue in full force and effect.
        </Muted>

        {/* 17. Changes to These Terms */}
        <SectionHeading num="17.">Changes to These Terms</SectionHeading>
        <Muted>
          We reserve the right to modify these Terms at any time. Changes will be effective upon
          posting the updated Terms with a new "Last Updated" date. Your continued use of MaxDrive
          after changes constitutes acceptance of the revised Terms.
        </Muted>

        {/* 18. Contact Information */}
        <SectionHeading num="18.">Contact Information</SectionHeading>
        <Muted>For questions about these Terms, contact us at:</Muted>
        <Card>
          <Muted style={{ marginBottom: 4 }}>
            <Bold>Sanzox</Bold>
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
          <a href="/maxdrive/privacy-policy" style={{ color: "#4A8BFF" }}>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;