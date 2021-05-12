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
    <img src={src} />
  )
}

export default blockRenderer
