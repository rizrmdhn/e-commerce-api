import env from '#start/env'
import type { ApplicationService } from '@adonisjs/core/types'
import { MidtransClient } from 'midtrans-node-client'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    MidtransSnap: MidtransClient.Snap
    MidtransCore: MidtransClient.CoreApi
    MidtransIris: MidtransClient.Iris
  }
}
export default class MidtransProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('MidtransSnap', async () => {
      return new MidtransClient.Snap({
        isProduction: env.get('MIDTRANS_IS_PRODUCTION', false),
        serverKey: env.get('MIDTRANS_SERVER_KEY'),
        clientKey: env.get('MIDTRANS_CLIENT_KEY'),
      })
    })

    this.app.container.singleton('MidtransCore', async () => {
      return new MidtransClient.CoreApi({
        isProduction: env.get('MIDTRANS_IS_PRODUCTION', false),
        serverKey: env.get('MIDTRANS_SERVER_KEY'),
        clientKey: env.get('MIDTRANS_CLIENT_KEY'),
      })
    })

    this.app.container.singleton('MidtransIris', async () => {
      return new MidtransClient.Iris({
        isProduction: env.get('MIDTRANS_IS_PRODUCTION', false),
        serverKey: env.get('MIDTRANS_SERVER_KEY'),
        clientKey: env.get('MIDTRANS_CLIENT_KEY'),
      })
    })
  }
}
