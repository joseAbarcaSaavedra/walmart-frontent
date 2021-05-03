import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { StyledBadge } from './styles'

export const CartIconWithBadge = ({ items = 0 }) => {

  return (
    <div>
      <IconButton aria-label='cart'>
        <StyledBadge badgeContent={items} color='secondary'>
          <ShoppingCartIcon style={{ color: 'white' }} />
        </StyledBadge>
      </IconButton>
    </div>
  )
}
