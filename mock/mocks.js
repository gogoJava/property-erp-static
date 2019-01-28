import login from './login'
import article from './article'
import search from './remoteSearch'
import transaction from './transaction'
import community from './community'
import administrator from './administrator'
import building from './building'
import unit from './unit'
import proprietor from './proprietor'
import asset from './asset'

export default {
  ...login,
  ...article,
  ...search,
  ...transaction,
  ...community,
  ...administrator,
  ...building,
  ...unit,
  ...proprietor,
  ...asset
}

