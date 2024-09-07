import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTag, setSearchTag] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://nixortech-backend.onrender.com/form/registrations')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  }, []);

  const filteredData = data.filter((item) => {
    if (searchTag === 'All') {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fatherOrHusbandName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.selectedCourse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.selectedCourse.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchTag === 'name') {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTag === 'fatherOrHusbandName') {
      return item.fatherOrHusbandName.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTag === 'email') {
      return item.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTag === 'selectedCourse') {
      return item.selectedCourse.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTag === 'courseType') {
      return item.courseType.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTag === 'latestQualification') {
      return item.latestQualification.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTag === 'contactNumber') {
      return item.contactNumber.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTag === 'dateOfBirth') {
      return item.dateOfBirth.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });
  return (
    <div className=' mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Registrations</h1>
      {loading && (
        <div className='flex justify-center items-center h-screen'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0077bc]'></div>
        </div>
      )}
      {!loading && (<>
        <div className='relative mb-4 flex gap-5'>
        <div>
          <select
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            className=' text-sm rounded-lg border block w-80 pl-2.5 p-2.5 '
          >
            <option value='All'>All</option>
            <option value='name'>Name</option>
            <option value='fatherOrHusbandName'>Father/Husband Name</option>
            <option value='email'>Email</option>
            <option value='selectedCourse'>Course</option>
            <option value='courseType'>Course Type</option>
            <option value='latestQualification'>Latest Qualification</option>
            <option value='dateOfBirth'>Date Of birth</option>
            <option value='contactNumber'>Contact Number</option>
          </select>
        </div>
        <input
          type='text'
          placeholder='Filter by Name, Email, or Course'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=' text-sm rounded-lg border block w-80 pl-2.5 p-2.5 '
        />
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left '>
          <thead className='text-xs  uppercase bg-gray-50 '>
            <tr>
              <th className='px-6 py-3'>S.No</th>
              <th className='px-6 py-3'>Name</th>
              <th className='px-6 py-3'>Father/Husband Name</th>
              <th className='px-6 py-3'>Date of Birth</th>
              <th className='px-6 py-3'>Gender</th>
              <th className='px-6 py-3'>Email</th>
              <th className='px-6 py-3'>Contact Number</th>
              <th className='px-6 py-3'>Postal Address</th>
              <th className='px-6 py-3'>Selected Course</th>
              <th className='px-6 py-3'>Course Type</th>
              <th className='px-6 py-3'>Latest Qualification</th>
              <th className='px-6 py-3'>Shift</th>
              <th className='px-6 py-3'>Suggestions/Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item , idx) => (
              <tr key={item._id} className='bg-white border-b '>
                <td className='px-6 py-4'>{idx+1}</td>
                <td className='px-6 py-4 font-medium whitespace-nowrap'>
                  {item.name}
                </td>
                <td className='px-6 py-4'>{item.fatherOrHusbandName}</td>
                <td className='px-6 py-4'>{item.dateOfBirth}</td>
                <td className='px-6 py-4'>{item.gender}</td>
                <td className='px-6 py-4'>{item.email}</td>
                <td className='px-6 py-4'>{item.contactNumber}</td>
                <td className='px-6 py-4'>{item.postalAddress}</td>
                <td className='px-6 py-4'>{item.selectedCourse}</td>
                <td className='px-6 py-4'>{item.courseType}</td>
                <td className='px-6 py-4'>{item.latestQualification}</td>
                <td className='px-6 py-4'>{item.shift}</td>
                <td className='px-6 py-4'>{item.suggestionsFeedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>)
      
      }
     
    </div>
  );
}

export default App;
