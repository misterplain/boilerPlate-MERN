import {
  COLLECTIONS_LIST_REQUEST,
  COLLECTIONS_LIST_SUCCESS,
  COLLECTIONS_LIST_FAIL,
  NEW_COLLECTION_REQUEST,
  NEW_COLLECTION_SUCCESS,
  NEW_COLLECTION_FAIL,
  COLLECTION_EDIT_REQUEST,
  COLLECTION_EDIT_SUCCESS,
  COLLECTION_EDIT_FAIL,
  DELETE_COLLECTION_REQUEST,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAIL,
  FETCH_PEXEL_REQUEST,
  FETCH_PEXEL_FAIL,
  FETCH_PEXEL_SUCCESS,
} from "../constants/collectionsConstants";

const collectionsReducer = (state = { collections: [] }, action) => {
  switch (action.type) {
    case COLLECTIONS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COLLECTIONS_LIST_SUCCESS:
      return {
        loading: false,
        error: null,
        collections: action.payload.data.allCollections,
      };
    case COLLECTIONS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_COLLECTION_REQUEST:
      return {
        ...state,
        loading: true,
        collectionModalError: null,
      };

    case NEW_COLLECTION_SUCCESS:
      return {
        loading: false,
        collectionModalError: null,
        collections: [...state.collections, action.payload.data.newCollection],
      };

    case NEW_COLLECTION_FAIL:
      return {
        loading: false,
        collectionModalError: action.payload.data.message,
        collections: [...state.collections],
      };

    case COLLECTION_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        collectionModalError: null,
      };

    case COLLECTION_EDIT_SUCCESS:
      const editedCollection = action.payload.data.collectionToUpdate;

      return {
        loading: false,
        collections: state.collections.map((collection) =>
          collection._id === editedCollection._id
            ? editedCollection
            : collection
        ),
        collectionModalError: null,
      };

    case COLLECTION_EDIT_FAIL:
      return {
        loading: false,
        collectionModalError: action.payload.data,
        collections: [...state.collections],
      };

    case DELETE_COLLECTION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_COLLECTION_SUCCESS:
      const deletedCollectionId = action.payload.data.collectionToDelete._id;
      let newCollections = [...state.collections];
      newCollections = newCollections.filter(
        (collection) => collection._id !== deletedCollectionId
      );
      return {
        loading: false,
        collections: newCollections,
        error: null,
      };
    case DELETE_COLLECTION_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
        collections: [...state.collections],
      };

    case FETCH_PEXEL_REQUEST: {
      return {
        ...state,
        loading: true,
        collectionModalError: null,
      };
    }
    case FETCH_PEXEL_SUCCESS:
      return {
        ...state,
        loading: false,
        collectionModalError: null,
        photoUrl: action.payload.data.photoUrl,
        photoId: action.payload.data.photoId,
      };

    case FETCH_PEXEL_FAIL:
      return {
        ...state,
        loading: false,
        collectionModalError: action.payload.data.message,
      };

    default:
      return state;
  }
};

export { collectionsReducer };
