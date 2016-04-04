import { UIPipe } from '../../pipe';

export const uiPipeMiddleware = store => next => action => {
  UIPipe.send(action);
  return next(action);
};
