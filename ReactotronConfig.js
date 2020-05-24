import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'


const reactotron = Reactotron
.configure({ name: 'AzenMobile' }) // controls connection & communication settings
.useReactNative() // add all built-in react native plugins
.use(reactotronRedux()) //  <- here i am!
.connect() // let's connect!

export default reactotron;