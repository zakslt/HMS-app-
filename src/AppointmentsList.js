import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/appointments')
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  return (
    <div>
      <h2>Appointments List</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <strong>Date:</strong> {appointment.date}, <strong>Time:</strong> {appointment.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
