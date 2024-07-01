import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProjects } from './services/getAllProjects';

function App() {
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllProjects();
      setProjects(result);
    };
    fetchData();
  }, []);

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    const project = projects.find((p) => p._id === projectId);
    setSelectedProject(project);
    setSelectedCampaign(null);
  };

  const handleCampaignChange = (e) => {
    const campaignId = e.target.value;
    const campaign = selectedProject.advertisingIds.find(
      (c) => c.id === campaignId
    );
    setSelectedCampaign(campaign);
  };

  const goToAnalytics = () => {
    if (selectedProject && selectedCampaign) {
      navigate(`/analytics/${selectedProject._id}/${selectedCampaign.id}`);
    }
  };

  return (
    <div className="bg-[#2c2c2c] w-full h-[100vh] flex flex-col align items-center">
      <h1 className="flex text-2xl text-gray-100 font-semibold uppercase pt-[120px]">
        Carousels Advertising
      </h1>
      <div className="flex flex-col gap-2 bg-gray-700 w-[260px]  px-8 py-4 rounded-md shadow-lg mt-5">
        <Link to={'/cnn'} className="text-gray-300 hover:text-white">
          Cnn
        </Link>
        <Link to={'/pais'} className="text-gray-300 hover:text-white">
          El país
        </Link>
        <Link to={'/reuters'} className="text-gray-300 hover:text-white">
          Reuters
        </Link>
      </div>

      <div className="flex flex-col gap-2 bg-gray-700 w-[260px]  px-8 py-4 rounded-md shadow-lg mt-5">
        <p className="text-gray-300">
          To edit the content of the carousels go to:{' '}
        </p>
        <a
          href="https://hygraph.com/"
          className="text-white hover:text-red-400"
        >
          Hygraph
        </a>
      </div>

      <div className="flex flex-col gap-2 bg-gray-700 w-[260px]  px-8 py-4 rounded-md shadow-lg mt-5">
        <button
          onClick={goToAnalytics}
          className={`text-gray-300 hover:text-white ${
            selectedProject && selectedCampaign
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          }`}
          disabled={!selectedProject || !selectedCampaign}
        >
          Zafir Analytics
        </button>
        <label className="text-gray-300">Select Project:</label>
        <select onChange={handleProjectChange}>
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
        <div className="flex flex-col gap-2 bg-gray-700 w-[260px]  px-8 py-4 rounded-md shadow-lg mt-5">
          <label className="text-gray-300">Select Campaign:</label>
          <select onChange={handleCampaignChange}>
            <option value="">Select a campaign</option>
            {selectedProject.advertisingIds.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
