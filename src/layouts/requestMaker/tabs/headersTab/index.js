import KeyValueTable from "../keyValueTable"
import {useEffect, useState} from "react";

export default function HeadersTab({ selectedRequest }) {

    const [headerItem, setHeaderItem] = useState([]);

    useEffect(() => {
        if(selectedRequest && selectedRequest.request && selectedRequest.request.header){
            setHeaderItem(selectedRequest.request.header);
        } else {
            setHeaderItem([])
        }

    }, [selectedRequest]);

  return (
    <div className="container-fluid m-3">
      <p>Headers</p>
      <KeyValueTable headerItem={headerItem} />
    </div>
  );
}
