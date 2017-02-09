import { isFSA } from 'flux-standard-action';

const logger = store => next => action => {
    let actionName = null;
    let actionShow = null;
    if(typeof action === 'object'){
        actionName = action.type;
        actionShow = action;
    }
    if(typeof action === 'function'){
        actionName = (action.name || action.toString().match(/function\s*([^(]*)\(/)[1]) + '[Async-Thunk]';
        actionShow = "thunk is pending";
    }
    if(action.then && typeof action.then === 'function'){
        actionName = '[Async-Promise]';
        actionShow = action;
    }
    console.group(actionName);
    console.info('dispatching', actionShow);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(actionName);
    return result
};

const changeTitle = store => next => action => {
    if(action.type === 'changeTitle'){
        document.title = action.payload;
    }
    return next(action);
}

const timeoutScheduler = store => next => action => {
    if (!action.meta || !action.meta.delay) {
        return next(action)
    }

    let timeoutId = setTimeout(
        () => next(action),
        action.meta.delay
    )

    return function cancel() {
        clearTimeout(timeoutId)
    }
};

function isPromise(val) {
  return val && typeof val.then === 'function';
}

const vanillaPromise = ({ dispatch }) => next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
};

const readyStatePromise = store => next => action => {
    if (!action.promise) {
        return next(action)
    }

    function makeAction(ready, data) {
        let newAction = Object.assign({}, action, { ready }, data)
        delete newAction.promise
        return newAction
    }

    next(makeAction(false))
    return action.promise.then(
        result => next(makeAction(true, { result })),
        error => next(makeAction(true, { error }))
    )
};

const thunk = store => next => action => {
    if(typeof action === 'function'){
        return action(store.dispatch, store.getState);
    }
    return next(action);
}

let middlewares = {logger, timeoutScheduler, vanillaPromise, readyStatePromise, thunk, changeTitle}

if(process.env.NODE_ENV === 'production'){
    middlewares = {timeoutScheduler, vanillaPromise, readyStatePromise, thunk, changeTitle}
}

export default middlewares