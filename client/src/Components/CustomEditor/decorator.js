import { CompositeDecorator } from "draft-js"

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    },
    callback
  )
}

const LinkEntity = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData()

  return (
    <a href={url} target="_blank" onClick={(e) => e.stopPropagation()}>
      {children}
    </a>
  )
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkEntity,
  },
])

export default decorator
