import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";

export default function flowChart() {
    const [active, setActive] = useState(1);
    const [flowChart, setFlowChart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://pigxuan.s3.ap-northeast-1.amazonaws.com/flowChart.json?t=" + Date.now()).then(res => res.json())

            .then((flowChartData) => {
                setFlowChart(flowChartData);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>載入失敗: {error.message}</div>;
    return (
        <>
            <div className="flex justify-center">
                <h3 className="mb-4 text-center text-3xl leading-snug font-bold text-blue-gray-900">
                    {flowChart.title}
                </h3>
            </div>

            <div className="w-full px-10">
                {/* 上方線條 + 節點 */}
                <div className="relative flex items-center justify-center mb-10 w-full mx-auto">
                    <div className="relative flex items-center justify-between mb-10 w-full max-w-4xl mx-auto px-6">
                        {/* 前導透明線段 */}
                        <div className="flex-1 h-1 opacity-0"></div>
                        {flowChart.content?.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                {/* 節點 */}
                                <div className="flex flex-col items-center mt-6">
                                    <div
                                        className={`w-6 h-6 rounded-full z-10 cursor-pointer transition-all duration-300 ${ active >= step.id ? "bg-green-500 scale-125" : "bg-gray-300"
                                            }`}
                                        onMouseEnter={() => setActive(step.id)}
                                        onMouseLeave={() => setActive(null)}
                                    ></div>
                                    <span className="mt-2 text-sm font-medium text-center">{step.title}</span>
                                </div>

                                {/* 線段：除了最後一個外 */}
                                {index < flowChart.content.length - 1 && (
                                    <div
                                        className={`h-1 w-[35px] sm:w-[80px] md:w-[140px] lg:w-[200px] mx-2 transition-colors duration-300 ${ active > step.id ? "bg-green-500" : "bg-gray-300"
                                            }`}
                                    ></div>
                                )}
                            </div>
                        ))}
                        {/* 尾端透明線段 */}
                        <div className="flex-1 h-1 opacity-0"></div>
                    </div>
                </div>

                {/* 下方卡片 */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full">
                        {flowChart.content?.map((step) => (
                            <div
                                key={step.id}
                                onMouseEnter={() => setActive(step.id)}
                                onMouseLeave={() => setActive(null)}
                                className={`
                                flex flex-col justify-center items-center text-center
                                p-2 sm:p-3 md:p-4
                                border rounded-xl shadow-md transition-all duration-300 cursor-pointer
                                w-full transform
                                hover:scale-[1.08] hover:shadow-xl hover:-translate-y-1
                                ${ active === step.id ? "border-green-500" : "border-gray-200" }
                            `}
                            >
                                <h3 className="text-base sm:text-lg font-bold">{step.title}</h3>
                                <p className="text-xs sm:text-sm mt-2">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
