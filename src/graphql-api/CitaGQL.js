import gql from 'graphql-tag';
import {
  create,
  edit,
  findAll,
  findByDate,
  howManyByDate,
  findByDateAndEspera,
  findByDateAndVisto,
  editPosicion
} from '../controllers/CitaController';

export const citaTypeDefs = gql`
  type Query {
    allCitas: [Cita]
    citasByDate(fecha: String!): [Cita]
    howManyByDate(fecha: String!): Int
    findByDateAndFalse(fecha: String!): [Cita]
    findByDateAndTrue(fecha: String!): [Cita]
  }

  type Mutation {
    addCita(data: CitaInput): Cita
    modifyCita(data: CitaInput, id: ID!): Cita
    editPosicion(id: ID!, type: Int, data: CitaInput): Cita
  }

  type Cita {
    id: ID! @unique
    nombre: String!
    puesto: String!
    motivo: String!
    hora: String!
    fecha: String!
    posicion: Int!
    atendido: Boolean!
  }

  input CitaInput {
    _id: ID
    nombre: String
    puesto: String
    motivo: String
    hora: String
    fecha: String
    posicion: Int
    atendido: Boolean
  }

`;

export const citaResolvers = {
  Query: {
    allCitas: () => {
      return findAll();
    },
    citasByDate: (_, { fecha }) => {
      return findByDate(fecha);
    },
    howManyByDate: (_, { fecha }) => {
      return howManyByDate(fecha);
    },
    findByDateAndFalse: (_, { fecha }) => {
      return findByDateAndEspera(fecha);
    },
    findByDateAndTrue: (_, { fecha }) => {
      return findByDateAndVisto(fecha);
    }
  },
  Mutation: {
    addCita: (_, { data }) => {
      return create(data);
    },
    modifyCita: (_, { data, id }) => {
      return edit(id, data);
    },
    editPosicion: (_, { id, type, data }) => {
      return editPosicion(id, type, data);
    }
  }
};
