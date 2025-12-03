// src/api/s3getProject.js

export async function getProjectData() {
    const res = await fetch("https://pigxuan-db.s3.ap-northeast-1.amazonaws.com/json/projectData.json?t=" + Date.now());
    if (!res.ok) throw new Error(`HTTP ${ res.status }`);

    const text = await res.text();
    if (!text.trim()) return []; // 空檔直接回 []

    try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export async function getIndustryData() {
    const res = await fetch("https://pigxuan-db.s3.ap-northeast-1.amazonaws.com/json/industry.json?t=" + Date.now());
    if (!res.ok) throw new Error(`HTTP ${ res.status }`);

    const text = await res.text();
    if (!text.trim()) return []; // 空檔直接回 []

    try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export async function getCategoryData() {
    const res = await fetch("https://pigxuan-db.s3.ap-northeast-1.amazonaws.com/json/category.json?t=" + Date.now());
    if (!res.ok) throw new Error(`HTTP ${ res.status }`);

    const text = await res.text();
    if (!text.trim()) return []; // 空檔直接回 []

    try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export async function getProfileData() {

    const res = await fetch("https://pigxuan-db.s3.ap-northeast-1.amazonaws.com/json/profile.json?t=" + Date.now());

    if (!res.ok) throw new Error(`HTTP ${ res.status }`);

    const text = await res.text();
    if (!text.trim()) return {}; // 空檔直接回 {}

    try {
        const data = JSON.parse(text);
        return typeof data === "object" && data !== null ? data : {}; // 確保是物件
    } catch {
        return {}; // JSON 格式錯誤也回 {}
    }
}

export async function getBioData() {

    const res = await fetch("https://pigxuan-db.s3.ap-northeast-1.amazonaws.com/json/bio.json?t=" + Date.now());

    if (!res.ok) throw new Error(`HTTP ${ res.status }`);

    const text = await res.text();
    if (!text.trim()) return {}; // 空檔直接回 {}

    try {
        const data = JSON.parse(text);
        return typeof data === "object" && data !== null ? data : {}; // 確保是物件
    } catch {
        return {}; // JSON 格式錯誤也回 {}
    }
}

export async function getBgData() {
    const res = await fetch("https://pigxuan-db.s3.ap-northeast-1.amazonaws.com/json/bgData.json?t=" + Date.now());
    if (!res.ok) throw new Error(`HTTP ${ res.status }`);

    const text = await res.text();
    if (!text.trim()) return []; // 空檔直接回 []

    try {
        const data = JSON.parse(text);
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export async function getConcept() {
    const res = await fetch("https://pigxuan-db.s3.ap-northeast-1.amazonaws.com/json/concept.json?t=" + Date.now());
    if (!res.ok) throw new Error(`HTTP ${ res.status }`);

    const text = await res.text();
    if (!text.trim()) return {}; // 空檔直接回 {}

    try {
        const data = JSON.parse(text);
        return typeof data === "object" && data !== null ? data : {}; // 確保是物件
    } catch {
        return {}; // JSON 格式錯誤也回 {}
    }
}

export async function getFlowChart() {
    const res = await fetch("https://pigxuan-db.s3.ap-northeast-1.amazonaws.com/json/flowChart.json?t=" + Date.now());
    if (!res.ok) throw new Error(`HTTP ${ res.status }`);

    const text = await res.text();
    if (!text.trim()) return {}; // 空檔直接回 {}

    try {
        const data = JSON.parse(text);
        return typeof data === "object" && data !== null ? data : {}; // 確保是物件
    } catch {
        return {}; // JSON 格式錯誤也回 {}
    }
}

