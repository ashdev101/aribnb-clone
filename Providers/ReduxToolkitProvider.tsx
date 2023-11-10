'use client'
import { store } from '@/Feature/Store/Store'
import { Provider } from 'react-redux'

type Props = {
    children: React.ReactNode
}

function ReduxToolkitProvider({ children }: Props) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxToolkitProvider