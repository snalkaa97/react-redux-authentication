import store from './store';
import { persistStore} from 'redux-persist'

const persistore = persistStore(store);

export default persistore