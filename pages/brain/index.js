import PropTypes from 'prop-types'
import { AppHeader } from 'components/AppHeader/AppHeader'
import { BrainList } from 'components/BrainList'
import { getAllCompletesData } from 'lib/dataSource'
import { Fade } from 'components/Animation/Fade'

export default function Brain({ brainPosts }) {
  return (
    <>
      <AppHeader title='Brain' />
      <Fade delay={0}>
        <BrainList brains={brainPosts} />
      </Fade>
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
