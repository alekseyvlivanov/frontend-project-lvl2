import _ from 'lodash';

const buildDiffByKey = (value1, value2) => {
  if (_.isEqual(value1, value2) || value1 === value2) {
    return { status: 'unmodified', value: value2 };
  }

  if (value1 === undefined) {
    return { status: 'added', value: value2 };
  }

  if (value2 === undefined) {
    return { status: 'removed', value: value1 };
  }

  return { status: 'modified', value: { value1, value2 } };
};

const buildDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  return keys.map((key) => {
    const value1 = _.get(obj1, key);
    const value2 = _.get(obj2, key);

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'children', value: buildDiff(value1, value2) };
    }

    return { key, ...buildDiffByKey(value1, value2) };
  });
};

export default buildDiff;