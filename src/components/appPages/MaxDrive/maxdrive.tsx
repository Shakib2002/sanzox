import React, { useState, useEffect } from "react";

import logo from '../../../assets/maxdrive-logo.png';
import AppSlider from "./appSlider";


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
    --green-glow: rgba(16, 185, 129, 0.15);
    --red: #ef4444;
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
    scroll-behavior: smooth;
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

  .md-root ::-webkit-scrollbar { width: 8px; }
  .md-root ::-webkit-scrollbar-track { background: var(--bg); }
  .md-root ::-webkit-scrollbar-thumb { background: #232541; border-radius: 4px; }
  .md-root ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

  .md-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* ── HEADER ─────────────────────────────────────────────────────── */
  .md-header {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: 1200px;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 14px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    box-shadow: var(--shadow);
    transition: border-radius 0.3s ease;
  }

  .md-header.menu-open {
    border-radius: 20px 20px 0 0;
  }

  .md-logo-area {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .md-logo-img {
    height: 40px;
    width: auto;
    display: block;
    object-fit: contain;
  }

  /* Desktop nav */
  .md-nav {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .md-nav a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .md-nav a:hover { color: #fff; }

  .md-nav-btn {
    background: #fff;
    color: #000 !important;
    padding: 8px 18px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .md-nav-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,255,255,0.15);
  }

  /* Hamburger button */
  .md-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 10px;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
  }

  .md-hamburger span {
    display: block;
    width: 18px;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .md-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .md-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .md-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile drawer */
  .md-mobile-menu {
    position: fixed;
    top: calc(16px + 64px);
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: 1200px;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-top: none;
    border-radius: 0 0 20px 20px;
    padding: 16px 24px 24px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.7);
    animation: md-slideDown 0.2s ease;
  }

  @keyframes md-slideDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  .md-mobile-menu a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    padding: 12px 4px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color 0.2s ease;
  }

  .md-mobile-menu a:last-child { border-bottom: none; }
  .md-mobile-menu a:hover { color: #fff; }

  .md-mobile-menu-btn {
    margin-top: 8px;
    background: var(--accent-gradient);
    color: #fff !important;
    padding: 12px 18px;
    border-radius: 12px;
    font-weight: 600;
    text-align: center;
    border-bottom: none !important;
  }

  /* ── HERO ────────────────────────────────────────────────────────── */
  .md-hero {
    padding-top: 160px;
    padding-bottom: 80px;
    position: relative;
    text-align: center;
  }

  .md-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.2);
    color: #818cf8;
    padding: 6px 16px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 24px;
    letter-spacing: 0.3px;
    animation: md-pulseGlow 3s infinite ease-in-out;
  }

  .md-badge-dot {
    width: 6px;
    height: 6px;
    background: #818cf8;
    border-radius: 50%;
    box-shadow: 0 0 8px #818cf8;
    flex-shrink: 0;
  }

  .md-h1 {
    font-family: var(--font-title);
    font-weight: 800;
    font-size: 56px;
    line-height: 1.15;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
    color: #fff;
  }

  .md-h1 span {
    background: linear-gradient(135deg, #818cf8 10%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .md-subtitle {
    font-size: 18px;
    color: var(--text-muted);
    max-width: 680px;
    margin: 0 auto 36px;
    font-weight: 400;
    line-height: 1.6;
  }

  .md-cta-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 60px;
    flex-wrap: wrap;
  }

  .md-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s ease;
    border: none;
    font-family: var(--font-main);
  }

  .md-btn-primary {
    background: var(--accent-gradient);
    color: #fff;
    box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
  }

  .md-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.6);
  }

  .md-btn-secondary {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    color: var(--text);
  }

  .md-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  /* ── MOCKUP ──────────────────────────────────────────────────────── */
  .md-mockup-wrapper {
    position: relative;
    max-width: 860px;
    margin: 0 auto;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.05) 100%);
    padding: 8px;
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.8);
  }

  .md-app-mockup {
    background: #090a14;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    aspect-ratio: 16 / 10;
  }

  .md-mockup-mobile {
    display: none;
    flex-direction: column;
    gap: 12px;
  }

  .md-mockup-header {
    background: rgba(14,16,37,0.9);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .md-mockup-dots { display: flex; gap: 6px; }
  .md-mockup-dot { width: 10px; height: 10px; border-radius: 50%; }
  .md-mockup-dot:nth-child(1) { background: #ff5f56; }
  .md-mockup-dot:nth-child(2) { background: #ffbd2e; }
  .md-mockup-dot:nth-child(3) { background: #27c93f; }

  .md-mockup-title {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
    background: rgba(255,255,255,0.03);
    padding: 4px 16px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.04);
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  .md-mockup-body { display: flex; flex: 1; overflow: hidden; }

  .md-mockup-sidebar {
    width: 20%;
    background: rgba(7,8,20,0.9);
    border-right: 1px solid rgba(255,255,255,0.04);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-shrink: 0;
  }

  .md-sidebar-item {
    height: 30px;
    background: rgba(255,255,255,0.02);
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 8px;
  }

  .md-sidebar-item.active {
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.2);
  }

  .md-sidebar-item-icon { width: 14px; height: 14px; border-radius: 3px; background: var(--text-muted); flex-shrink: 0; }
  .md-sidebar-item.active .md-sidebar-item-icon { background: #6366f1; }
  .md-sidebar-item-line { flex: 1; height: 6px; background: var(--text-muted); border-radius: 3px; opacity: 0.3; }
  .md-sidebar-item.active .md-sidebar-item-line { background: #fff; opacity: 0.6; }

  .md-mockup-content {
    flex: 1;
    padding: 24px;
    display: flex;
    gap: 20px;
    text-align: left;
    overflow: hidden;
  }

  .md-mockup-main { flex: 1.2; display: flex; flex-direction: column; gap: 16px; min-width: 0; }

  .md-mockup-status-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px;
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .md-mockup-status-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 4px; height: 100%;
    background: var(--accent-gradient);
  }

  .md-ring-display {
    width: 80px; height: 80px;
    border-radius: 50%;
    border: 8px solid rgba(255,255,255,0.03);
    border-top: 8px solid #6366f1;
    border-right: 8px solid #a855f7;
    border-bottom: 8px solid #10b981;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .md-ring-center { font-size: 14px; font-weight: 700; color: #fff; }

  .md-status-info { flex: 1; min-width: 0; }
  .md-status-info-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .md-status-info-desc { font-size: 12px; color: var(--text-muted); margin-bottom: 10px; }

  .md-accounts-list-mock { display: flex; flex-direction: column; gap: 6px; }
  .md-account-mock-row { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted); }
  .md-account-color-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; flex-shrink: 0; }

  .md-mockup-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .md-mock-grid-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px; }
  .md-mock-grid-card-title { font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
  .md-mock-grid-card-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .md-mock-grid-card-content { font-size: 10px; color: var(--text-muted); }
  .md-mock-progress-bar { height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; margin-top: 8px; overflow: hidden; }
  .md-mock-progress-fill { height: 100%; border-radius: 2px; }

  .md-mockup-details {
    flex: 0.8;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    overflow: hidden;
  }

  .md-mock-detail-title { font-size: 13px; font-weight: 700; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }

  .md-mock-file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background: rgba(255,255,255,0.01);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.03);
  }

  .md-mock-file-info { display: flex; align-items: center; gap: 8px; min-width: 0; }
  .md-mock-file-icon { width: 24px; height: 24px; border-radius: 6px; background: rgba(99,102,241,0.2); color: #818cf8; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
  .md-mock-file-texts { display: flex; flex-direction: column; min-width: 0; }
  .md-mock-file-name { font-size: 11px; font-weight: 500; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .md-mock-file-size { font-size: 9px; color: var(--text-muted); }
  .md-mock-file-badge { font-size: 9px; padding: 2px 6px; background: var(--accent-glow); color: #818cf8; border: 1px solid rgba(99,102,241,0.2); border-radius: 10px; font-weight: 600; flex-shrink: 0; }

  /* Mobile mockup card styles */
  .md-mm-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px;
  }

  .md-mm-storage-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 14px;
  }

  .md-mm-ring {
    width: 56px; height: 56px;
    border-radius: 50%;
    border: 6px solid rgba(255,255,255,0.03);
    border-top: 6px solid #6366f1;
    border-right: 6px solid #a855f7;
    border-bottom: 6px solid #10b981;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .md-mm-ring span { font-size: 12px; font-weight: 700; color: #fff; }
  .md-mm-label { font-size: 14px; font-weight: 700; color: #fff; }
  .md-mm-sublabel { font-size: 12px; color: var(--text-muted); }

  .md-mm-accounts { display: flex; flex-direction: column; gap: 8px; }
  .md-mm-acc-row { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--text-muted); }
  .md-mm-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; flex-shrink: 0; }

  .md-mm-stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .md-mm-stat {
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px;
  }

  .md-mm-stat-title { font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 4px; display: flex; align-items: center; gap: 6px; }
  .md-mm-stat-sub { font-size: 11px; color: var(--text-muted); }
  .md-mm-bar { height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; margin-top: 8px; overflow: hidden; }
  .md-mm-bar-fill { height: 100%; border-radius: 2px; }

  .md-mm-files { display: flex; flex-direction: column; gap: 8px; }
  .md-mm-file { display: flex; align-items: center; justify-content: space-between; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 10px; border: 1px solid rgba(255,255,255,0.04); }
  .md-mm-file-left { display: flex; align-items: center; gap: 10px; }
  .md-mm-file-icon { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
  .md-mm-file-name { font-size: 13px; font-weight: 500; color: #fff; }
  .md-mm-file-size { font-size: 11px; color: var(--text-muted); }
  .md-mm-badge { font-size: 10px; padding: 3px 8px; border-radius: 10px; font-weight: 600; border: 1px solid; flex-shrink: 0; }

  /* ── FEATURES ────────────────────────────────────────────────────── */
  .md-features { padding: 90px 0; }

  .md-section-header { text-align: center; max-width: 600px; margin: 0 auto 56px; padding: 0 16px; }
  .md-section-header h2 { font-family: var(--font-title); font-weight: 800; font-size: 40px; color: #fff; margin-bottom: 16px; letter-spacing: -1px; }
  .md-section-header p { color: var(--text-muted); font-size: 16px; }

  .md-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }

  .md-feature-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .md-feature-card:hover {
    transform: translateY(-5px);
    border-color: var(--border-hover);
    box-shadow: 0 20px 40px -15px rgba(99,102,241,0.15);
    background: var(--surface-hover);
  }

  .md-feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: var(--accent-gradient);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .md-feature-card:hover::before { opacity: 1; }

  .md-feature-icon-box {
    width: 48px; height: 48px;
    background: var(--accent-glow);
    border: 1px solid rgba(99,102,241,0.2);
    color: #818cf8;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 20px;
    flex-shrink: 0;
  }

  .md-feature-card:nth-child(2) .md-feature-icon-box { background: rgba(168,85,247,0.08); border-color: rgba(168,85,247,0.2); color: #c084fc; }
  .md-feature-card:nth-child(3) .md-feature-icon-box { background: rgba(16,185,129,0.08); border-color: rgba(16,185,129,0.2); color: #34d399; }

  .md-feature-card h3 { font-family: var(--font-title); font-weight: 700; font-size: 19px; color: #fff; margin-bottom: 10px; }
  .md-feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.65; }

  /* ── COMPLIANCE ──────────────────────────────────────────────────── */
  .md-compliance-section {
    background: rgba(14,16,37,0.4);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 80px 0;
  }

  .md-compliance-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }

  .md-compliance-text h2 { font-family: var(--font-title); font-weight: 800; font-size: 36px; color: #fff; margin-bottom: 18px; letter-spacing: -0.8px; }
  .md-compliance-text p { color: var(--text-muted); font-size: 15px; margin-bottom: 16px; line-height: 1.75; }
  .md-compliance-text a { color: #818cf8; font-weight: 600; text-decoration: none; }

  .md-compliance-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    backdrop-filter: blur(12px);
  }

  .md-compliance-card h3 { font-family: var(--font-title); font-weight: 700; font-size: 17px; color: #fff; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
  .md-compliance-card h3 svg { color: #818cf8; flex-shrink: 0; }
  .md-compliance-card ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .md-compliance-card li { font-size: 14px; color: var(--text-muted); display: flex; gap: 10px; align-items: flex-start; }
  .md-compliance-card li svg { flex-shrink: 0; margin-top: 3px; }

  /* ── FAQ ─────────────────────────────────────────────────────────── */
  .md-faq { padding: 90px 0; }
  .md-faq-accordion { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; }

  .md-faq-item {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px 20px;
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

  .md-faq-icon { font-size: 20px; font-weight: 400; color: var(--text-muted); transition: color 0.2s ease; flex-shrink: 0; }
  .md-faq-item.open .md-faq-icon { color: #818cf8; }

  .md-faq-body {
    margin-top: 14px;
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.65;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 14px;
  }

  /* ── FOOTER ──────────────────────────────────────────────────────── */
  .md-footer {
    border-top: 1px solid var(--border);
    padding: 56px 0 28px;
    background: #020308;
    color: var(--text-muted);
  }

  .md-footer-grid { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 36px; margin-bottom: 44px; }
  .md-footer-brand { display: flex; flex-direction: column; gap: 14px; }
  .md-footer-brand p { font-size: 14px; line-height: 1.6; }
  .md-footer-col h4 { font-family: var(--font-title); font-weight: 700; font-size: 15px; color: #fff; margin-bottom: 18px; }
  .md-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .md-footer-col a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s ease; }
  .md-footer-col a:hover { color: #fff; }

  .md-footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.04);
    padding-top: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    flex-wrap: wrap;
    gap: 14px;
  }

  .md-footer-bottom a { color: var(--text-muted); text-decoration: none; margin-left: 20px; transition: color 0.2s ease; }
  .md-footer-bottom a:hover { color: #fff; }

  /* ── KEYFRAMES ───────────────────────────────────────────────────── */
  @keyframes md-pulseGlow {
    0%, 100% { opacity: 0.9; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.02); }
  }

  /* ── BREAKPOINTS ─────────────────────────────────────────────────── */

  /* Tablet — 1024px */
  @media (max-width: 1024px) {
    .md-nav { gap: 20px; }
    .md-footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
    .md-compliance-text h2 { font-size: 30px; }
  }

  /* Small tablet — 860px: hide desktop nav, show hamburger */
  @media (max-width: 860px) {
    .md-nav { display: none; }
    .md-hamburger { display: flex; }
    .md-h1 { font-size: 44px; }
    .md-subtitle { font-size: 17px; }

    /* Switch to mobile mockup */
    .md-app-mockup { display: none; }
    .md-mockup-mobile { display: flex; }
    .md-mockup-wrapper { max-width: 600px; padding: 0; background: none; border: none; box-shadow: none; }

    .md-compliance-wrapper { grid-template-columns: 1fr; gap: 36px; }
    .md-compliance-text h2 { font-size: 28px; }
  }

  /* Mobile — 640px */
  @media (max-width: 640px) {
    .md-container { padding: 0 16px; }
    .md-header { top: 12px; width: calc(100% - 24px); padding: 12px 16px; border-radius: 16px; }
    .md-header.menu-open { border-radius: 16px 16px 0 0; }
    .md-mobile-menu { top: calc(12px + 60px); width: calc(100% - 24px); border-radius: 0 0 16px 16px; }

    .md-hero { padding-top: 130px; padding-bottom: 56px; }
    .md-badge { font-size: 11px; padding: 5px 12px; }
    .md-h1 { font-size: 32px; letter-spacing: -0.8px; }
    .md-subtitle { font-size: 15px; margin-bottom: 28px; }
    .md-cta-group { gap: 12px; margin-bottom: 40px; }
    .md-btn { padding: 12px 22px; font-size: 14px; }

    .md-features { padding: 64px 0; }
    .md-section-header { margin-bottom: 36px; }
    .md-section-header h2 { font-size: 28px; }
    .md-features-grid { grid-template-columns: 1fr; gap: 14px; }
    .md-feature-card { padding: 22px; }

    .md-compliance-section { padding: 56px 0; }
    .md-compliance-text h2 { font-size: 24px; }
    .md-compliance-text p { font-size: 14px; }
    .md-compliance-card { padding: 20px; }

    .md-faq { padding: 64px 0; }
    .md-faq-summary { font-size: 14px; }

    .md-footer { padding: 44px 0 24px; }
    .md-footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
    .md-footer-bottom { flex-direction: column; text-align: center; gap: 10px; }
    .md-footer-bottom a { margin: 0 8px; }
  }

  /* XS — 400px */
  @media (max-width: 400px) {
    .md-h1 { font-size: 26px; }
    .md-cta-group { flex-direction: column; align-items: stretch; }
    .md-btn { justify-content: center; }
    .md-footer-grid { grid-template-columns: 1fr; gap: 20px; }
  }
`;

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconDownload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
  </svg>
);

const IconUsers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconLock = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconMesh = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconCleaner = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconCamera = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconAI = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Sub-components ────────────────────────────────────────────────────────────

const AppMockup: React.FC = () => (
  <div className="md-app-mockup">
    <div className="md-mockup-header">
      <div className="md-mockup-dots">
        <div className="md-mockup-dot" />
        <div className="md-mockup-dot" />
        <div className="md-mockup-dot" />
      </div>
      <div className="md-mockup-title">https://www.sanzox.com/maxdrive</div>
      <div style={{ width: 42 }} />
    </div>

    <div className="md-mockup-body">
      {/* Sidebar */}
      <div className="md-mockup-sidebar">
        {["active", "", "", ""].map((cls, i) => (
          <div key={i} className={`md-sidebar-item${cls ? " active" : ""}`}>
            <div className="md-sidebar-item-icon" />
            <div className="md-sidebar-item-line" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="md-mockup-content">
        <div className="md-mockup-main">
          {/* Status Card */}
          <div className="md-mockup-status-card">
            <div className="md-ring-display">
              <div className="md-ring-center">72%</div>
            </div>
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
                    <span>
                      <span className="md-account-color-dot" style={{ background: acc.color }} />
                      {acc.label}
                    </span>
                    <span style={{ color: "#fff" }}>{acc.used}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="md-mockup-grid">
            <div className="md-mock-grid-card">
              <div className="md-mock-grid-card-title">
                <span className="md-mock-grid-card-dot" style={{ background: "#10b981" }} />
                Auto-Backup
              </div>
              <div className="md-mock-grid-card-content">Status: Active<br />Target: Backup Drive C</div>
              <div className="md-mock-progress-bar">
                <div className="md-mock-progress-fill" style={{ width: "85%", background: "#10b981" }} />
              </div>
            </div>
            <div className="md-mock-grid-card">
              <div className="md-mock-grid-card-title">
                <span className="md-mock-grid-card-dot" style={{ background: "#f59e0b" }} />
                Smart Vault
              </div>
              <div className="md-mock-grid-card-content">Lock: Biometric<br />Files encrypted: 14</div>
              <div className="md-mock-progress-bar">
                <div className="md-mock-progress-fill" style={{ width: "30%", background: "#f59e0b" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="md-mockup-details">
          <div className="md-mock-detail-title">Recent Uploads</div>
          {[
            {
              ext: "IMG",
              name: "vacation_photo.jpg",
              size: "4.2 MB",
              badge: "Mesh",
              iconBg: "rgba(99,102,241,0.2)",
              iconColor: "#818cf8",
              badgeBg: "var(--accent-glow)",
              badgeColor: "#818cf8",
              badgeBorder: "rgba(99,102,241,0.2)",
            },
            {
              ext: "PDF",
              name: "tax_return_2025.pdf",
              size: "1.8 MB",
              badge: "Vault",
              iconBg: "rgba(16,185,129,0.2)",
              iconColor: "#34d399",
              badgeBg: "rgba(16,185,129,0.1)",
              badgeColor: "#34d399",
              badgeBorder: "rgba(16,185,129,0.2)",
            },
            {
              ext: "MP4",
              name: "video_project.mp4",
              size: "85.4 MB",
              badge: "Primary",
              iconBg: "rgba(239,68,68,0.2)",
              iconColor: "#f87171",
              badgeBg: "rgba(239,68,68,0.1)",
              badgeColor: "#f87171",
              badgeBorder: "rgba(239,68,68,0.2)",
            },
          ].map((f) => (
            <div key={f.name} className="md-mock-file-item">
              <div className="md-mock-file-info">
                <div className="md-mock-file-icon" style={{ background: f.iconBg, color: f.iconColor }}>
                  {f.ext}
                </div>
                <div className="md-mock-file-texts">
                  <span className="md-mock-file-name">{f.name}</span>
                  <span className="md-mock-file-size">{f.size}</span>
                </div>
              </div>
              <span
                className="md-mock-file-badge"
                style={{ background: f.badgeBg, color: f.badgeColor, borderColor: f.badgeBorder }}
              >
                {f.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileMockup: React.FC = () => (
  <div className="md-mockup-mobile">
    {/* Storage overview card */}
    <div className="md-mm-card">
      <div className="md-mm-storage-row">
        <div className="md-mm-ring"><span>72%</span></div>
        <div>
          <div className="md-mm-label">Connected Storage</div>
          <div className="md-mm-sublabel">3 Accounts linked</div>
        </div>
      </div>
      <div className="md-mm-accounts">
        {[
          { color: "#6366f1", label: "Primary (Google Drive)", used: "12.5 / 15 GB" },
          { color: "#a855f7", label: "Storage Account B",     used: "8.2 / 15 GB"  },
          { color: "#10b981", label: "Backup Drive C",        used: "11.1 / 15 GB" },
        ].map((a) => (
          <div key={a.label} className="md-mm-acc-row">
            <span><span className="md-mm-dot" style={{ background: a.color }} />{a.label}</span>
            <span style={{ color: "#fff" }}>{a.used}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Stats row */}
    <div className="md-mm-stat-row">
      <div className="md-mm-stat">
        <div className="md-mm-stat-title">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", flexShrink: 0, display: "inline-block" }} />
          Auto-Backup
        </div>
        <div className="md-mm-stat-sub">Active · Backup Drive C</div>
        <div className="md-mm-bar"><div className="md-mm-bar-fill" style={{ width: "85%", background: "#10b981" }} /></div>
      </div>
      <div className="md-mm-stat">
        <div className="md-mm-stat-title">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", flexShrink: 0, display: "inline-block" }} />
          Smart Vault
        </div>
        <div className="md-mm-stat-sub">Biometric · 14 files</div>
        <div className="md-mm-bar"><div className="md-mm-bar-fill" style={{ width: "30%", background: "#f59e0b" }} /></div>
      </div>
    </div>

    {/* Recent uploads */}
    <div className="md-mm-card">
      <div className="md-mock-detail-title" style={{ marginBottom: 12 }}>Recent Uploads</div>
      <div className="md-mm-files">
        {[
          { ext: "IMG", name: "vacation_photo.jpg",  size: "4.2 MB",  badge: "Mesh",    iconBg: "rgba(99,102,241,0.2)",  iconColor: "#818cf8", badgeColor: "#818cf8", badgeBorder: "rgba(99,102,241,0.3)"  },
          { ext: "PDF", name: "tax_return_2025.pdf", size: "1.8 MB",  badge: "Vault",   iconBg: "rgba(16,185,129,0.2)",  iconColor: "#34d399", badgeColor: "#34d399", badgeBorder: "rgba(16,185,129,0.3)"  },
          { ext: "MP4", name: "video_project.mp4",   size: "85.4 MB", badge: "Primary", iconBg: "rgba(239,68,68,0.2)",   iconColor: "#f87171", badgeColor: "#f87171", badgeBorder: "rgba(239,68,68,0.3)"   },
        ].map((f) => (
          <div key={f.name} className="md-mm-file">
            <div className="md-mm-file-left">
              <div className="md-mm-file-icon" style={{ background: f.iconBg, color: f.iconColor }}>{f.ext}</div>
              <div>
                <div className="md-mm-file-name">{f.name}</div>
                <div className="md-mm-file-size">{f.size}</div>
              </div>
            </div>
            <span className="md-mm-badge" style={{ color: f.badgeColor, borderColor: f.badgeBorder, background: f.iconBg }}>{f.badge}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ResponsiveMockup: React.FC = () => (
  <div className="md-mockup-wrapper">
    <AppMockup />
    <MobileMockup />
  </div>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`md-faq-item${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="md-faq-summary">
        <span>{question}</span>
        <span className="md-faq-icon">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="md-faq-body">{answer}</div>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const MaxDrive: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => { if (menuOpen) setMenuOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const features = [
    {
      icon: <IconUsers />,
      title: "Multi-Account Management",
      desc: "Link multiple Google Drive accounts securely under one Unified Dashboard. View aggregate quota usage in real-time, toggle accounts dynamically, and manage files without sign-in friction.",
    },
    {
      icon: <IconLock />,
      title: "Encrypted Private Vault",
      desc: "Lock your critical documents with AES-256-GCM hardware-backed encryption. Access files with local biometric authentication (fingerprint or face). Encryption keys never leave your device.",
    },
    {
      icon: <IconMesh />,
      title: "Distributed Mesh Sync",
      desc: "Upload files by segmenting them across connected drives to make the best use of free space, or save directly to a designated primary account. Seamless file rebuilding during downloads.",
    },
    {
      icon: <IconCleaner />,
      title: "Smart Cloud Cleaner",
      desc: "Optimize your linked storage quickly. Scan for duplicate photos/videos, trace giant obsolete temporary files, and delete redundant content to free up storage space in clicks.",
    },
    {
      icon: <IconCamera />,
      title: "Auto Photo Backup",
      desc: "Automate your gallery backups. Synchronize your newly captured photos and videos to a selected drive partition background-wise. Customizable cellular data limits.",
    },
    {
      icon: <IconAI />,
      title: "On-Device Tag AI",
      desc: "Organize smart folders without compromise. Intelligent local analysis categorizes your files using metadata (no content transmission) for lightning-fast search filters.",
    },
  ];

  const faqs = [
    {
      question: "Is MaxDrive safe to use? Where are my files stored?",
      answer: "Yes, MaxDrive is absolutely safe. MaxDrive is a local-first application, which means it has no cloud servers of its own. Your files are stored strictly on your Google Drive accounts and inside your phone's physical storage. No one except you can access your files or account details.",
    },
    {
      question: "How does the Multi-Account integration work?",
      answer: "MaxDrive uses Google's official OAuth 2.0 protocol. You can sign in to multiple accounts inside the app. Once connected, MaxDrive combines their storage metrics on the dashboard and allows you to browse, search, upload, or sync files across any of the linked accounts seamlessly.",
    },
    {
      question: "What is the Encrypted Private Vault?",
      answer: "The Vault is a local secure zone where you can store sensitive files. When you move files to the Vault, MaxDrive encrypts them on-device using military-grade AES-256-GCM encryption. These files can only be decrypted and opened with your device's biometric authentication (fingerprint/face).",
    },
    {
      question: "How can I delete my data from MaxDrive?",
      answer: "To delete your cached data and disconnect your accounts, simply tap \"Disconnect Account\" in the app's settings. Since all credentials and database files are stored locally on your device, uninstalling the app also instantly deletes all traces of data. You can also revoke OAuth permissions at any time from your Google Account settings page.",
    },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="md-root">
      <style>{styles}</style>

      {/* Header */}
      <header className={`md-header${menuOpen ? " menu-open" : ""}`}>
        <a href="#" className="md-logo-area">
          <img src={logo} alt="MaxDrive" className="md-logo-img" />
          <p className="font-bold">MaxDrive</p>
        </a>

        {/* Desktop nav */}
        <nav className="md-nav">
          <a href="#features">Features</a>
          <a href="#compliance">Privacy &amp; OAuth</a>
          <a href="#faq">FAQ</a>
          <a href="/maxdrive/privacy-policy">Privacy Policy</a>
          <a href="/maxdrive/terms-and-conditions">Terms &amp; Conditions</a>
          <a href="mailto:hello.sanzox@gmail.com" className="md-nav-btn">Support</a>
        </nav>

        {/* Hamburger */}
        <button
          className={`md-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md-mobile-menu">
          <a href="#features"          onClick={closeMenu}>Features</a>
          <a href="#compliance"        onClick={closeMenu}>Privacy &amp; OAuth</a>
          <a href="#faq"               onClick={closeMenu}>FAQ</a>
          <a href="/maxdrive/privacy-policy"       onClick={closeMenu}>Privacy Policy</a>
          <a href="/maxdrive/terms-and-conditions" onClick={closeMenu}>Terms &amp; Conditions</a>
          <a href="mailto:hello.sanzox@gmail.com"  onClick={closeMenu} className="md-mobile-menu-btn">Support</a>
        </div>
      )}

      {/* Hero */}
      <section className="md-hero md-container">
        <div className="md-badge">
          <span className="md-badge-dot" />
          Google OAuth &amp; Consent Screen Verified App
        </div>
        <h1 className="md-h1">
          The Ultimate <span>Multi-Account</span>
          <br />
          Google Drive Manager
        </h1>
        <p className="md-subtitle">
          Connect, partition, and sync files across multiple Google Drive accounts in a single
          premium dashboard. Store sensitive assets in an encrypted local vault, clean duplicates,
          and automate photo backups securely.
        </p>
        <div className="md-cta-group">
          <a href="/maxdrive.apk" className="md-btn md-btn-primary">
            <IconDownload />
            Download APK
          </a>
          <a href="#features" className="md-btn md-btn-secondary">
            Explore Features
          </a>
        </div>
        {/* <ResponsiveMockup /> */}
        <div className="flex justify-center items-center">
          <AppSlider/>
        </div>
      </section>

      {/* Features */}
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

      {/* Compliance */}
      <section className="md-compliance-section" id="compliance">
        <div className="md-container md-compliance-wrapper">
          <div className="md-compliance-text">
            <h2>Google API User Data Policy &amp; App Purpose</h2>
            <p>
              MaxDrive is designed exclusively to help users organize, secure, and merge their
              Google Drive accounts. The app acts as an active local client and never transmits
              your data to third-party endpoints.
            </p>
            <p>
              Our use and transfer of information received from Google APIs adheres to the{" "}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">
                Google API Services User Data Policy
              </a>
              , including the <strong>Limited Use</strong> requirements.
            </p>
            <p>
              Google credentials (OAuth access and refresh tokens) are processed locally,
              encrypted on-device, and sent directly to Google APIs via HTTPS.
            </p>
          </div>

          <div className="md-compliance-card">
            <h3><IconShield />Data Use Transparency</h3>
            <ul>
              {[
                { bold: "Google Drive Scope:",       text: "Read, edit, create, and delete operations on your files only as explicitly initiated by your actions." },
                { bold: "Secure Tokens:",            text: "Tokens are stored using AES-256 encryption in Android's hardware-backed Keystore." },
                { bold: "No Third-Party Transfers:", text: "We do not sell or share Google API details with advertisers, databases, or third parties." },
                { bold: "Local Operations:",         text: "All synchronization, partitioning, and vault encryption calculations happen on-device." },
              ].map((item) => (
                <li key={item.bold}>
                  <IconCheck />
                  <span><strong>{item.bold}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="md-faq md-container" id="faq">
        <div className="md-section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about MaxDrive's security and account sync.</p>
        </div>
        <div className="md-faq-accordion">
          {faqs.map((f) => (
            <FAQItem key={f.question} question={f.question} answer={f.answer} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="md-footer">
        <div className="md-container md-footer-grid">
          <div className="md-footer-brand">
            <a href="#" className="md-logo-area">
              <img src={logo} alt="MaxDrive" className="md-logo-img" />
              <h2 className="font-bold">MaxDrive</h2>
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
              <li><a href="/maxdrive/privacy-policy">Privacy Policy</a></li>
              <li><a href="/maxdrive/terms-and-conditions">Terms &amp; Conditions</a></li>
            </ul>
          </div>
          <div className="md-footer-col">
            <h4>Developer</h4>
            <ul>
              <li><a href="/" className="font-semibold">Sanzox Team</a></li>
              <li><a href="mailto:hello.sanzox@gmail.com">hello.sanzox@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="md-container md-footer-bottom">
          <p>&copy; 2026 Sanzox. All rights reserved.</p>
          <div>
            <a href="/maxdrive/privacy-policy">Privacy Policy</a>
            <a href="/maxdrive/terms-and-conditions">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaxDrive;