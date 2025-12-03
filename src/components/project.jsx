import { ProjectCard } from "./cards/project-card.jsx";
import { Option, Select, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getProjectData, getIndustryData, getCategoryData } from "../api/s3get.js";
import ReactPaginate from "react-paginate";
import Lightbox from "./lightbox.jsx";
import "../assets/css/project.css";


function project() {

    const [industry, setIndustry] = useState([]);
    const [category, setCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 搜尋關鍵字
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // 延遲後的值
    const [lightboxItem, setLightboxItem] = useState(null);
    const [project, setProject] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // react-paginate 預設從 0 開始
    const itemsPerPage = 6; // 每頁顯示幾個

    useEffect(() => {
        Promise.all([
            getProjectData(),
            getIndustryData(),
            getCategoryData(),
        ])
            .then(([projectData, industryData, categoryData]) => {
                const sorted = sortProjects(projectData);
                setProject(sorted);
                setIndustry(industryData);
                setCategory(categoryData);
            })
            .catch(err => console.error(err));
    }, []);

    // ✅ Debounce：300ms 後才更新 searchTerm
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(0); // 搜尋時回到第一頁
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const sortProjects = (list) => {
        if (!Array.isArray(list)) return [];
        return [...list].sort((a, b) =>
            (Number(b.sort) || 0) - (Number(a.sort) || 0)
        );
    };

    // 先篩選
    const filteredTeam = project.filter((member) => {
        const categoryMatch =
            selectedCategory === "" || member.category === selectedCategory;
        const industryMatch =
            selectedIndustry === "" || member.industry === selectedIndustry;

        const searchMatch =
            searchTerm.trim() === "" ||
            member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            (member.description && member.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
            (member.hashtag && member.hashtag.some((hashtag) => hashtag.toLowerCase().includes(debouncedSearchTerm.toLowerCase())));

        return categoryMatch && industryMatch && searchMatch;
    });

    // 再分頁
    const startIndex = currentPage * itemsPerPage;
    const currentItems = filteredTeam.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredTeam.length / itemsPerPage);

    // 當篩選條件改變時，回到第一頁
    const handleCategoryChange = (val) => {
        setSelectedCategory(val);
        setCurrentPage(0);
    };

    const handleIndustryChange = (val) => {
        setSelectedIndustry(val);
        setCurrentPage(0);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0); // 🔄 搜尋時回到第一頁
    };

    return (
        <section className="px-4 pt-12 pb-16">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 md:gap-x-10 lg:gap-x-10">
                    <div className="mb-6 md:mb-0">
                        <Select label="選擇產業" className="text-lg py-3" onChange={handleIndustryChange}>
                            {industry.map((opt, index) => (
                                <Option key={index} value={opt.value} className="text-lg py-2">
                                    {opt.label}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="mb-6 md:mb-0">
                        <Select label="選擇類別" className="text-lg py-3" onChange={handleCategoryChange}>
                            {category.map((opt, index) => (
                                <Option key={index} value={opt.value} className="text-lg py-2">
                                    {opt.label}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="mb-6 md:mb-0">
                        <Input
                            label="搜尋專案"
                            icon={<i className="fas fa-search" />}
                            className="text-lg py-3"
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>


                {/* 顯示卡片 */}
                <div className="mt-8 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-3">
                    {currentItems.map((item, index) => (
                        <div key={index} className="flex justify-center">
                            <div
                                className="
                                max-w-sm w-full 
                                transition-transform duration-300 transform
                                hover:scale-105 hover:shadow-2xl
                                "
                            >
                                <div
                                    className="max-w-sm w-full cursor-pointer"
                                    onClick={() => {
                                        setLightboxItem(item);
                                    }}
                                >
                                    <ProjectCard
                                        img={Array.isArray(item.img) ? item.img[0] : item.img}
                                        name={item.name}
                                        hashtag={item.hashtag}
                                        description={item.description}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 燈箱：傳 project & 關閉方法 */}
                <Lightbox project={lightboxItem} onClose={() => setLightboxItem(null)} />

                {/* 分頁按鈕 */}
                {totalPages > 1 && (
                    <ReactPaginate
                        pageCount={totalPages}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName="flex justify-center gap-2 mt-12"
                        pageClassName="bg-gray-200 rounded cursor-pointer"
                        activeClassName="bg-blue-500 text-white"
                        previousLabel="<"
                        nextLabel=">"
                        previousClassName="bg-gray-200 rounded cursor-pointer"
                        nextClassName="bg-gray-200 rounded cursor-pointer"
                        breakLabel="..."
                    />
                )}
            </div>
        </section>
    );
}

export default project;