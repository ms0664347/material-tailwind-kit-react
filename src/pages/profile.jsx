import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ProfileCard } from "../widgets/cards/profile-card.jsx";
import { ProjectCard } from "../widgets/cards/project-card.jsx";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { getProjectData, getProfileData, getBioData, getConcept } from "./s3get";

export function Profile() {

  const [profile, setProfile] = useState(null);

  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [experience, setExperience] = useState(null);
  const [concept, setConcept] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const s3BaseUrl = "https://pigxuan-db.s3.ap-northeast-1.amazonaws.com";
  const [images, setImages] = useState(null);

  useEffect(() => {
    Promise.all([
      getProfileData(),
      getBioData(),
      getConcept(),
      getProjectData(),
    ])
      .then(([profileData, experienceData, conceptData, projectData]) => {
        setProfile(profileData);
        setExperience(experienceData);
        setConcept(conceptData);
        setProjects(projectData);
        setImages(profileData.img ? { file: null, preview: s3BaseUrl + profileData.img } : null);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // 每 3 秒換一個

    return () => clearInterval(interval); // 清除 interval 避免 memory leak
  }, [projects]);

  if (projects.length === 0) return null; // 還沒載入就不渲染

  const currentProject = projects[currentIndex];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>載入失敗: {error.message}</div>;

  return (
    <section className="-mt-32 bg-white px-4 pb-20 pt-4">
      <div className="container mx-auto mt-28 sm:mt-24 md:mt-12 lg:mt-28">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-6 lg:grid-cols-8">
          {/* ProfileCard */}
          <div className="xl:col-span-2 lg:col-span-2 md:col-span-1 col-span-1 flex justify-center md:justify-start ml-[110%] md:ml-[25%] z-10">
            {profile && (
              <ProfileCard
                img={profile.img}
                name={profile.name}
                title={profile.title}
                socials={
                  <div className="flex items-center gap-2">
                    {profile.socials.map(({ color, name, url }) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                        <IconButton color={color} variant="text">
                          <i className={`fa-brands text-xl fa-${ name }`} />
                        </IconButton>
                      </a>
                    ))}
                  </div>
                }
              />
            )}
          </div>

          {/* 右邊：文字區塊 */}
          {experience && (
            <div
              className="
                col-span-2 
                md:col-span-4 md:ml-[35%] md:mt-[15%]
                lg:col-span-5 lg:ml-[10%] lg:mt-8
                xl:col-span-5 xl:mt-2
                flex flex-col justify-center min-w-[250px] scale-110 ml-[50px]
              "
            >
              <h2 className="text-3xl font-bold text-blue-gray-800">{experience.title}</h2>
              <Typography className="mt-2 text-base md:text-lg lg:text-xl text-blue-gray-700 leading-relaxed line-clamp-2 md:line-clamp-3">
                {experience.description}
              </Typography>
            </div>
          )}
        </div>

        <div className="mt-24 flex flex-wrap items-center">
          <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
              <FingerPrintIcon className="h-8 w-8 text-white " />
            </div>
            <Typography
              variant="h3"
              className="mb-3 font-bold"
              color="blue-gray"
            >
              {concept?.title}
            </Typography>
            {concept?.description1 && (
              <Typography className="mt-3 text-lg text-blue-gray-700 leading-relaxed">
                {concept.description1}
              </Typography>
            )}
            <br />
            {concept?.description2 && (
              <Typography className="mt-3 text-lg text-blue-gray-700 leading-relaxed">
                {concept.description2}
              </Typography>
            )}

            {/* <Button variant="filled">read more</Button> */}
          </div>
          <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
            <ProjectCard
              img={currentProject.img[0]}
              name={currentProject.name}
              title={currentProject.title}
              description={currentProject.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
