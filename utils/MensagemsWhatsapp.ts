interface PropsMensagensWhatsApp {
  telefone: string
  mensagem: string
}
export class MensagensWhatsApp {
  private readonly urlWhatsApp = 'https://api.whatsapp.com/send/?phone=55'
  private telefone = 0
  private mensagem = ''
  public resultado = ''

  constructor(dados: PropsMensagensWhatsApp) {
    this.setMensagem(dados.mensagem)
    this.setTelefone(String(dados.telefone))

    this.resultado = `${this.urlWhatsApp}${this.telefone}&text=${this.mensagem}`
  }

  private setMensagem(mensagem: string) {
    const mensagemConvertidaParaURL = encodeURIComponent(mensagem)
    this.mensagem = mensagemConvertidaParaURL
  }

  private setTelefone(telefone: string) {
    const telefoneTratado = telefone.replace(/[^0-9]/g, '')
    this.telefone = parseInt(telefoneTratado)
  }
}
