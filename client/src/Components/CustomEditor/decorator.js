import { CompositeDecorator } from "draft-js"
import { Link } from "react-router-dom"

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
    <Link to={url}>
      {children}
    </Link>
  )
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkEntity,
  },
])

export default decorator
