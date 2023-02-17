export type BookCardType = {
    issueYear: string | null
    rating: number | null
    title: string
    authors: string[] | null
    image: {
        url: string | null
    }
    categories: string[] | null
    id: number
    booking: BookingType | null
    delivery: DeliveryType | null
    histories: HistoryType[] | null
}

export type BookingType = {
    id: number
    order: boolean
    dateOrder: string | null
    customerId: number | null
    customerFirstName: string | null
    customerLastName: string | null
}

export type DeliveryType = {
    id: number
    handed: boolean
    dateHandedFrom: string | null
    dateHandedTo: string | null
    recipientId: number | null
    recipientFirstName: string | null
    recipientLastName: string | null
}

export type HistoryType = {
    id: number | null
    userId: number | null
}