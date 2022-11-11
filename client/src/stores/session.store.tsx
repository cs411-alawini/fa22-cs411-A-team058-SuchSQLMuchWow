import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
   token: string;
   userId: string;
   companyId: string;
}

export function createInitialState(): SessionState {
  return {
    token: '',
    userId: '',
    companyId: ''
  };
}

@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}