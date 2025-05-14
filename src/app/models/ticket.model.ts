export enum Frequency {
  Once = 'Once',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

export enum Priority {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
}

export enum Status {
  New = 'New',
  Assigned = 'Assigned',
  Resolved = 'Resolved',
  Closed = 'Closed',
}

export interface Ticket {
  ticketNo?: string;
  date: Date;
  projectName: string;
  moduleName: string;
  subModuleName: string;
  frequency: Frequency;
  priority: Priority;
  issueDescription: string;
  status: Status;
  assignedUser?: string;
  documents: string[];  // URLs to uploaded documents
  createdAt?: Date;
  updatedAt?: Date;
}
