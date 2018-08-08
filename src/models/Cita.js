import mongoose from "mongoose";

const { Schema } = mongoose;

const CitaSchema = new Schema({
  name: String,
  nombre: String,
  puesto: String,
  motivo: String,
  hora: String,
  fecha: String,
  posicion: Number,
  atendido: Boolean,
});

const Cita = mongoose.model('cita', CitaSchema);

export default Cita;
