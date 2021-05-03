import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { useStyles } from './styles'

export const Cart = ({
  products = [],
  discounts = [],
  summary = {
    subTotalValue: 0,
    totalDiscounts: 0,
    totalValue: 0,
    totalProducts: 0,
  },
  onRemoveProduct,
}) => {
  const classes = useStyles()
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

                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Subtotal de productos
                    </TableCell>
                    <TableCell align='right' />
                    <TableCell align='right'>{summary.subTotalValue}</TableCell>
                    <TableCell align='right' />
                  </TableRow>
                  {discounts.map((d, key) => (
                    <TableRow key={key}>
                      <TableCell
                        component='th'
                        scope='row'
                        className={classes.discount}
                      >
                        Descuento por Marca - {d.discount.brand}
                      </TableCell>
                      <TableCell align='right' />
                      <TableCell align='right' className={classes.discount}>
                        {d.discount.discount}
                      </TableCell>
                      <TableCell align='right' />
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      component='th'
                      scope='row'
                      className={classes.summary}
                    >
                      Total a Pagar
                    </TableCell>
                    <TableCell align='right' />
                    <TableCell align='right' className={classes.summary}>
                      {summary.totalValue}
                    </TableCell>
                    <TableCell align='right' />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
