import Grid from '@material-ui/core/Grid'
import { Link } from '@reach/router'

import { CartIconWithBadge } from 'components/CartIconWithBadge'

import { HeaderSection, Image } from './styles'
export const Header = ({ items = 2 }) => {
  return (
    <HeaderSection>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Image src={'/assets/logo.svg'} />
        </Grid>
        <Grid item xs={4}>
          {/* ANY */}
        </Grid>
        <Grid item xs={4}>
          <Link to='/carro'>
            <CartIconWithBadge items={items} />
          </Link>
        </Grid>
      </Grid>
    </HeaderSection>
  )
}
