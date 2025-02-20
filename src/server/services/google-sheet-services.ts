import { sheetClient } from '../bootstrap';

const usersSheetClient = sheetClient.users;

export class GoogleSheetService {
  constructor(public sheetClient: typeof usersSheetClient) { }

  async getUsers() {
    for await (const row of this.sheetClient.readAll()) {
      console.log(`Row: ${JSON.stringify(row)}`);
    }
  }
}