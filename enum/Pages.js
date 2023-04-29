
import { EnumCollection, EnumItem } from './Enum';
import pageDataAPI from '../lib/pageDataAPI';

const pageEnumItems = {};

for (let index = 0; index < pageDataAPI.pages.length; index++) {
  const page = pageDataAPI.pages[index];
  pageEnumItems[page.enumName] = new EnumItem({ value: page.title });
}

const Pages = new EnumCollection(pageEnumItems);

export default Pages;

