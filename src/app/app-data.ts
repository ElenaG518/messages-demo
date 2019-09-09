import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MessageData } from './shared/data/message-data'
import { ContactData } from './shared/data/contact-data'

export class AppData implements InMemoryDbService {

  createDb() {
    const messages = MessageData.messages;
    const contacts = ContactData.contacts;

    return {
      messages,
      contacts
    };
  }
}
