
import { EnumCollection, EnumItem } from './Enum';

const Layouts = new EnumCollection({
  ExampleLayout: new EnumItem({ value: 'ExampleLayout' }),
  PrimaryLayout: new EnumItem({ value: 'PrimaryLayout' })
});

export default Layouts;

