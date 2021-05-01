import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}))

function ccyFormat(num) {
  return `${num.toFixed(2)}`
}

export const Cart = ({ products = [], discounts = [], onRemoveProduct }) => {
  const classes = useStyles()
  console.log('products!', products)
  console.log('discounts', discounts)
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <div className={classes.demo}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align='right'>Marca</TableCell>
                    <TableCell align='right'>Precio</TableCell>
                    <TableCell align='right'>Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, key) => (
                    <TableRow key={key}>
                      <TableCell component='th' scope='row'>
                        {product.description}
                      </TableCell>
                      <TableCell align='right'>{product.brand}</TableCell>
                      <TableCell align='right'>{product.price}</TableCell>
                      <TableCell align='right'>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={() => onRemoveProduct(product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/*  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align='right'>{ccyFormat(222)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align='right'>{ccyFormat(222)}</TableCell>
                    <TableCell align='right'>{ccyFormat(22)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align='right'>{ccyFormat(333)}</TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
