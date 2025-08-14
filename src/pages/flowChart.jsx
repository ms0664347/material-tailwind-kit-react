import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { getFlowChart } from "./s3get";

export default function flowChart() {
    const [active, setActive] = useState(-1);
    const [flow, setFlow] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getFlowChart()
            .then((flowData) => {
                setFlow(flowData);
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
                    {flow.title}
                </h3>
            </div>

            <div className="w-full px-10">
                {/* 上方線條 + 節點（等分版） */}
                <div className="w-full max-w-5xl mx-auto px-6 mb-10">
                    <div className="flex items-center w-full">
                        {flow.content?.map((step, index) => (
                            <React.Fragment key={step.id}>
                                {/* 節點 */}
                                <div className="flex flex-col items-center mt-6">
                                    <div
                                        className={`w-6 h-6 rounded-full z-10 cursor-pointer transition-all duration-300
                                        ${ active >= index ? "bg-green-500 scale-125" : "bg-gray-300" }`}
                                        onMouseEnter={() => setActive(index)}
                                        onMouseLeave={() => setActive(-1)}
                                    />
                                    <span className="mt-2 text-sm font-medium text-center block min-h-[1rem]">
                                        {(step.title ?? '').trim() || '\u00A0'}
                                    </span>

                                </div>

                                {/* 兩點之間的線：用 flex-1 等分寬度 */}
                                {index < flow.content.length - 1 && (
                                    <div
                                        className={`h-1 flex-1 mx-2 transition-colors duration-300
                                        ${ active > index ? "bg-green-500" : "bg-gray-300" }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>


                {/* 下方卡片 */}
                <div className="flex justify-center">
                    <div className="flex gap-8 max-w-5xl w-full">
                        {flow.content?.map((step, index) => (
                            <div
                                key={step?.id ?? index}
                                onMouseEnter={() => setActive(index)}
                                onMouseLeave={() => setActive(-1)}
                                className={`flex-1 flex flex-col justify-center items-center text-center
                                p-2 sm:p-3 md:p-4 border rounded-xl shadow-md transition-all duration-300
                                cursor-pointer transform h-full
                                hover:scale-[1.08] hover:shadow-xl hover:-translate-y-1
                                ${ active === index ? "border-green-500" : "border-gray-200" }`}
                            >
                                <h3 className="text-base sm:text-lg font-bold block min-h-[1.5rem]">
                                    {(step?.title ?? '').trim() || '\u00A0'}
                                </h3>
                                <p className="text-xs sm:text-sm mt-2 block leading-5 min-h-[2.5rem]">
                                    {(step?.desc ?? '').trim() || '\u00A0'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </>
    );
}
