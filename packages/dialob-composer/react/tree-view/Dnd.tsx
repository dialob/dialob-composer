import { DragSource, DropTarget, XYCoord, DropTargetMonitor, ConnectDropTarget, ConnectDragSource } from 'react-dnd'
import { findDOMNode } from 'react-dom';
import { Dialob } from '../../global';



interface DndProps extends Dialob.ItemEditorProps {
  index: number,
  moveItem: (props: { itemId: string, fromIndex: number, toIndex: number, fromParent: string, toParent: string }) => void;
} 

type DndProvider = DndProps & {
  connectDragSource: ConnectDragSource, 
  connectDropTarget: ConnectDropTarget, 
  isOver: boolean,
  clientOffset: XYCoord | null,
  dragItem: DndProps
}


const CONTAINER_TYPES = ['group', 'rowgroup', 'surveygroup'];
const ITEM_TYPES = ['text', 'number', 'decimal', 'boolean', 'note', 'time', 'date', 'list', 'multichoice'];
const ALL_TYPES = CONTAINER_TYPES.concat(ITEM_TYPES, ['survey']);

const CONTAINMENT: Record<string, string | string[]> = {
  page: CONTAINER_TYPES,
  group: CONTAINER_TYPES.concat(ITEM_TYPES),
  rowgroup: ALL_TYPES,
  surveygroup: ITEM_TYPES.concat(['survey']),
  questionnaire: 'page'
};

function canContain(container: string | undefined, item: string) {
  if(!container) {
    return false;
  }
  let allowedTypes = CONTAINMENT[container];
  if (!allowedTypes) {
    return false;
  }
  return allowedTypes.indexOf(item) > -1;
}


const DropPosition = {
  ABOVE: 0,
  BELOW: 1,
  INSIDE: 2
};

const getDropPosition = (boundingRect: DOMRect, clientOffset: XYCoord | null, parentType: string | undefined, targetType: string, itemType: string) => {
  let result = null;
  const canDropAside = canContain(parentType, itemType);
  const canDropIn = canContain(targetType, itemType)
  
  if (canDropAside) {
    const midY = (boundingRect.bottom - boundingRect.top) / 2;
    if(!clientOffset) {
      throw new Error("clientOffset can't be null'");
    }
    const y = clientOffset.y - boundingRect.top;

    if (y >= midY) {
      result = DropPosition.BELOW;
    } else {
      result = DropPosition.ABOVE;
    }
  }

  if (canDropIn && canDropAside) {
    if(!clientOffset) {
      throw new Error("clientOffset can't be null'");
    }
    const x = clientOffset.x - boundingRect.left;
    const midX = (boundingRect.right - boundingRect.left) / 2;
    if (x >= midX) {
      result = DropPosition.INSIDE;
    }
  }

  if (canDropIn && !canDropAside) {
    result = DropPosition.INSIDE;
  }

  return result;
}



const source = DragSource<DndProps>('item', 
  { 
    beginDrag: (props) => props 
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging
  }));


const target = DropTarget<DndProps>('item', {
  drop(props: DndProps, monitor: DropTargetMonitor, component: any) {
    const dragIndex = monitor.getItem().index;
    const dragParent = monitor.getItem().parentItemId;
    const hoverIndex = props.index;
    const hoverParent = props.parentItemId;
    if (dragIndex === hoverIndex && dragParent === hoverParent) {
      return;
    }
    if (monitor.didDrop()) {
      return;
    }

    const dropPosition = getDropPosition(
      (findDOMNode(component) as Element).getBoundingClientRect(), 
      monitor.getClientOffset(), 
      props.parentItemType, 
      props.isPage ? 'page' : props.itemType, 
      monitor.getItem().isPage ? 'page' : monitor.getItem().itemType);
      
    
    if (dropPosition === DropPosition.ABOVE) {
      const action = { 
        fromIndex: dragIndex, 
        fromParent: dragParent,
        toIndex: hoverIndex,  
        toParent: hoverParent as string,
        itemId: monitor.getItem().itemId}
      props.moveItem(action);
    } else if (dropPosition === DropPosition.BELOW) {
     const action = { 
        fromIndex: dragIndex, 
        fromParent: dragParent,
        toIndex: hoverIndex + 1,  
        toParent: hoverParent as string,
        itemId: monitor.getItem().itemId}
      props.moveItem(action);
    } else if (dropPosition === DropPosition.INSIDE) {
      const action = { 
        fromIndex: dragIndex, 
        fromParent: props.itemId,
        toIndex: 0,  
        toParent: hoverParent as string,
        itemId: monitor.getItem().itemId}
      props.moveItem(action);
    }
  }
},
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    clientOffset: monitor.getClientOffset(),
    dragItem: monitor.getItem()
  }));
  
const Dnd: (Component: React.FC<DndProvider>) => React.ElementType<DndProps> = (Component) => source(target(Component)) as any;
export type { DndProps, DndProvider };
export { Dnd, getDropPosition, DropPosition }



