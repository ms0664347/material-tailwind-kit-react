Portfolio Website

個人作品集網站｜React + Tailwind + Material Tailwind + AWS S3

這是一個以 React + Tailwind CSS + Material Tailwind UI 打造的個人作品集網站，用來展示個人開發的前後端作品、個人資料、圖片展示流程與互動元件。網站使用 AWS S3 + CloudFront 進行部署與圖片讀取，並搭配自製 UI 元件讓內容更容易擴充與維護。
本專案參考 Material Tailwind Kit React 的 UI 設計，並進行大量重構、模組拆分與清理，使整體成為個人化的單頁作品集。

Demo（展示網站）

Live Demo https://d2bnp6sqlvy8vj.cloudfront.net/home

技術架構（Tech Stack）
Frontend

React 18

Vite

Tailwind CSS

Material Tailwind UI Components

自製：Project Card / Profile Card / Lightbox / FlowChart / TopContainer / Footer

Cloud & Deployment

AWS S3（靜態網站＋圖片儲存）

AWS CloudFront（CDN ＋ HTTPS）

S3 JSON 讀取、圖片自動 File 化

專案功能（Features）
作品展示區（Projects）

由 AWS S3 JSON＋圖片組成

每張作品卡片可查看詳細內容

支援 Lightbox 放大

支援行動裝置 RWD

🔹 FlowChart 流程圖

React＋Tailwind 客製化流程圖

清楚展示專案邏輯或工作流程

🔹 Profile 個人區塊

個人資料卡片 ProfileCard

React＋Tailwind UI 設計

🔹 完全前端 React SPA

無後端路由

所有組件模組化整理

專案結構（Project Structure）

src/
  api/
    s3.js                 # AWS S3 圖片與 JSON 讀取
  assets/
    # 你的靜態資源
  components/
    cards/
      ProfileCard.jsx
      ProjectCard.jsx
    FlowChart.jsx
    Footer.jsx
    Home.jsx
    Lightbox.jsx
    Profile.jsx
    Project.jsx
    TopContainer.jsx
  App.jsx
  main.jsx

public/
  css/
  img/

為符合 MIT 規範，本專案保留 Material Tailwind Kit React 之授權聲明：
This project includes UI components and code under the MIT License from Creative Tim.
Copyright © 2023 Creative Tim
Source: https://github.com/creativetimofficial/material-tailwind-kit-react


作者（Author）

陳昱夆
Full-stack Engineer｜Java / Spring Boot / React / AWS
Email：a0917379137@gmail.com