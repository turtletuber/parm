import { useDimensions } from './react-use-dimensions';

/**
 * @param deps - overflow will be remeasured if the values in the dep list change.
 * For instance, deps could include the text length of the child or the height of
 * a resizable parent.
 */
export function useOverflowState(deps: any[] = [], trackWindowResize = true) {
  const { 
    ref: childRef,
    dimensions: childDimensions,
  } = useDimensions(deps, trackWindowResize);
  const {
    ref: parentRef,
    dimensions: parentDimensions,
  } = useDimensions(deps, trackWindowResize);
  return { 
    childRef,
    parentRef,
    isOverflowing: {
      bottom: !(childDimensions.bottom < parentDimensions.bottom),
      right: !(childDimensions.right < parentDimensions.right),
      top: !(childDimensions.top > parentDimensions.top),
      left: !(childDimensions.left > parentDimensions.left),
    },
  };
}