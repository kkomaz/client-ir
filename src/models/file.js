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
    blow_lq: {
      type: String,
    },
    max_height: {
      type: Number,
    },
    max_width: {
      type: Number,
    },
    new_height: {
      type: Number,
    },
    new_width: {
      type: Number,
    }
  }
}
