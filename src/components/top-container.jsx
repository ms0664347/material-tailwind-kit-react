import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getBgData } from "../api/s3get";
export function TopContainer() {
    const [images, setImages] = useState([]); // [{src, name}]
    const [currentIndex, setCurrentIndex] = useState(0);
    const s3BaseUrl = "https://pigxuan-db.s3.ap-northeast-1.amazonaws.com";

    useEffect(() => {
        (async () => {
            try {
                const bg = await getBgData(); // [{ image: "/img/xxx.jpg" }, ...]
                const imgs = bg.map(item => ({
                    src: s3BaseUrl + item.image,
                    name: item.image,
                }));
                setImages(imgs);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    useEffect(() => {
        if (!images.length) return;
        const id = setInterval(
            () => setCurrentIndex(i => (i + 1) % images.length),
            5000
        );
        return () => clearInterval(id);
    }, [images.length]);

    return (
        <>  {/* ★ 頂部導覽列（劉海） */}
            <div
                className="
                    relative     /* 手機尺寸：預設 relative，不固定 */
                    sm:fixed     /* sm以上：變成 fixed */
                    sm:top-0 
                    sm:left-1/2 sm:-translate-x-1/2 
                    w-[100%] lg:w-[90%]
                    h-[60px] sm:h-[60px]
                    flex items-center justify-between
                    px-6 py-4
                    bg-white/70 backdrop-blur-md shadow-md
                    z-50
                "
            >
                {/* LOGO */}
                {/* LOGO 區塊：圖示 + 文字靠左 */}
                <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-blue-gray-800">
                    <img
                        src="../../img/pigpig.png"   // ⬅️ 換成你的小圖示
                        alt="PigXuan Logo"
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                    />
                    豬小萱 PigXuan
                </div>


                {/* 導覽按鈕 */}
                <div className="
                    flex gap-3 text-sm 
                    sm:gap-6 sm:text-lg 
                    font-medium text-blue-gray-700
                ">
                    {["主頁", "作品", "聯絡我"].map((t, i) => (
                        <Typography
                            key={i}
                            variant="body2"        // 手機字體
                            className="cursor-pointer hover:text-blue-600 sm:text-lg"
                            style={{ color: "#575757" }}
                        >
                            {t}
                        </Typography>
                    ))}
                </div>
            </div>

            <div className="
                    relative 
                    mt-[0px]      /* 手機時 90px 空間 */
                    md:mt-[5%]  /* 平板以上給更多空間 */
                    lg:mt-[5%]  /* 平板以上給更多空間 */
                    lg:mb-[1%]
                    h-[30vh] sm:h-[50vh] md:h-[55vh] lg:h-[70vh] 
                    overflow-hidden justify-center
                ">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img.src}
                        alt={`背景圖 ${ index }`}
                        className={`absolute inset-0 m-auto w-full h-full max-w-[85vw] max-h-[90vh] object-contain transition-opacity duration-1000 ${ index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    />

                ))}

                {/* 左右箭頭 */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() =>
                                setCurrentIndex(i => (i - 1 + images.length) % images.length)
                            }
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-full z-20"
                        >
                            ‹
                        </button>
                        <button
                            onClick={() =>
                                setCurrentIndex(i => (i + 1) % images.length)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 px-3 py-1 rounded-full z-20"
                        >
                            ›
                        </button>
                    </>
                )}

                {/* dot */}
                {images.length > 1 && (
                    <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 z-20">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${ currentIndex === idx ? "bg-white" : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default TopContainer;
