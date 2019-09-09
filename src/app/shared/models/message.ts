import { Contact } from './contact';

export interface Message {
  id: number,
  toId: number[],
  to?: Contact[],
  body: string,
  subject: string
}