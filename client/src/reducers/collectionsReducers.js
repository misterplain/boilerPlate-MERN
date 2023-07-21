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
  PRODUCT_EDIT_COLLECTION_FAIL,
  PRODUCT_EDIT_COLLECTION_SUCCESS,
  PRODUCT_DELTE_COLLECTION_FAIL,
  PRODUCT_DELTE_COLLECTION_SUCCESS,
  PRODUCT_ADD_COLLECTION_FAIL,
  PRODUCT_ADD_COLLECTION_SUCCESS,
  FETCH_PEXEL_FAIL,
  FETCH_PEXEL_SUCCESS,
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
      const editedCollection = action.payload.data.collectionToUpdate;

      return {
        loading: false,
        collections: state.collections.map((collection) =>
          collection._id === editedCollection._id
            ? editedCollection
            : collection
        ),
      };

    case NAME_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload.data,
        collections: [...state.collections],
      };
    case DELETE_COLLECTION_SUCCESS:
      const deletedCollectionId = action.payload.data.collectionToDelete._id;
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

    case PRODUCT_EDIT_COLLECTION_SUCCESS:
      const { updatedProduct, oldCollectionId } = action.payload.data;
      const newCollectionId = updatedProduct.collectionId;

      const oldCollection = state.collections.find(
        (collection) => collection._id === oldCollectionId
      );
      const oldCollectionUpdatedProducts = oldCollection.products.filter(
        (productId) => productId !== updatedProduct._id
      );

      const newCollection = state.collections.find(
        (collection) => collection._id === newCollectionId
      );
      const newCollectionUpdatedProducts = [
        ...newCollection.products,
        updatedProduct._id,
      ];

      const updatedCollections = state.collections.map((collection) => {
        if (collection._id === oldCollectionId) {
          if (oldCollectionId === newCollectionId) {
            return collection;
          }
          return { ...collection, products: oldCollectionUpdatedProducts };
        } else if (collection._id === newCollectionId) {
          return { ...collection, products: newCollectionUpdatedProducts };
        } else {
          return collection;
        }
      });

      return {
        loading: false,
        collections: updatedCollections,
      };

    case PRODUCT_EDIT_COLLECTION_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
        collections: [...state.collections],
      };

    case PRODUCT_DELTE_COLLECTION_SUCCESS:
      const collectionToUpdate = action.payload.data.collectionToUpdate;

      const newCollectionsAfterDelete = state.collections.map((collection) =>
        collection._id !== collectionToUpdate._id
          ? collection
          : collectionToUpdate
      );

      return {
        loading: false,
        collections: newCollectionsAfterDelete,
      };

    case PRODUCT_DELTE_COLLECTION_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
        collections: [...state.collections],
      };

    case PRODUCT_ADD_COLLECTION_SUCCESS:
      const collectionToAdd = action.payload.data.newProduct.collectionId;
      const productToAdd = action.payload.data.newProduct._id;
      return {
        loading: false,
        collections: state.collections.map((collection) =>
          collection._id === collectionToAdd
            ? {
                ...collection,
                products: [...collection.products, productToAdd],
              }
            : collection
        ),
      };

    case PRODUCT_ADD_COLLECTION_FAIL:
      return {
        loading: false,
        error: action.payload.data.message,
        collections: [...state.collections],
      };

    //pexel
    case FETCH_PEXEL_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        photoUrl: action.payload.data.photoUrl,
        photoId: action.payload.data.photoId,
      };

    case FETCH_PEXEL_FAIL:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { collectionsReducer };
