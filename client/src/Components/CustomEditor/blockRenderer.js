const blockRenderer = (block) => {
  if (block.getType() === "atomic") {
    return {
      component: MediaBlock,
      editable: false,
    };
  }

  return null;
}

const MediaBlock = ({ contentState, block }) => {
  const entity = contentState.getEntity(
    block.getEntityAt(0)
  );
  const { src } = entity.getData();

  return (
    <img className="m-auto mb-4 w-4/5" src={src} draggable={false} />
  )
}

export default blockRenderer
