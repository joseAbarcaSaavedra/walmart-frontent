import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export const getSuggestedDiscountMessage = (
  { lastProductAdded = null, suggestedDiscount = null, discounts = [] },
  forceDisplay = false
) => {
  let msg = ''
  if (
    lastProductAdded &&
    suggestedDiscount &&
    (lastProductAdded.brand === suggestedDiscount.discount.brand ||
      forceDisplay)
  ) {
    const discountInfo = discounts[suggestedDiscount.idx]
    msg = `¡Agrega $ ${(
      discountInfo.thresholdDiff * -1
    ).toString()} más en productos ${
      discountInfo.discount.brand
    } y aprovecha un descuento total de $ ${discountInfo.discount.discount.toString()} en tu compra!`
  }
  return msg
}

export const getAppliedDiscountMessage = ({
  lastProductAdded = null,
  activeDiscount = null,
  discounts = [],
  suggestedDiscount,
}) => {
  let msg = ''
  if (
    lastProductAdded &&
    activeDiscount &&
    lastProductAdded.brand === activeDiscount.discount.brand
  ) {
    const discountInfo = discounts[activeDiscount.idx]
    msg = `¡Se aplicó un descuento de ${discountInfo.discount.discount.toString()} por haber comprado ${
      discountInfo.discount.threshold
    } de productos ${discountInfo.discount.brand}!.`
  }
  return msg
}

export const DiscountAlert = ({
  message = '',
  timeout = 10000,
  onClose = () => {},
}) => {
  return (
    <Snackbar
      open={message !== ''}
      autoHideDuration={timeout}
      onClose={onClose}
    >
      <MuiAlert
        elevation={6}
        variant='filled'
        onClose={onClose}
        severity='success'
      >
        {message.split('.').map((m, key) => (
          <p key={key}>{m}</p>
        ))}
      </MuiAlert>
    </Snackbar>
  )
}
