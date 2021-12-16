import {initializeApp} from 'firebase/app';

import {
  getDatabase,
  ref,
  onValue,
  serverTimestamp,
  push,
  onChildAdded,
} from 'firebase/database';

interface ConfigProps {
  apiKey: string;
  databaseURL: string;
  hash: string;
}

class Fire {
  database: any;
  hash: any;
  message: any;
  databaseMsgRef: any;
  constructor() {
    this.database;
    this.databaseMsgRef, this.hash;
    this.message;
  }

  init = (config: ConfigProps) => {
    console.log('* * * Criando Atendimento * * *', config);

    const {apiKey, databaseURL, hash} = config;

    const app = initializeApp({apiKey, databaseURL});
    this.database = getDatabase(app);
    this.hash = hash;

    const databaseDataRef = ref(
      this.database,
      `/atendimentos/${this.hash}/dados/`,
    );

    onValue(
      databaseDataRef,
      (snapshot: {exists: () => any; val: () => any}) => {
        if (snapshot.exists()) {
          console.log('snapshot nos dados: ', snapshot.val());
        }
      },
    );

    this.databaseMsgRef = ref(
      this.database,
      `/atendimentos/${this.hash}/mensagens/`,
    );

    onValue(this.databaseMsgRef, snapshot => {
      if (snapshot.exists()) {
        console.log('snapshot na mensagem: ', snapshot.val());
      } else {
        console.log('No data available');
      }
    });
  };

  send = (messages: any[]) => {
    messages.map((item: any) => {
      // eslint-disable-next-line no-shadow
      const messages = {
        OriTipo: 'C',
        Mensagem: item.text,
        Mktime: serverTimestamp(),
        Mktime2: serverTimestamp(),
      };
      push(this.databaseMsgRef, messages);
    });
  };

  parse = (message: any) => {
    const {user, text, timestamp} = message;
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback: any) => {
    onChildAdded(this.database, snapshot => callback(this.parse(snapshot)));
  };
}

export default new Fire();
