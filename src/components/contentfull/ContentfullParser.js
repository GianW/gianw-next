import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

import PropTypes from 'prop-types'

// Create a bespoke renderOptions object to target BLOCKS.EMBEDDED_ENTRY (linked entries e.g. videoEmbed)
// and BLOCKS.EMBEDDED_ASSET (linked assets e.g. images)

function renderOptions(links) {
  // create an asset block map
  const assetBlockMap = new Map()
  // loop through the assets and add them to the map
  if (links?.assets?.block) {
    for (const asset of links?.assets?.block) {
      assetBlockMap.set(asset.sys.id, asset)
    }
  }

  // create an entry block map
  const entryBlockMap = new Map()
  // loop through the assets and add them to the map
  if (links?.entries?.block) {
    for (const entry of links.entries.block) {
      entryBlockMap.set(entry.sys.id, entry)
    }
  }

  return {
    // other options...

    renderNode: {
      // other options...

      [BLOCKS.EMBEDDED_ENTRY]: node => {
        // find the entry in the entryBlockMap by ID
        const entry = entryBlockMap.get(node.data.target.sys.id)

        // render the entries as needed by looking at the __typename
        // referenced in the GraphQL query

        if (entry.__typename === 'VideoEmbed') {
          return (
            <iframe
              src={entry.embedUrl}
              height='100%'
              width='100%'
              frameBorder='0'
              scrolling='no'
              title={entry.title}
              allowFullScreen={true}
            />
          )
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        // find the asset in the assetBlockMap by ID
        const asset = assetBlockMap.get(node.data.target.sys.id)

        // render the asset accordingly
        return <img src={asset?.url} alt='My image alt text' />
      },
    },
  }
}

export const RichTextResponse = ({ richTextResponse }) => {
  return (
    <>
      {documentToReactComponents(
        richTextResponse.conteudo.json,
        renderOptions(richTextResponse.conteudo.links)
      )}
    </>
  )
}

RichTextResponse.propTypes = {
  richTextResponse: PropTypes.object,
}
