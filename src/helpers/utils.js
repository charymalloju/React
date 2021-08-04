import data from '../feed/sample';
import {sortBy} from "lodash"

console.log('data', data)

export const getData = (type) => {
    return sortBy(data.entries.filter(d=> d.programType === type && d.releaseYear >= 2010), 'title')
}