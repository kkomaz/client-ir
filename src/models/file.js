import { Model } from 'radiks'

export default class File extends Model {
  static className = 'File'

  static schema = {
    name: {
      type: String,
    },
    blob: {
      type: String,
    },
    max_height: {
      type: Number,
    },
    max_width: {
      type: Number,
    }
  }
}
