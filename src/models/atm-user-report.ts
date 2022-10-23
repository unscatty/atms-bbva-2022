/* eslint-disable no-unused-vars */
export enum ATMUserReportKind {
  NO_CASH = 'NO_CASH',
  NOT_WORKING = 'NOT_WORKING',
  OTHER = 'OTHER',
}

export interface ATMUserReport {
  atmID: string
  kind: ATMUserReportKind
  description: string
  upvotes: number
  timestamp: Date
}

export const generateDescriptionTitle = (alertKind: ATMUserReportKind) => {
  switch (alertKind) {
    case ATMUserReportKind.NOT_WORKING:
      return 'No está en funcionamiento'
    case ATMUserReportKind.NO_CASH:
      return 'Sin efectivo'
    default:
      return 'Hay problemas'
  }
}
