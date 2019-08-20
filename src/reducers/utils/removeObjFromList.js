import _ from 'lodash'

const removeObjFromList = (list, obj) => {
  const result = _.reduce(list, (acc, curr) => {
    if (curr._id === obj._id) {
      return acc
    }

    return [...acc, curr]
  }, [])

  return result
}

export default removeObjFromList
