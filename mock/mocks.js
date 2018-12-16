import login from './login'
import article from './article'
import search from './remoteSearch'
import transaction from './transaction'
import community from './community'

export default {
  ...login,
  ...article,
  ...search,
  ...transaction,
  ...community
}

