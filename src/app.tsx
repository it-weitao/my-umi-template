import { Provider } from 'react-redux'
import { RuntimeConfig } from 'umi'
import { store } from './models'

export const rootContainer: RuntimeConfig['rootContainer'] = (root) => {
  return <Provider store={store}>{root}</Provider>
}
