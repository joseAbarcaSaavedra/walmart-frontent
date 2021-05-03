import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const DEFAULT_IMAGE = 'www.lider.cl/catalogo/images/catalogo_no_photo.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})
export const ProductCard = ({
  data,
  onAddProduct = () => {},
  suggestedDiscount = null,
}) => {
  const classes = useStyles()
  const {
    brand = '',
    description = '',
    image = DEFAULT_IMAGE,
    price = 0,
  } = data

  // Discount flag
  const withDiscount =
    suggestedDiscount && suggestedDiscount.discount.brand === brand

  return (
    <div>
      <Card className=''>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://${image}`}
            title={brand}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {description}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {brand}
            </Typography>
            <p>${price}</p>
            {withDiscount && (
              <Chip
                label='PRODUCTO CON DESCUENTO'
                color='secondary'
                variant='outlined'
              />
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => onAddProduct(data)}
          >
            COMPRAR
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
