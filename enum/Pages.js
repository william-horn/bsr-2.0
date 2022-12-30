
import { EnumCollection, EnumItem } from './Enum';
import Layouts from './Layouts';

const pageMethods = {
  excludes(name) {
    return this.render[name] === false;
  },

  includes(name) {
    return !(this.excludes(name));
  }
}

const collectionMethods = {
  getPageFromUrl(url) {
    for (let key in this.enumItems) {
      const page = this.enumItems[key];
      if (page.url === url) {
        return page;
      }
    }
  
    console.log(`INTERNAL ERROR: No such page exists for url: '${url}'`);
    return this.enumItems._404;
  }
}

const Pages = new EnumCollection({
  Home: new EnumItem({
    value: 'Home',
    title: "Home",
    renderedName: "Home",
    id: "home",
    url: "/",

    render: {
      
    },

    layout: Layouts.ExampleLayout,
  }),
  
  Example: new EnumItem({
    value: 'Example',
    title: "Example",
    renderedName: "Example",
    id: "example",
    url: "/example",

    render: {

    },

    layout: Layouts.ExampleLayout,
  }),

  _404: new EnumItem({
    value: '_404',
    title: "Not Found",
    id: "not_found",
    url: "/_error"
  })
}, {
  itemMethods: pageMethods,
  collectionMethods
});

export default Pages;

