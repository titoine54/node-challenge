export function getParams(query) {
  let page: {} = {};
  let filter: {} = {};
  let sort: {} = {};

  if (query == undefined) {
    return {}
  } else {
    page = {
      skip: Number(query.page * query.limit) || 0,
      take: Number(query.limit) || 100,
    };

    if (query.filter !== undefined) {
      filter = {
        where: JSON.parse(query.filter) || {}
      };
    }

    if (query.sort !== undefined) {
      sort = {
        order: JSON.parse(query.sort) || {}
      };
    }

    return {...page,...filter,...sort};
  }
}
