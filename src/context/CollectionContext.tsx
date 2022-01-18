/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ICollection } from 'types';

export interface CollectionContextType {
  collection : ICollection[];
  addCollection : (collection: ICollection) => void;
  removeCollection : (name: string) => void;
  pokemonCount : () => number;
  pokemonCountByName : (name: string) => number;
}

const initialCollection: CollectionContextType = {
  collection: [],
  addCollection: () => {},
  removeCollection: () => {},
  pokemonCount: () => 0,
  pokemonCountByName: () => 0,
};

const CollectionContext = createContext<CollectionContextType>(initialCollection);

type props = {
  children: ReactNode;
};

const CollectionContextProvider = ({ children }: props) => {
  const [collection, setCollection] = useState<ICollection[]>(initialCollection.collection);

  const addCollection = (newCollections: ICollection) => {
    setCollection((prev) => [...prev, newCollections]);
  };

  const removeCollection = (name: string) => {
    setCollection((prev) => prev.filter((item) => item.name !== name));
  };

  const pokemonCount = () => collection.length;

  const pokemonCountByName = (name: string) => collection.filter(
    (item) => item.name === name,
  ).length;

  useEffect(() => {
    setCollection(JSON.parse(localStorage.getItem('collection') as string) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('collection', JSON.stringify(collection));
  }, [collection]);

  return (
    <CollectionContext.Provider value={{
      collection,
      addCollection,
      removeCollection,
      pokemonCount,
      pokemonCountByName,
    }}
    >
      { children }
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const { collection } = useContext(CollectionContext);

  return collection;
};

export const useAddCollection = () => {
  const { addCollection } = useContext(CollectionContext);

  return addCollection;
};

export const useRemoveCollection = () => {
  const { removeCollection } = useContext(CollectionContext);

  return removeCollection;
};

export const usePokemonCount = () => {
  const { pokemonCount } = useContext(CollectionContext);

  return pokemonCount;
};

export const usePokemonCountByName = () => {
  const { pokemonCountByName } = useContext(CollectionContext);

  return pokemonCountByName;
};

export default CollectionContextProvider;
