import { SetupWorker, setupWorker } from 'msw';

import { handlers } from './handlers';

export const worker: SetupWorker = setupWorker(...handlers);
