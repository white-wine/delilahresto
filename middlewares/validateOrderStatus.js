const validStatus = ['new', 'confirmed', 'preparing','delivering','delivered']

// Verificar status order
exports.verifyOrderStatus = function(req, res, next) {
  const { order_status } = req.body
  if (validStatus.includes(order_status)) {
    next()
  } else {
    return res.status(405).json({
      ok: false,
      message: 'Invalid status suplied',
      errors: { message: 'Invalid status suplied' }
    })
  }
}