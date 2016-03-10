import {Reducer, Action} from "@ngrx/store";

export interface RedditPosts {
    isFetching: boolean,
    didInvalidate?: boolean,
    posts: Array<any>,
    lastUpdated?: Date,
    selectedReddit?: string
}

export const LOADING = 'LOADING';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const SELECTED_REDDIT = 'SELECTED_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const selectedReddit : Reducer<string> = (state : string = 'Angular 2', action: Action) => {
    switch(action.type) {
        case SELECTED_REDDIT:
            console.log('called the selected reddit reducer');
            return action.payload;
        default:
            return state;
    }
};

const posts : Reducer<RedditPosts> = (state : RedditPosts = {
    isFetching: false,
    didInvalidate: false,
    posts: []
}, {type, payload}: Action) => {


  switch(type) {
      case INVALIDATE_REDDIT:
          return Object.assign({}, state, {
              didInvalidate: true
          });

      case RECEIVE_POSTS:
          console.log(`receive_posts`)
          return Object.assign({}, state, {
              isFetching: false,
              posts: payload.data.children.map(child => child.data),
              lastUpdated: Date.now()
          });
      default:
          return state;
  }
};

export const postsByReddit : Reducer<RedditPosts> = (state: {} = {}, {type, payload} : Action) => {
    switch (type) {
        case LOADING:
            console.log('LOADING');
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });

        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                [payload.reddit]: posts(state[payload.reddit], {type, payload})
            });
        default:
            return state;
    }
};

