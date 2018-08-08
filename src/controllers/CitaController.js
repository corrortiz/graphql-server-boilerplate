import _ from 'lodash';
import Cita from '../models/Cita';

export const create = citaProps => {
  const cita = new Cita(citaProps);
  return cita.save();
};

// export const delete = (_id) => Cita.findByIdAndRemove(_id)

export const edit = async (_id, citaProps) => {
  const citaAbajo = await Cita.find({
    fecha: citaProps.fecha,
    atendido: false
  })
    .where('posicion')
    .gt(citaProps.posicion);
  if (!_.isEmpty(citaAbajo)) {
    citaAbajo.forEach(async cita => {
      const citaToUpdate = new Cita(cita);
      await citaToUpdate.update({ posicion: cita.posicion - 1 });
    });
  }
  return Cita.findByIdAndUpdate({ _id }, citaProps);
};

export const editPosicion = async (_id, type, citaProps) => {
  const citaAntigua = await Cita.findOne({
    fecha: citaProps.fecha,
    posicion: citaProps.posicion
  });
  if (citaAntigua) {
    await citaAntigua.update({ posicion: citaProps.posicion + type });
  }
  return Cita.findByIdAndUpdate({ _id }, citaProps);
};

export const find = _id => Cita.findById(_id);

export const findAll = () => Cita.find({});

export const findByDate = fecha => Cita.find({ fecha }).sort('posicion');

export const howManyByDate = fecha =>
  Cita.find({ fecha, atendido: false }).count();

export const findByDateAndEspera = fecha =>
  Cita.find({ fecha, atendido: false }).sort('posicion');

export const findByDateAndVisto = fecha =>
  Cita.find({ fecha, atendido: true }).sort('posicion');
