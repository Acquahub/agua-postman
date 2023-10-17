import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import KeyValueTable from "../keyValueTable"

export default function ParamsTab() {

  return (

    <div className="container-fluid m-3">
      <p>Query params</p>
      <KeyValueTable></KeyValueTable>
    </div>
  );
}
