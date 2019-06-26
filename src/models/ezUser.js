import { User } from 'radiks'

class EzUser extends User {
  static schema = {
    ...User.schema,
    premium: {
      type: Boolean,
    }
  }
}

export default EzUser
