import { sheetClient } from '../bootstrap';

const usersSheetClient = sheetClient.users;

export class GoogleSheetService {
  constructor(public sheetClient: typeof usersSheetClient) { }

  async getUserById(id: string) {
    for await (const row of this.sheetClient.readAll()) {
      if (String(row?.Id).trim() === id.trim()) {
        return row;
      }
    }
    return null;
  }
}