import logo from './logo.svg';
import './App.css';
import React from 'react';
import AppointmentsList from './AppointmentsList';
import MedicalRecords from './MedicalRecords';
function App() {
  return (
    <div className="App">
      <h1>My Appointments and Medical Records</h1>
      <AppointmentsList />
      <MedicalRecords />
    </div>
  );
}

export default App;