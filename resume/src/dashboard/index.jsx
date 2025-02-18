import React, { useEffect, useState } from 'react';
import AddResume from './componenets/AddResume';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from '../../service/GlobalApi';
import ResumeCardItem from './componenets/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    console.log("User:", user);
    if (user) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.log("❌ User email is undefined! API not called.");
      return;
    }
  
    console.log("📢 Fetching resumes for:", user.primaryEmailAddress.emailAddress);
  
    GlobalApi.GetUserResumes(user.primaryEmailAddress.emailAddress)
      .then(resp => {      
        console.log("✅ Full API Response:", resp);
        console.log("📄 resp.data:", resp.data);
        console.log("📄 resp.data.data:", resp.data?.data); 
        setResumeList(resp.data?.data || []);
      })
      .catch(error => console.error("❌ Error fetching resumes:", error));
  };
  

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {resumeList?.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        ) : (
          [1, 2, 3, 4].map((item, index) => (
            <div key={index} className="h-[280px] rounded-lg bg-slate-200 animate-pulse"></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
