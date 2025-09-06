export const tools = {
  formataValor(valor: number): string {
    const valorFormatado = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
    const arr = valorFormatado.split('$')

    return arr[0] + '$ ' + arr[1]
  },
  formataParaTelefone(value: string | number): string | undefined {
    value = value.toString()
    const valueRaw = value.replace(/[^0-9]/g, '')
    let numberFormat = value.replace(/[^0-9]/g, '')
    if (valueRaw.length > 2) {
      numberFormat = '(' + numberFormat.slice(0, 2) + ')' + ' ' + numberFormat.slice(2, numberFormat.length)
    }
    if (valueRaw.length > 6 && valueRaw.length <= 10) {
      numberFormat = numberFormat.slice(0, 9) + ' ' + numberFormat.slice(9, numberFormat.length)
    }
    if (valueRaw.length > 10) {
      numberFormat = numberFormat.slice(0, 10) + '-' + numberFormat.slice(10, numberFormat.length)
    }
    if (valueRaw.length <= 11 && numberFormat.length <= 15) {
      return numberFormat
    }
  },
  converteEmQrCodeCliente: (idCliente: number | string): string => {
    const codigo = `C${idCliente}`
    return codigo
  },
  formataSku(value: string): string {
    return value.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
  }
}
