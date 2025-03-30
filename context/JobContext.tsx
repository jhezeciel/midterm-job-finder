import React, { createContext, useState, ReactNode } from 'react';
import { Job } from '../types';

interface JobContextType {
  savedJobs: Job[];
  appliedJobs: string[];
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
  markJobAsApplied: (id: string) => void;
}

export const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const saveJob = (job: Job) => {
    setSavedJobs((prevJobs) => [...prevJobs, job]);
  };

  const removeJob = (id: string) => {
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const markJobAsApplied = (id: string) => {
    setAppliedJobs((prevJobs) => [...prevJobs, id]);
  };

  return (
    <JobContext.Provider value={{ savedJobs, appliedJobs, saveJob, removeJob, markJobAsApplied }}>
      {children}
    </JobContext.Provider>
  );
};
