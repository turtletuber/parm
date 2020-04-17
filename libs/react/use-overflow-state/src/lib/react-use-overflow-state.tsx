import { useDimensions } from './react-use-dimensions';

/**
 * @param hash - a hash based on the size of the parent and/or child.
 * For instance, hashed on the text length of the child or the height of
 * a resizable parent.
 */
export function useOverflowState(hash: string) {
  const { 
    ref: childRef,
    dimensions: childDimensions,
  } = useDimensions(hash);
  const {
    ref: parentRef,
    dimensions: parentDimensions,
  } = useDimensions(hash);
  return { 
    childRef,
    parentRef,
    isOverflowing: {
      bottom: childDimensions.bottom > parentDimensions.bottom,
      right: childDimensions.right > parentDimensions.right,
      top: childDimensions.top > parentDimensions.top,
      left: childDimensions.left > parentDimensions.left,
    },
  };
}