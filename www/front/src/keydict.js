/* eslint-disable no-bitwise */
export const fieldLists = Object.freeze({
  wheelset: ['axle_num', 'manufacturer', 'year_build', 'ws_type', 'rim_thickness_range', 'gost', 'owner_name', 'state', 'detail_tag', 'storage_number', 'op_code', 'operation_date', 'full_examin_date', 'full_examin_plant'],
  proposal: ['type', 'receiver', 'receiverInn', 'sender', 'senderInn', 'state', 'objectsId', 'comment'],
  item: ['axle_num', 'owner_name', 'state', 'storage_number', 'op_code'],
})

export const systemUsers = ['admin', 'worker']

export const proposals = {
  paths: {
    incoming: 'incoming',
    onsale: 'onsale',
    outgoing: 'outgoing',
    tackle: 'tackle',
  },
  statuses: {
    accepted: 'ПРИНЯТА',
    new: 'НОВАЯ',
    rejected: 'ОТКЛОНЕНА',
  },
  types: {
    sell: 'SELL',
    buy: 'BUY',
    tackle: 'TACKLE'
  }
}

const brandNew = 1 << 1
const takenApart = 1 << 2
const appliesTo = 1 << 3
const underFreight = 1 << 4
const underRepair = 1 << 5
const shipment = 1 << 6
const safekeeping = 1 << 7
const inPassengerPark = 1 << 8
const operationBan = 1 << 9
const inStore = 1 << 10

export const StatesByTag = {
  1: brandNew | underFreight | shipment | safekeeping | inPassengerPark | operationBan | inStore,
  2: underFreight | underRepair | shipment | safekeeping | inPassengerPark | operationBan | inStore,
  3: underRepair | shipment | safekeeping | inStore,
  4: takenApart | underRepair | shipment | safekeeping | operationBan | inStore,
  5: takenApart | underRepair | shipment | safekeeping | operationBan | inStore,
  6: appliesTo | underRepair | shipment | safekeeping | operationBan | inStore,
  7: underRepair | shipment | safekeeping | operationBan | inStore,
}

const wheelsetFormationWithoutAxlebox = 1 << 5
const wheelsetFormation = 1 << 6
const sell = 1 << 7
const buy = 1 << 8
const sending = 1 << 9
const supply = 1 << 10
const installationNegotiation = 1 << 11
const installationUnderTheCar = 1 << 12
const operationUnderTheCar = 1 << 13
const transferOfTheCarToANonWorkingPark = 1 << 14
const rollingOutFromUnderTheCar = 1 << 15
const carCutting = 1 << 16
const outboundTransfer = 1 << 17
const inboundTransfer = 1 << 18
const repairWheelset = 1 << 19
const repairItems = 1 << 20
const transferToThePassengerPark = 1 << 23
const operationInThePassengerPark = 1 << 24
const arrivalFromThePassengerPark = 1 << 25
const operatingBan = 1 << 26
const wheelsetException = 1 << 27
const wheelsetDisbanded = 1 << 28
const cancelOperation = 1 << 29
const purchaseOffer = 1 << 30
const saleOffer = 1 << 31

export const OperationsByState = {
  1: wheelsetFormationWithoutAxlebox | wheelsetFormation | buy | sell | sending | supply |
  installationUnderTheCar | cancelOperation | purchaseOffer | saleOffer,
  2: buy | sell | sending | supply | wheelsetException | wheelsetDisbanded | cancelOperation |
  purchaseOffer | saleOffer,
  3: buy | sell | sending | supply | wheelsetException |
  cancelOperation | purchaseOffer | saleOffer,
  4: operationUnderTheCar | transferOfTheCarToANonWorkingPark | cancelOperation,
  5: wheelsetFormationWithoutAxlebox | wheelsetFormation | buy | sell | sending | supply |
  installationNegotiation | rollingOutFromUnderTheCar |
  carCutting | repairWheelset | repairItems | wheelsetDisbanded | cancelOperation | purchaseOffer | saleOffer,
  6: buy | sell | sending | supply | installationNegotiation | rollingOutFromUnderTheCar |
  carCutting | outboundTransfer | inboundTransfer | cancelOperation |
  purchaseOffer | saleOffer,
  7: buy | sell | sending | supply | installationNegotiation | installationUnderTheCar | cancelOperation |
  purchaseOffer | saleOffer,
  8: operationUnderTheCar | transferOfTheCarToANonWorkingPark | repairWheelset | transferToThePassengerPark |
  operationInThePassengerPark | arrivalFromThePassengerPark | cancelOperation,
  9: buy | sell | sending | supply | operatingBan |
  cancelOperation | purchaseOffer | saleOffer,
  10: wheelsetFormationWithoutAxlebox | wheelsetFormation | buy | sell | sending | supply | installationNegotiation |
  installationUnderTheCar | rollingOutFromUnderTheCar | carCutting | cancelOperation | purchaseOffer | saleOffer,
  11: buy | sell | sending | supply | cancelOperation | purchaseOffer | saleOffer,
}
