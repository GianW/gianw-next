import PropTypes from 'prop-types'
import { AppHeader } from 'components/AppHeader'
import { BrainList } from 'components/BrainList'
import { getAllCompletesData } from 'lib/dataSource'

export default function Brain({ brainPosts }) {
  return (
    <>
      <AppHeader title='Brain' />
      <BrainList brains={brainPosts} />
    </>
  )
}

Brain.propTypes = {
  brainPosts: PropTypes.array,
}

export async function getStaticProps() {
  const brainPosts = (await getAllCompletesData()) || []
  return {
    props: { brainPosts },
  }
}
