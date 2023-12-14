export type PrerequisiteResponse = {
  IdMateria: number;
  TipoRequisito: string;
  Resultado: string;
  StandingRequerido: number,
  StandingObtenido: number,
  ColPreviasRequisito: ColPreviasRequisito[];
}

export type ColPreviasRequisito = {
  TipoRequisito: string;
  Cumple: string;
  ObjRequisitoPreviaAlumno: ObjRequisitoPreviaAlumno;
}

export type ObjRequisitoPreviaAlumno = {
  MinMateriasReqPrevia: number;
  ColMateriasRequisito: ColMateriasRequisito[];
}

export type ColMateriasRequisito = {
  TipoCredito: string;
  Resultado: string;
  ObjMateria: ObjMateria;
}

export type ObjMateria = {
  IdMateria: number;
  Nombre: string;
}