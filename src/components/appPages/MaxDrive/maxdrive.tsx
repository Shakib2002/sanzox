import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #030307;
    --surface: #0a0b16;
    --surface-hover: #121426;
    --card: rgba(14, 16, 37, 0.7);
    --border: rgba(255, 255, 255, 0.08);
    --border-hover: rgba(79, 70, 229, 0.4);
    --text: #f3f4f6;
    --text-muted: #9ca3af;
    --accent: #4f46e5;
    --accent-glow: rgba(79, 70, 229, 0.15);
    --accent-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    --green: #10b981;
    --glass-bg: rgba(10, 11, 22, 0.6);
    --glass-border: rgba(255, 255, 255, 0.06);
    --shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.7);
    --font-main: 'Plus Jakarta Sans', sans-serif;
    --font-title: 'Outfit', sans-serif;
  }

  .md-root * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .md-root {
    font-family: var(--font-main);
    background-color: var(--bg);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
    background-image:
      radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 45%);
    min-height: 100vh;
  }

  .md-root ::-webkit-scrollbar { width: 6px; }
  .md-root ::-webkit-scrollbar-track { background: var(--bg); }
  .md-root ::-webkit-scrollbar-thumb { background: #232541; border-radius: 4px; }

  .md-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header - Mobile Optimized */
  .md-header {
    position: fixed;
    top: 16px;
    left: 16px;
    right: 16px;
    width: auto;
    max-width: calc(1200px - 32px);
    margin: 0 auto;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 28px;
    padding: 10px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    box-shadow: var(--shadow);
  }

  .md-logo-area {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .md-logo-icon {
    width: 34px;
    height: 34px;
    background: var(--accent-gradient);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-title);
    font-weight: 800;
    font-size: 18px;
    color: #fff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  .md-logo-text {
    font-family: var(--font-title);
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.3px;
    background: linear-gradient(135deg, #fff 60%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Hamburger Menu Button */
  .md-hamburger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28px;
    height: 20px;
    cursor: pointer;
    z-index: 1002;
    background: transparent;
    border: none;
  }

  .md-hamburger span {
    display: block;
    height: 2px;
    width: 100%;
    background: white;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .md-hamburger.open span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }

  .md-hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .md-hamburger.open span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }

  /* Desktop Navigation */
  .md-nav {
    display: none;
    align-items: center;
    gap: 24px;
  }

  @media (min-width: 768px) {
    .md-nav {
      display: flex;
    }
    .md-hamburger {
      display: none;
    }
  }

  .md-nav a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s ease;
    white-space: nowrap;
  }

  .md-nav a:hover { color: #fff; }

  .md-nav-btn {
    background: #fff;
    color: #000 !important;
    padding: 7px 16px;
    border-radius: 40px;
    font-weight: 600;
    font-size: 13px;
  }

  /* Mobile Menu Overlay */
  .md-mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(3, 3, 7, 0.98);
    backdrop-filter: blur(20px);
    z-index: 999;
    display: flex;
    flex-direction: column;
 
    gap: 28px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    padding: 80px 24px;
  }
  .md-mobile-menu a {
    text-align: start !important;
   }

  .md-mobile-menu.open {
    transform: translateX(0);
  }

  .md-mobile-menu a {
    color: var(--text);
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    padding: 12px 24px;
    width: 100%;
    max-width: 280px;
    text-align: center;
    border-radius: 16px;
    transition: all 0.2s ease;
  }

  .md-mobile-menu a:active {
    background: rgba(99, 102, 241, 0.2);
    color: #818cf8;
  }

  .md-mobile-menu .md-nav-btn {
    background: #fff;
    color: #000 !important;
    margin-top: 8px;
  }

  .md-mobile-menu-close {
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 28px;
    cursor: pointer;
    color: var(--text-muted);
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    transition: background 0.2s;
  }

  .md-mobile-menu-close:active {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Hero */
  .md-hero {
    padding-top: 130px;
    padding-bottom: 60px;
    position: relative;
    text-align: center;
  }

  @media (min-width: 768px) {
    .md-hero {
      padding-top: 170px;
      padding-bottom: 90px;
    }
  }

  .md-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.2);
    color: #818cf8;
    padding: 5px 14px;
    border-radius: 40px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 24px;
    animation: md-pulseGlow 3s infinite ease-in-out;
  }

  .md-badge-dot {
    width: 6px;
    height: 6px;
    background: #818cf8;
    border-radius: 50%;
    box-shadow: 0 0 8px #818cf8;
  }

  .md-h1 {
    font-family: var(--font-title);
    font-weight: 800;
    font-size: 34px;
    line-height: 1.2;
    letter-spacing: -1px;
    margin-bottom: 20px;
    color: #fff;
  }

  @media (min-width: 768px) {
    .md-h1 {
      font-size: 56px;
      line-height: 1.15;
    }
  }

  .md-h1 span {
    background: linear-gradient(135deg, #818cf8 10%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .md-subtitle {
    font-size: 15px;
    color: var(--text-muted);
    max-width: 680px;
    margin: 0 auto 32px;
    font-weight: 400;
    padding: 0 12px;
  }

  @media (min-width: 768px) {
    .md-subtitle {
      font-size: 18px;
      margin-bottom: 36px;
    }
  }

  .md-cta-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 50px;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
    .md-cta-group {
      gap: 16px;
      margin-bottom: 70px;
    }
  }

  .md-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.25s ease;
    border: none;
    font-family: var(--font-main);
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .md-btn {
      padding: 14px 28px;
      font-size: 15px;
    }
  }

  .md-btn-primary {
    background: var(--accent-gradient);
    color: #fff;
    box-shadow: 0 8px 20px -5px rgba(99, 102, 241, 0.4);
  }

  .md-btn-secondary {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    color: var(--text);
  }

  /* Mockup */
  .md-mockup-wrapper {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%);
    padding: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
  }

  @media (min-width: 768px) {
    .md-mockup-wrapper {
      padding: 8px;
      border-radius: 24px;
    }
  }

  .md-app-mockup {
    background: #090a14;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .md-mockup-header {
    background: rgba(14, 16, 37, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .md-mockup-dots { display: flex; gap: 6px; }
  .md-mockup-dot { width: 9px; height: 9px; border-radius: 50%; }
  .md-mockup-dot:nth-child(1) { background: #ff5f56; }
  .md-mockup-dot:nth-child(2) { background: #ffbd2e; }
  .md-mockup-dot:nth-child(3) { background: #27c93f; }

  .md-mockup-title {
    font-size: 9px;
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.03);
    padding: 4px 10px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    white-space: nowrap;
    overflow-x: auto;
    max-width: 140px;
    text-overflow: ellipsis;
  }

  @media (min-width: 480px) {
    .md-mockup-title {
      font-size: 11px;
      max-width: 200px;
    }
  }

  .md-mockup-body {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 720px) {
    .md-mockup-body {
      flex-direction: row;
    }
  }

  .md-mockup-sidebar {
    background: rgba(7, 8, 20, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    padding: 12px;
    display: flex;
    gap: 10px;
    overflow-x: auto;
    flex-shrink: 0;
  }

  @media (min-width: 720px) {
    .md-mockup-sidebar {
      flex-direction: column;
      width: 20%;
      border-right: 1px solid rgba(255, 255, 255, 0.04);
      border-bottom: none;
      overflow-x: visible;
      padding: 16px;
    }
  }

  .md-sidebar-item {
    height: 34px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    flex-shrink: 0;
  }

  .md-sidebar-item.active {
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .md-sidebar-item-icon { width: 14px; height: 14px; border-radius: 3px; background: var(--text-muted); }
  .md-sidebar-item.active .md-sidebar-item-icon { background: #6366f1; }
  .md-sidebar-item-line { flex: 1; height: 6px; background: var(--text-muted); border-radius: 3px; opacity: 0.3; min-width: 40px; }

  .md-mockup-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (min-width: 720px) {
    .md-mockup-content {
      padding: 24px;
      flex-direction: row;
      gap: 20px;
    }
  }

  .md-mockup-main {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .md-mockup-status-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 480px) {
    .md-mockup-status-card {
      flex-direction: row;
      align-items: center;
    }
  }

  .md-mockup-status-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: var(--accent-gradient);
  }

  .md-ring-display {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 6px solid rgba(255, 255, 255, 0.03);
    border-top: 6px solid #6366f1;
    border-right: 6px solid #a855f7;
    border-bottom: 6px solid #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    align-self: center;
  }

  @media (min-width: 480px) {
    .md-ring-display {
      align-self: auto;
    }
  }

  .md-ring-center { font-size: 14px; font-weight: 700; color: #fff; }

  .md-status-info { flex: 1; min-width: 0; }
  .md-status-info-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .md-status-info-desc { font-size: 12px; color: var(--text-muted); margin-bottom: 10px; }

  .md-accounts-list-mock { display: flex; flex-direction: column; gap: 6px; }
  .md-account-mock-row { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted); flex-wrap: wrap; gap: 6px; }
  .md-account-color-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; flex-shrink: 0; }

  .md-mockup-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (min-width: 480px) {
    .md-mockup-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .md-mock-grid-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px; }
  .md-mock-grid-card-title { font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
  .md-mock-grid-card-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .md-mock-grid-card-content { font-size: 10px; color: var(--text-muted); }
  .md-mock-progress-bar { height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 2px; margin-top: 8px; overflow: hidden; }
  .md-mock-progress-fill { height: 100%; border-radius: 2px; }

  .md-mockup-details {
    flex: 0.8;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .md-mock-detail-title { font-size: 13px; font-weight: 700; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }

  .md-mock-file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.03);
    flex-wrap: wrap;
    gap: 8px;
  }

  .md-mock-file-info { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .md-mock-file-icon { width: 28px; height: 28px; border-radius: 6px; background: rgba(99,102,241,0.2); color: #818cf8; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
  .md-mock-file-texts { display: flex; flex-direction: column; min-width: 0; }
  .md-mock-file-name { font-size: 11px; font-weight: 500; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px; }
  @media (min-width: 480px) {
    .md-mock-file-name { max-width: 120px; }
  }
  .md-mock-file-size { font-size: 9px; color: var(--text-muted); }
  .md-mock-file-badge { font-size: 9px; padding: 2px 8px; background: var(--accent-glow); color: #818cf8; border: 1px solid rgba(99,102,241,0.2); border-radius: 12px; font-weight: 600; flex-shrink: 0; }

  /* Features */
  .md-features { padding: 60px 0; }
  @media (min-width: 768px) {
    .md-features { padding: 100px 0; }
  }

  .md-section-header { text-align: center; max-width: 600px; margin: 0 auto 40px; padding: 0 16px; }
  @media (min-width: 768px) {
    .md-section-header { margin-bottom: 60px; }
  }
  .md-section-header h2 { font-family: var(--font-title); font-weight: 800; font-size: 32px; color: #fff; margin-bottom: 16px; letter-spacing: -1px; }
  @media (min-width: 768px) {
    .md-section-header h2 { font-size: 40px; }
  }
  .md-section-header p { color: var(--text-muted); font-size: 15px; }

  .md-features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 4px;
  }

  @media (min-width: 640px) {
    .md-features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1000px) {
    .md-features-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .md-feature-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .md-feature-icon-box {
    width: 44px;
    height: 44px;
    background: var(--accent-glow);
    border: 1px solid rgba(99,102,241,0.2);
    color: #818cf8;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .md-feature-card h3 { font-family: var(--font-title); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 10px; }
  .md-feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

  /* Compliance */
  .md-compliance-section {
    background: rgba(14,16,37,0.4);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 60px 0;
  }

  @media (min-width: 768px) {
    .md-compliance-section {
      padding: 90px 0;
    }
  }

  .md-compliance-wrapper {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  @media (min-width: 800px) {
    .md-compliance-wrapper {
      flex-direction: row;
      gap: 50px;
      align-items: center;
    }
  }

  .md-compliance-text h2 { font-family: var(--font-title); font-weight: 800; font-size: 28px; color: #fff; margin-bottom: 20px; letter-spacing: -0.8px; }
  @media (min-width: 768px) {
    .md-compliance-text h2 { font-size: 38px; }
  }
  .md-compliance-text p { color: var(--text-muted); font-size: 15px; margin-bottom: 18px; line-height: 1.7; }
  .md-compliance-text a { color: #818cf8; font-weight: 600; text-decoration: none; }

  .md-compliance-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
    backdrop-filter: blur(12px);
  }

  @media (min-width: 768px) {
    .md-compliance-card {
      padding: 32px;
    }
  }

  .md-compliance-card h3 { font-family: var(--font-title); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
  .md-compliance-card ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .md-compliance-card li { font-size: 13px; color: var(--text-muted); display: flex; gap: 10px; align-items: flex-start; }
  @media (min-width: 768px) {
    .md-compliance-card li { font-size: 14px; }
  }

  /* FAQ */
  .md-faq { padding: 60px 0; }
  @media (min-width: 768px) {
    .md-faq { padding: 100px 0; }
  }
  .md-faq-accordion { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; }

  .md-faq-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px 20px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .md-faq-item.open {
    border-color: var(--border-hover);
    background: var(--surface-hover);
  }

  .md-faq-summary {
    font-weight: 600;
    font-size: 15px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    user-select: none;
  }

  .md-faq-icon { font-size: 20px; font-weight: 400; color: var(--text-muted); flex-shrink: 0; }
  .md-faq-item.open .md-faq-icon { color: #818cf8; }

  .md-faq-body {
    margin-top: 14px;
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.6;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 14px;
  }

  /* Footer */
  .md-footer {
    border-top: 1px solid var(--border);
    padding: 50px 0 30px;
    background: #020308;
    color: var(--text-muted);
  }

  .md-footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }

  @media (min-width: 640px) {
    .md-footer-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1000px) {
    .md-footer-grid {
      grid-template-columns: 1.5fr repeat(3, 1fr);
      gap: 40px;
      margin-bottom: 50px;
    }
  }

  .md-footer-brand { display: flex; flex-direction: column; gap: 16px; }
  .md-footer-brand p { font-size: 14px; line-height: 1.6; }
  .md-footer-col h4 { font-family: var(--font-title); font-weight: 700; font-size: 15px; color: #fff; margin-bottom: 20px; }
  .md-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .md-footer-col a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s ease; }
  .md-footer-col a:hover { color: #fff; }

  .md-footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.04);
    padding-top: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    text-align: center;
  }

  @media (min-width: 640px) {
    .md-footer-bottom {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  .md-footer-bottom a { color: var(--text-muted); text-decoration: none; margin: 0 10px; transition: color 0.2s ease; }
  .md-footer-bottom a:hover { color: #fff; }

  @keyframes md-pulseGlow {
    0%, 100% { opacity: 0.9; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.02); }
  }
`;

// SVG Icons
const IconDownload = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></svg>);
const IconUsers = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IconLock = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
const IconMesh = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>);
const IconCleaner = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>);
const IconCamera = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>);
const IconAI = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>);
const IconShield = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const IconCheck = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>);

// Mockup Component
const AppMockup: React.FC = () => (
  <div className="md-mockup-wrapper">
    <div className="md-app-mockup">
      <div className="md-mockup-header">
        <div className="md-mockup-dots"><div className="md-mockup-dot" /><div className="md-mockup-dot" /><div className="md-mockup-dot" /></div>
        <div className="md-mockup-title">https://www.sanzox.com/maxdrive</div>
        <div style={{ width: 38 }} />
      </div>
      <div className="md-mockup-body">
        <div className="md-mockup-sidebar">
          {["active", "", "", ""].map((cls, i) => (
            <div key={i} className={`md-sidebar-item${cls ? " active" : ""}`}>
              <div className="md-sidebar-item-icon" /><div className="md-sidebar-item-line" />
            </div>
          ))}
        </div>
        <div className="md-mockup-content">
          <div className="md-mockup-main">
            <div className="md-mockup-status-card">
              <div className="md-ring-display"><div className="md-ring-center">72%</div></div>
              <div className="md-status-info">
                <div className="md-status-info-title">Connected Storage</div>
                <div className="md-status-info-desc">3 Accounts linked</div>
                <div className="md-accounts-list-mock">
                  {[
                    { color: "#6366f1", label: "Primary (Google Drive)", used: "12.5 GB / 15 GB" },
                    { color: "#a855f7", label: "Storage Account B", used: "8.2 GB / 15 GB" },
                    { color: "#10b981", label: "Backup Drive C", used: "11.1 GB / 15 GB" },
                  ].map((acc) => (
                    <div key={acc.label} className="md-account-mock-row">
                      <span><span className="md-account-color-dot" style={{ background: acc.color }} />{acc.label}</span>
                      <span style={{ color: "#fff" }}>{acc.used}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md-mockup-grid">
              <div className="md-mock-grid-card">
                <div className="md-mock-grid-card-title"><span className="md-mock-grid-card-dot" style={{ background: "#10b981" }} />Auto-Backup</div>
                <div className="md-mock-grid-card-content">Status: Active<br />Target: Backup Drive C</div>
                <div className="md-mock-progress-bar"><div className="md-mock-progress-fill" style={{ width: "85%", background: "#10b981" }} /></div>
              </div>
              <div className="md-mock-grid-card">
                <div className="md-mock-grid-card-title"><span className="md-mock-grid-card-dot" style={{ background: "#f59e0b" }} />Smart Vault</div>
                <div className="md-mock-grid-card-content">Lock: Biometric<br />Files encrypted: 14</div>
                <div className="md-mock-progress-bar"><div className="md-mock-progress-fill" style={{ width: "30%", background: "#f59e0b" }} /></div>
              </div>
            </div>
          </div>
          <div className="md-mockup-details">
            <div className="md-mock-detail-title">Recent Uploads</div>
            {[
              { ext: "IMG", name: "vacation_photo.jpg", size: "4.2 MB", badge: "Mesh", color: "#818cf8", bg: "rgba(99,102,241,0.2)" },
              { ext: "PDF", name: "tax_return_2025.pdf", size: "1.8 MB", badge: "Vault", color: "#34d399", bg: "rgba(16,185,129,0.2)" },
              { ext: "MP4", name: "video_project.mp4", size: "85.4 MB", badge: "Primary", color: "#f87171", bg: "rgba(239,68,68,0.2)" },
            ].map((f) => (
              <div key={f.name} className="md-mock-file-item">
                <div className="md-mock-file-info">
                  <div className="md-mock-file-icon" style={{ background: f.bg, color: f.color }}>{f.ext}</div>
                  <div className="md-mock-file-texts"><span className="md-mock-file-name">{f.name}</span><span className="md-mock-file-size">{f.size}</span></div>
                </div>
                <span className="md-mock-file-badge">{f.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// FAQ Item Component
interface FAQItemProps { question: string; answer: string; }
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`md-faq-item${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="md-faq-summary"><span>{question}</span><span className="md-faq-icon">{open ? "−" : "+"}</span></div>
      {open && <div className="md-faq-body">{answer}</div>}
    </div>
  );
};

// Main Component
const MaxDrive: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const features = [
    { icon: <IconUsers />, title: "Multi-Account Management", desc: "Link multiple Google Drive accounts securely under one Unified Dashboard. View aggregate quota usage in real-time, toggle accounts dynamically, and manage files without sign-in friction." },
    { icon: <IconLock />, title: "Encrypted Private Vault", desc: "Lock your critical documents with AES-256-GCM hardware-backed encryption. Access files with local biometric authentication (fingerprint or face). Encryption keys never leave your device." },
    { icon: <IconMesh />, title: "Distributed Mesh Sync", desc: "Upload files by segmenting them across connected drives to make the best use of free space, or save directly to a designated primary account. Seamless file rebuilding during downloads." },
    { icon: <IconCleaner />, title: "Smart Cloud Cleaner", desc: "Optimize your linked storage quickly. Scan for duplicate photos/videos, trace giant obsolete temporary files, and delete redundant content to free up storage space in clicks." },
    { icon: <IconCamera />, title: "Auto Photo Backup", desc: "Automate your gallery backups. Synchronize your newly captured photos and videos to a selected drive partition background-wise. Customizable cellular data limits." },
    { icon: <IconAI />, title: "On-Device Tag AI", desc: "Organize smart folders without compromise. Intelligent local analysis categorizes your files using metadata (no content transmission) for lightning-fast search filters." },
  ];

  const faqs = [
    { question: "Is MaxDrive safe to use? Where are my files stored?", answer: "Yes, MaxDrive is absolutely safe. MaxDrive is a local-first application, which means it has no cloud servers of its own. Your files are stored strictly on your Google Drive accounts and inside your phone's physical storage. No one except you can access your files or account details." },
    { question: "How does the Multi-Account integration work?", answer: "MaxDrive uses Google's official OAuth 2.0 protocol. You can sign in to multiple accounts inside the app. Once connected, MaxDrive combines their storage metrics on the dashboard and allows you to browse, search, upload, or sync files across any of the linked accounts seamlessly." },
    { question: "What is the Encrypted Private Vault?", answer: "The Vault is a local secure zone where you can store sensitive files. When you move files to the Vault, MaxDrive encrypts them on-device using military-grade AES-256-GCM encryption. These files can only be decrypted and opened with your device's biometric authentication (fingerprint/face)." },
    { question: "How can I delete my data from MaxDrive?", answer: "To delete your cached data and disconnect your accounts, simply tap Disconnect Account in the app's settings. Since all credentials and database files are stored locally on your device, uninstalling the app also instantly deletes all traces of data. You can also revoke OAuth permissions at any time from your Google Account settings page." },
  ];

  return (
    <div className="md-root">
      <style>{styles}</style>
      
      {/* Header with Hamburger Menu */}
      <header className="md-header">
        <a href="#" className="md-logo-area">
          <div className="md-logo-icon">M</div>
          <div className="md-logo-text">MaxDrive</div>
        </a>
        
        {/* Hamburger Button - visible on mobile */}
        <button className={`md-hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="md-nav">
          <a href="#features">Features</a>
          <a href="#compliance">Privacy &amp; OAuth</a>
          <a href="#faq">FAQ</a>
          <a href="/maxdrive/privacy-policy">Privacy Policy</a>
          <a href="/maxdrive/terms-and-conditions">Terms &amp; Conditions</a>
          <a href="mailto:hello.sanzox@gmail.com" className="md-nav-btn">Support</a>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`md-mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="md-mobile-menu-close" onClick={closeMenu} aria-label="Close">✕</button>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="#compliance" onClick={closeMenu}>Privacy &amp; OAuth</a>
        <a href="#faq" onClick={closeMenu}>FAQ</a>
        <a href="/maxdrive/privacy-policy" onClick={closeMenu}>Privacy Policy</a>
        <a href="/maxdrive/terms-and-conditions" onClick={closeMenu}>Terms &amp; Conditions</a>
        <a href="mailto:hello.sanzox@gmail.com" className="md-nav-btn" onClick={closeMenu}>Support</a>
      </div>

      {/* Hero Section */}
      <section className="md-hero md-container">
        <div className="md-badge"><span className="md-badge-dot" />Google OAuth &amp; Consent Screen Verified App</div>
        <h1 className="md-h1">The Ultimate <span>Multi-Account</span><br />Google Drive Manager</h1>
        <p className="md-subtitle">Connect, partition, and sync files across multiple Google Drive accounts in a single premium dashboard. Store sensitive assets in an encrypted local vault, clean duplicates, and automate photo backups securely.</p>
        <div className="md-cta-group">
          <a href="#" className="md-btn md-btn-primary"><IconDownload /> Download APK</a>
          <a href="#features" className="md-btn md-btn-secondary">Explore Features</a>
        </div>
        <AppMockup />
      </section>

      {/* Features Section */}
      <section className="md-features md-container" id="features">
        <div className="md-section-header">
          <h2>Core Features</h2>
          <p>Engineered for visual elegance, built for ultimate storage performance.</p>
        </div>
        <div className="md-features-grid">
          {features.map((f) => (
            <div key={f.title} className="md-feature-card">
              <div className="md-feature-icon-box">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Section */}
      <section className="md-compliance-section" id="compliance">
        <div className="md-container md-compliance-wrapper">
          <div className="md-compliance-text">
            <h2>Google API User Data Policy &amp; App Purpose</h2>
            <p>MaxDrive is designed exclusively to help users organize, secure, and merge their Google Drive accounts. The app acts as an active local client and never transmits your data to third-party endpoints.</p>
            <p>Our use and transfer of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">Google API Services User Data Policy</a>, including the <strong>Limited Use</strong> requirements.</p>
            <p>Google credentials (OAuth access and refresh tokens) are processed locally, encrypted on-device, and sent directly to Google APIs via HTTPS.</p>
          </div>
          <div className="md-compliance-card">
            <h3><IconShield /> Data Use Transparency</h3>
            <ul>
              <li><IconCheck /><span><strong>Google Drive Scope:</strong> Read, edit, create, and delete operations on your files only as explicitly initiated by your actions.</span></li>
              <li><IconCheck /><span><strong>Secure Tokens:</strong> Tokens are stored using AES-256 encryption in Android's hardware-backed Keystore.</span></li>
              <li><IconCheck /><span><strong>No Third-Party Transfers:</strong> We do not sell or share Google API details with advertisers, databases, or third parties.</span></li>
              <li><IconCheck /><span><strong>Local Operations:</strong> All synchronization, partitioning, and vault encryption calculations happen on-device.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="md-faq md-container" id="faq">
        <div className="md-section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about MaxDrive's security and account sync.</p>
        </div>
        <div className="md-faq-accordion">
          {faqs.map((f) => (<FAQItem key={f.question} question={f.question} answer={f.answer} />))}
        </div>
      </section>

      {/* Footer */}
      <footer className="md-footer">
        <div className="md-container md-footer-grid">
          <div className="md-footer-brand">
            <a href="#" className="md-logo-area">
              <div className="md-logo-icon">M</div>
              <div className="md-logo-text">MaxDrive</div>
            </a>
            <p>Sleek, secure, and multi-account cloud storage orchestrator. Unlock your Google Drive potential.</p>
          </div>
          <div className="md-footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#compliance">Data Privacy</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="md-footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
              <li><a href="terms-and-conditions.html">Terms &amp; Conditions</a></li>
            </ul>
          </div>
          <div className="md-footer-col">
            <h4>Developer</h4>
            <ul>
              <li><p style={{ fontSize: 14, marginBottom: 4 }}>Sanzox</p></li>
              <li><a href="mailto:hello.sanzox@gmail.com">hello.sanzox@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="md-container md-footer-bottom">
          <p>&copy; 2026 Sanzox. All rights reserved.</p>
          <div>
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="terms-and-conditions.html">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaxDrive;