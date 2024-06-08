import React, { useEffect, useState, useContext, useCallback } from "react";
import Navbar from "./Navbar";
import { ProjectInfoCard } from "./ProjectInfoCard";
import { UserContext } from "../App";
import { FiPlusCircle } from "react-icons/fi";
import { Modal } from "./Modal";
import { TailSpin } from 'react-loading-icons';
import { API_URL } from "../config/config";

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [isShowModal, setIsShowModal] = useState(false);

  const getProjects = useCallback(async () => {
    try {
      setDataLoading(true);
      const url = `${API_URL}/projects/${user?._id}`;
      const res = await fetch(url);
      const resp = await res.json();
      setDataLoading(false);
      setProjects(resp.projects);
    } catch (e) {
      console.error(e);
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getProjects();
    }
  }, [user, getProjects]);

  const handleUpdateUser = (newUserData) => {
    setUser(newUserData);
    getProjects();
  };

  const simulateUserUpdate = () => {
    const newUserData = { ...user, name: "Updated User" }; 
    handleUpdateUser(newUserData);
  };

  const createNewProject = async () => {
    try {
      setDataLoading(true);
      const url = `${API_URL}/projects/create`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to create project');
      }
      setDataLoading(false);
      getProjects(); // Refresh projects after creating a new one
    } catch (error) {
      console.error(error);
      setDataLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-20">
      <Navbar />
      {dataLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <TailSpin strokeWidth={5} speed={0.95} className="h-[80px] w-[80px]" stroke="#7e22ce" />
        </div>
      )}

      <header className="flex justify-between items-center mx-40">
        <h1 className="text-6xl font-bold text-[#7e22ce]">Projects</h1>
        <button
          onClick={() => {
            setIsShowModal(true);
          }}
          className="bg-[#211935] flex justify-between items-center text-white gap-3 text-xl rounded-md py-3 px-6 hover:bg-[#342754]"
        >
          <FiPlusCircle className="text-3xl" />
          <p>Create New Project</p>
        </button>
      </header>

      <div className="mx-40 my-4">
        <button
          onClick={simulateUserUpdate}
          className="bg-[#7e22ce] text-white py-2 px-4 rounded hover:bg-[#5a1699]"
        >
          Update User Info
        </button>
      </div>

      <div className="grid grid-cols-3 gap-x-48 gap-y-20 mx-40">
        {projects?.map((item, index) => (
          <ProjectInfoCard key={index} data={item} index={index} />
        ))}
      </div>

      <Modal
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        setDataLoading={setDataLoading}
        pageName="landing"
        createProject={createNewProject}
      />

      {isShowModal && <div className="absolute inset-0 bg-black bg-opacity-70 z-40"></div>}
    </div>
  );
};