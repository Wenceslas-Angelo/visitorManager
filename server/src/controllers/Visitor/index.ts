import { Create } from "./Create";
import { DeleteAll, DeleteOne } from "./Delete";
import { ReadAllInToday, ReadAllOutToday, ReadAllToday, ReadOne } from "./Read";
import { CheckOut, UpdateOne } from "./Update";

const VisitorCtrl = {
  Create,
  UpdateOne,
  CheckOut,
  DeleteOne,
  ReadAllToday,
  ReadOne,
  DeleteAll,
  ReadAllInToday,
  ReadAllOutToday,
};

export default VisitorCtrl;
