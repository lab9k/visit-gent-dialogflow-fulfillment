/* eslint-disable no-unused-vars */
import { QueryType } from './queries';

class QueryBuilder {
  build(type) {
    const query = QueryType(type);
    const startDateStr = new Date().format('YYYY-MM-DD');
    const endDateStr = new Date().format('YYYY-MM-DD');

    return this.query
      .replace(/{% startDate %}/g, startDateStr)
      .replace(/{% endDate %}/g, endDateStr);
  }
}
