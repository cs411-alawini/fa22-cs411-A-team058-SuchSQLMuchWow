import { Query } from '@datorama/akita';
import { SessionState, SessionStore } from './session.store';
import {sessionStore} from './session.store'

export class SessionQuery extends Query<SessionState> {

  constructor(protected store: SessionStore) {
    super(store);
  }

  get token() {
    return this.getValue().token;
  }
}

export const sessionQuery = new SessionQuery(sessionStore) 