import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import KeyValueTable from "../keyValueTabParams"
import {useEffect, useState} from "react";

export default function ParamsTab({selectedRequest}) {

    const [paramsItem, setParamsItem] = useState([]);

    useEffect(() => {
        if(selectedRequest && selectedRequest.request && selectedRequest.request.url){
            setParamsItem(selectedRequest.request.url.query);
        } else {
            setParamsItem([])
        }
    } , [selectedRequest]);

  return (

    <div className="container-fluid m-3">
      <p>Query params</p>
      <KeyValueTable paramsItem={paramsItem} />
    </div>
  );
}
