export type Plan = {
  name: string;
  semesters: Semester[];
}

export type Semester = {
  name: string;
  subjects: Subject[];
}

export type Subject = {
  id: number;
  hasOptions: boolean;
  title: string;
  approval: Approval;
  processed: boolean;
  prerequisites?: Prerequisites;
  options?: Subject[];
}

export type Prerequisites = {
  enroll: Prerequisite;
  approval: Prerequisite;
}

export type Prerequisite = {
  meets: boolean,
  standing: number,
  standingObtained?: number,
  requirement: Requirement[]
}
export type Requirement = {
  meets: boolean;
  min: number;
  subjects: Pre[];
}

export type Pre = {
  meets: boolean;
  title: string;
  type?: string;
}

export type Approval = {
  partial: boolean;
  total: boolean;
}