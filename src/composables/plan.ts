import type { Plan, Subject } from "@/types/Plan";
import { ref } from "vue";
import { Plan2019 } from "@/plan2019";
import axios from "axios";
import { ColMateriasRequisito, ColPreviasRequisito, PrerequisiteResponse } from "@/types/Responses";

const plan = ref<Plan>(Plan2019);
const token = ref<string>('')

export default function usePlan() {
  async function updateSubject(subject: Subject) {
    return new Promise(async (resolve, reject) => {
      try{
        const {data} = await axios.get<PrerequisiteResponse[]>(`https://gestionapi.ort.edu.uy/ORTSecure/PerfilAcademico/MateriaDelTitulo/PreviasDeMateria?idMateria=${subject.id}&idTitulo=2485`, {
        headers: {
          'x-token': token.value,
          },
        })
        if(subject.prerequisites) {
          subject.prerequisites.enroll = {
            meets: data[0].Resultado === 'T',
            standing: data[0].StandingRequerido,
            standingObtained : data[0].StandingObtenido,
            requirement: data[0].ColPreviasRequisito.map((colPreviaRequisito: ColPreviasRequisito) => {
              return {
                meets: colPreviaRequisito.Cumple === 'T',
                min: colPreviaRequisito.ObjRequisitoPreviaAlumno.MinMateriasReqPrevia,
                subjects: colPreviaRequisito.ObjRequisitoPreviaAlumno.ColMateriasRequisito.map((colMat: ColMateriasRequisito) => {
                  return {
                    meets: colMat.Resultado === 'APR',
                    title: colMat.ObjMateria.Nombre,
                    type: colMat.TipoCredito
                  }
                })
              }
            })
          }
        }
  
        if(subject.prerequisites){
          subject.prerequisites.approval = {
            meets: data[1].Resultado === 'T',
            standing: data[0].StandingRequerido,
            requirement: data[0].ColPreviasRequisito.map((colPreviaRequisito: ColPreviasRequisito) => {
              return {
                meets: colPreviaRequisito.Cumple === 'T',
                min: colPreviaRequisito.ObjRequisitoPreviaAlumno.MinMateriasReqPrevia,
                subjects: colPreviaRequisito.ObjRequisitoPreviaAlumno.ColMateriasRequisito.map((colMat: ColMateriasRequisito) => {
                  return {
                    meets: colMat.Resultado === 'APR',
                    title: colMat.ObjMateria.Nombre
                  }
                })
              }
            })
          }
        }
        subject.processed = true
      }catch(e) {
        reject(e)
      }
      resolve(null)
    })
  }

  async function processSubjects() {
    return new Promise(async (resolve, reject) => {
      try{
        const {data: plan_subjects_aux} = await axios.get('https://gestionapi.ort.edu.uy/ORTSecure/PerfilAcademico/MateriaDelTitulo?idTitulo=2485', {
        headers: {
          'x-token': token.value,
          },
        })
        for(const semester of plan.value.semesters) {
          for(const subject of semester.subjects) {
            if(subject.id < 0)
              continue
            if(!subject.hasOptions){
              const subject_aux = plan_subjects_aux.find((subject_aux: any) => subject_aux.ObjMateria.IdMateria === subject.id)
              if(subject_aux){
                subject.approval.partial = subject_aux.CreditoParcial
                subject.approval.total = subject_aux.CreditoTotal
              }
              if (!subject.approval.total && !subject.approval.partial)
                await updateSubject(subject)
  
              subject.processed = true
            }
            else {
              for(const option of subject.options!) {
                if(option.id < 0)
                  continue
                const subject_aux = plan_subjects_aux.find((subject_aux: any) => subject_aux.ObjMateria.IdMateria === option.id)
                if(subject_aux){
                  option.approval.partial = subject_aux.CreditoParcial
                  option.approval.total = subject_aux.CreditoTotal
                  subject.approval.partial = subject.approval.partial || subject_aux.CreditoParcial
                  subject.approval.total = subject.approval.total || subject_aux.CreditoTotal
                }
                if (!option.approval.total && !option.approval.partial)
                  await updateSubject(option)
                option.processed = true
              }
            }
          }
        }
      }catch(e) {
        reject(e)
      }
      resolve(null)
    })
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  function setPlan(newPlan: Plan) {
    plan.value = newPlan
  }

  return {
    plan,
    processSubjects,
    updateSubject,
    setToken,
    setPlan
  };
}
