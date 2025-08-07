import { useEffect, useState } from "react";

export function TopContainer() {
    const [bgImage, setBgImage] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = "https://pigxuan.s3.ap-northeast-1.amazonaws.com";

    useEffect(() => {
        fetch(`${ baseUrl }/bgData.json?t=${ Date.now() }`)
            .then((res) => res.json())
            .then((bgData) => setBgImage(bgData.slice(0, 3)))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (bgImage.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % bgImage.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [bgImage]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>載入失敗: {error.message}</div>;

    return (
        <div className="relative mt-4 h-[40vh] sm:h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
            {bgImage.map((img, index) => (
                <img
                    key={index}
                    src={encodeURI(baseUrl + img.img)}
                    alt={`背景圖 ${ index }`}
                    className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ${ index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0' }`}
                />
            ))}

            {/* 左右箭頭 */}
            <button
                onClick={() => setCurrentIndex((currentIndex - 1 + bgImage.length) % bgImage.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-full z-20"
            >
                ‹
            </button>
            <button
                onClick={() => setCurrentIndex((currentIndex + 1) % bgImage.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-full z-20"
            >
                ›
            </button>

            {/* dots（大尺寸顯示） */}
            <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 z-20">
                {bgImage.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${ currentIndex === idx ? "bg-white" : "bg-white/50" }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default TopContainer;
