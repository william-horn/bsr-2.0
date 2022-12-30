

import { EnumCollection, EnumItem } from './Enum';

import ExampleLayout from '../components/layouts/ExampleLayout';

const Layouts = new EnumCollection({
  ExampleLayout: new EnumCollection({
    Name: new EnumItem({ value: 'ExampleLayout' }),
    Root: new EnumItem({ value: ExampleLayout }),

    Components: new EnumCollection({
      Header: new EnumItem({ name: 'Header', value: ExampleLayout.Header }),
      Footer: new EnumItem({ name: 'Footer', value: ExampleLayout.Footer })
    })
  }),

})

export default Layouts;
