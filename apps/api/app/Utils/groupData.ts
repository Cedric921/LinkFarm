import Operation from 'App/Models/Operation'
import Transaction from 'App/Models/Transaction'
import { EtypeOperation, EtypeTransaction } from './Enums'

type DataType = {
  date: string
  items: (Transaction | Operation)[]
}
export const groupByCreatedAt = (payload: (Transaction | Operation)[]) => {
  const data: DataType[] = []
  payload.map((item) => {
    const itemDay =
      item?.createdAt?.toString()?.split('T')[0] ?? item?.updatedAt?.toString()?.split('T')[0]

    const existDay = data.find((el) => el.date === itemDay)

    if (existDay) {
      existDay.items.push(item)
    } else {
      data.push({
        date: itemDay,
        items: [item],
      })
    }
  })

  return data
}

export const groupOperation = (payload: Operation[]) => {
  const data: {
    sale: Operation[]
    purchase: Operation[]
  } = { sale: [], purchase: [] }

  payload.map((op) => {
    op.type === EtypeOperation.SALE ? data.sale.push(op) : data.purchase.push(op)
  })

  return {
    sale: groupByCreatedAt(data.sale),
    purchase: groupByCreatedAt(data.purchase),
  }
}

export const groupTransaction = (payload: Transaction[]) => {
  const data: {
    deposit: Transaction[]
    withdraw: Transaction[]
  } = { deposit: [], withdraw: [] }

  payload.map((op) => {
    op.type === EtypeTransaction.DEPOSIT ? data.deposit.push(op) : data.withdraw.push(op)
  })

  return {
    sale: groupByCreatedAt(data.deposit),
    withdraw: groupByCreatedAt(data.withdraw),
  }
}
