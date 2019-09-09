import { Message } from '../models/message'

export class MessageData {

  public static messages: Message[] = [
    {
      'id': 1,
      'body': 'Leaf Rake',
      'subject': 'GDN-0011',
      'toId': [1, 2]
    },
    {
      'id': 2,
      'subject': 'Garden Cart',
      'body': '15 gallon capacity rolling garden cart',
      'toId': [3, 4]
    },
    {
      'id': 5,
      'subject': 'TBX-0048',
      'body': 'Curved claw steel hammer',
      'toId': [5, 6]
    },
    {
      'id': 8,
      'subject': 'TBX-0022',
      'body': '15-inch steel blade hand saw',
      'toId': [7, 8, 3, 2]
    },
    {
      'id': 10,
      'subject': 'GMG-0042',
      'body': 'Standard two-button video game controller',
      'toId': [9, 10]
    }
  ];
}
