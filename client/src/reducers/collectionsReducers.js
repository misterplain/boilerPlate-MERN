import {
  COLLECTIONS_LIST_REQUEST,
  COLLECTIONS_LIST_SUCCESS,
  COLLECTIONS_LIST_FAIL,
  NEW_COLLECTION_SUCCESS,
  NEW_COLLECTION_FAIL,
  NAME_UPDATE_FAIL,
  NAME_UPDATE_SUCCESS,
    DELETE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAIL,
} from "../constants/collectionsConstants";

const collectionsReducer = (state = { collections: [] }, action) => {
  switch (action.type) {
    case COLLECTIONS_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case COLLECTIONS_LIST_SUCCESS:
      return {
        loading: false,
        collections: action.payload.data.allCollections,
      };
    case COLLECTIONS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
      };

    case NEW_COLLECTION_SUCCESS:
      return {
        loading: false,
        collections: [...state.collections, action.payload.data.newCollection],
      };

    case NEW_COLLECTION_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
        collections: [...state.collections],
      };

    case NAME_UPDATE_SUCCESS:
      const editedCollectionId = action.payload.data.collectionToUpdate._id;
      console.log(editedCollectionId);
      let newEditedCollections = [...state.collections];
      const editedCollection = action.payload.data.collectionToUpdate;
      console.log(editedCollection);
      let collectionToEdit = newEditedCollections.find(
        (collection) => collection._id === editedCollectionId
      );
      console.log(collectionToEdit);
      collectionToEdit.name = editedCollection.name;
      console.log(collectionToEdit);
      return {
        loading: false,
        collections: newEditedCollections,
      };
    case NAME_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload.data,
        collections: [...state.collections],
      };
    case DELETE_COLLECTION_SUCCESS:
      const deletedCollectionId = action.payload.data.collectionToDelete._id;
      console.log(deletedCollectionId);
      let newCollections = [...state.collections];
      newCollections = newCollections.filter(
        (collection) => collection._id !== deletedCollectionId
      );
      return {
        loading: false,
        collections: newCollections,
      };
    case DELETE_COLLECTION_FAIL:
      return {
        loading: false,
        error: action.payload.data,
        collections: [...state.collections],
      };
    default:
      return state;
  }
};

export { collectionsReducer };
