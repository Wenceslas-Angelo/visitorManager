import { Create } from "./Create";
import { DeleteOne } from "./Delete";
import { ReadAllInToday, ReadAllOutToday, ReadAllToday, ReadOne } from "./Read";
import { CheckOut, UpdateOne } from "./Update";

const VisitorCtrl = {
  Create,
  UpdateOne,
  CheckOut,
  DeleteOne,
  ReadAllToday,
  ReadAllInToday,
  ReadAllOutToday,
  ReadOne,
};

export default VisitorCtrl;
