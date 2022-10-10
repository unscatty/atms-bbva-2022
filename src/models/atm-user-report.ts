export enum ATMUserReportKind {
  NO_CASH = 'NO_CASH',
  NOT_WORKING = 'NOT_WORKING',
  OTHER = 'OTHER'
}

export interface ATMUserReport {
  atmID: number
  kind: ATMUserReportKind
  description: string
  upvotes: number
  timestamp: Date
}