
import pageData from '../config/page-data.json';

const getPageFrom = (type, query) => {
  for (let i = 0; i < pageData.length; i++) {
    const page = pageData[i];
    if (page[type] === query) {
      return page;
    }
  }

  console.log(`ERROR: No such page setting of '${type}' matches '${query}'`);
  return pageData.find(page => page.id === "not_found");
}

const pageDataAPI = {
  getPageFrom,
  pages: pageData
};

export default pageDataAPI;
