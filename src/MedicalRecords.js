import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    axios.get('/medical-records')
      .then((response) => {
        setMedicalRecords(response.data);
      })
      .catch((error) => {
        console.error('Error fetching medical records:', error);
      });
  }, []);

  return (
    <div>
      <h2>Medical Records List</h2>
      <ul>
        {medicalRecords.map((record) => (
          <li key={record._id}>
            <strong>Patient:</strong> {record.patientName}, <strong>Doctor:</strong> {record.doctorName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecords;
