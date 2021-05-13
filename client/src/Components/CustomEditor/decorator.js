import { CompositeDecorator } from "draft-js"

export const findLinkEntities = (contentBlock, callback, contentState) => {
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

export const LinkEntity = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData()

  return (
    <a 
      className="color"
      href={url} 
      target="_blank" 
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
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
