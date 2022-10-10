import type { ATM } from '~/models/atm/atm'

export interface IATMService {
  // eslint-disable-next-line no-unused-vars
  getATMs: (...args: any[]) => ATM[] | Promise<ATM[]>
}


export class ATMService implements IATMService {
  getATMs() {
    // TODO: get data from BigQuery
    return []
  }
}