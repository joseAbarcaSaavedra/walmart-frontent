import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const DEFAULT_IMAGE =
  'https://www.lider.cl/catalogo/images/catalogo_no_photo.jpg'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})
export const ProductCard = ({ data, onAddProduct = () => {} }) => {
  const classes = useStyles()
  const {
    id = 0,
    brand = '',
    description = '',
    image = DEFAULT_IMAGE,
    price = 0,
  } = data
  return (
    <div>
      <Card className=''>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={DEFAULT_IMAGE}
            title={brand}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {description}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {brand}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/*  <Button size='small' color='primary'>
            Share
          </Button> */}
          <Button size='small' color='primary' onClick={() => onAddProduct()}>
            COMPRAR
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
