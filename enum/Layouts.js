

import { EnumCollection, EnumItem } from './Enum';

import ExampleLayout from '../components/layouts/ExampleLayout';
import PrimaryLayout from '../components/layouts/PrimaryLayout';

const Layouts = new EnumCollection({
  ExampleLayout: new EnumCollection({
    Name: new EnumItem({ value: 'ExampleLayout' }),
    Root: new EnumItem({ value: ExampleLayout }),

    Components: new EnumCollection({
      Header: new EnumItem({ name: 'Header', value: ExampleLayout.Header }),
      Footer: new EnumItem({ name: 'Footer', value: ExampleLayout.Footer })
    })
  }),

  PrimaryLayout: new EnumCollection({
    Name: new EnumItem({ value: 'PrimaryLayout' }),
    Root: new EnumItem({ value: PrimaryLayout }),

    Components: new EnumCollection({
      Header: new EnumItem({ name: 'Header', value: PrimaryLayout.Header }),
      Footer: new EnumItem({ name: 'Footer', value: PrimaryLayout.Footer })
    })
  })
})

export default Layouts;
