import {
  LOADING_COMMENT_ON,
  LOADING_COMMENT_OFF,
  ICommentsState
} from "../types/redux/comments";

/*const createReducer => {

}*/

const initialState: ICommentsState = {
  loadingStatus: false
};

export default function commentsReducer(
  state = initialState,
  action: { type: string; payload: any }
): ICommentsState {
  switch (action.type) {
    case LOADING_COMMENT_ON: {
      return {
        loadingStatus: true
      };
    }

    case LOADING_COMMENT_OFF: {
      return {
        loadingStatus: false
      };
    }

    default: {
      return {
        loadingStatus: state.loadingStatus
      };
    }
  }
}

/*
'ENTITY_NAME' : {
 ITEMS: [
   ID : {
   field1: value
   field2: value
   relation1: [id1, id2]
  },
}
]
 META: {}
}
'ENTITY_RELATION1': {
ITEMS: {
ID: {
field1: value,
field2: value,
}
}
}


*/
