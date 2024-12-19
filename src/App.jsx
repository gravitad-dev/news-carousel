import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects } from './services/getAllProjects';

function App() {
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [mode, setMode] = useState('normal');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllProjects();
      setProjects(result);

      const savedMode = localStorage.getItem('mode');
      if (savedMode) {
        setMode(savedMode);
      }

      const savedProjectId = localStorage.getItem('selectedProject');
      const savedCampaignId = localStorage.getItem('selectedCampaign');

      if (savedProjectId) {
        const project = result.find((p) => p._id === savedProjectId);
        setSelectedProject(project);

        if (savedCampaignId) {
          const campaign = project.advertisingIds.find(
            (c) => c.id === savedCampaignId
          );
          setSelectedCampaign(campaign);
        }
      }
    };
    fetchData();
  }, []);

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    const project = projects.find((p) => p._id === projectId);
    setSelectedProject(project);
    setSelectedCampaign(null);
    localStorage.setItem('selectedProject', projectId);
    localStorage.removeItem('selectedCampaign');
  };

  const handleCampaignChange = (e) => {
    const campaignId = e.target.value;
    const campaign = selectedProject.advertisingIds.find(
      (c) => c.id === campaignId
    );
    setSelectedCampaign(campaign);
    localStorage.setItem('selectedCampaign', campaignId);
  };

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  const goToAnalytics = () => {
    switch (selectedCampaign.id) {
      case '66f1f15274aaefcd7a4372bc':
        if (mode === 'testing') {
          navigate(`pais/testing`);
        } else {
          navigate(`pais`);
        }
        break;
      case '66f1f27a74aaefcd7a437760':
        if (mode === 'testing') {
          navigate(`cnn/testing`);
        } else {
          navigate(`cnn`);
        }
        break;
      case '66f1f83974aaefcd7a438885':
        if (mode === 'testing') {
          navigate(`reuters/testing`);
          setTimeout(() => {
            navigate(`/`);
          }, 300);
        } else {
          navigate(`reuters`);
          setTimeout(() => {
            navigate(`/`);
          }, 300);
        }
        break;

      default:
        break;
    }
  };

  //2c2c2c
  return (
    <div className="bg-[#264653] w-full h-[100vh] flex flex-col gap-8 align items-center">
      <h1 className="flex text-2xl text-gray-100 font-semibold uppercase pt-[120px]">
        Carousels Advertising
      </h1>
      <section className="w-full flex flex-col justify-center items-center md:flex-row  gap-4  px-4">
        <div className="flex flex-col gap-2 bg-[#2a9d8f] w-[260px] px-8 py-4 rounded-md shadow-lg mt-5">
          <label className="text-white font-semibold text-lg">
            Select Mode
          </label>
          <select
            value={mode}
            onChange={handleModeChange}
            className="h-10 rounded-sm p-2"
          >
            <option value="normal">Normal</option>
            <option value="testing">Testing (Clicks)</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 bg-[#e9c46a] w-[260px] px-8 py-4 rounded-md shadow-lg mt-5">
          <label className="text-white font-semibold text-lg">
            Select Project
          </label>
          <select
            className="h-10 rounded-sm p-2"
            onChange={handleProjectChange}
            value={selectedProject?._id || ''}
          >
            <option value="">Select a project</option>
            {projects &&
              projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
          </select>
        </div>

        {selectedProject && (
          <div className="flex flex-col gap-2 bg-[#99d98c] w-[260px] px-8 py-4 rounded-md shadow-lg mt-5">
            <label className="text-white font-semibold text-lg">
              Select Campaign
            </label>
            <select
              className="h-10 rounded-sm p-2"
              onChange={handleCampaignChange}
              value={selectedCampaign?.id || ''}
            >
              <option value="">Select a campaign</option>
              {selectedProject.advertisingIds.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>
      <section>
        <button
          onClick={goToAnalytics}
          className={`text-gray-300 font-semibold hover:text-white ${
            selectedProject && selectedCampaign
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          }`}
          disabled={!selectedProject || !selectedCampaign}
        >
          <span className="transition-all hover:bg-[#1a3038] text-[#fefcfb] border-2 border-teal-400 font-semibold flex w-full items-center justify-center gap-2 p-5 rounded-[16px]">
            GO TO PAGE
            <svg
              width="32"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="#fefcfb"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </button>
      </section>
    </div>
  );
}

export default App;
