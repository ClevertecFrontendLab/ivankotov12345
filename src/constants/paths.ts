
export type NavBooksListType = {
    name: string,
    category: string,
    quantity?: number,
}

export const NAV_LIST = {
    books: {
        name: 'Витрина книг',
        path: 'books',
    },
    terms: {
        name: 'Правила пользования',
        path: 'terms',
    },
    contract: {
        name: 'Договор оферты',
        path: 'contract',
    },
}

export const NAV_BOOKS_ALL = {
        name: 'Все книги',
        path: 'all',
        id: 0
    }
    