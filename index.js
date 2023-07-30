const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000; // Choose any available port you prefer

const dbURI = 'mongodb://localhost:27017/MyProject'; 

// Middleware to parse JSON data in the request body
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  const appointmentSchema = new mongoose.Schema({
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  });

  const Appointment = mongoose.model('Appointment', appointmentSchema);

  // POST route to create a new appointment
app.post('/appointments', (req, res) => {
  const { doctorId, patientId, date, time } = req.body;
  const newAppointment = new Appointment({ doctorId, patientId, date, time });

  newAppointment
    .save()
    .then((savedAppointment) => {
      res.json(savedAppointment);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create an appointment' });
    });
});

// GET route to fetch all appointments
app.get('/appointments', (req, res) => {
  Appointment.find({})
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    });
});

// GET route to fetch a specific appointment by its ID
app.get('/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;
  Appointment.findById(appointmentId)
    .then((appointment) => {
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json(appointment);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch the appointment' });
    });
});

// PUT route to update an existing appointment by its ID
app.put('/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;
  const { doctorId, patientId, date, time } = req.body;

  Appointment.findByIdAndUpdate(
    appointmentId,
    { doctorId, patientId, date, time },
    { new: true }
  )
    .then((updatedAppointment) => {
      if (!updatedAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json(updatedAppointment);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update the appointment' });
    });
});

// DELETE route to delete an appointment by its ID
app.delete('/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;
  Appointment.findByIdAndDelete(appointmentId)
    .then((deletedAppointment) => {
      if (!deletedAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json({ message: 'Appointment deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to delete the appointment' });
    });
});

// ... (Other routes for updating and deleting appointments)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
