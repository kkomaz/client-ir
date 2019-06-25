import _ from 'lodash'

const removeObjFromList = (list, obj) => (
  _.reduce(list, (acc, curr) => {
    if (curr._id === obj._id) {
      return acc
    }

    return [...acc, curr]
  }, [])
)

export default removeObjFromList
