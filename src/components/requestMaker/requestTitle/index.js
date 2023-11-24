import React, {useEffect, useState} from "react";
import styles from "./requestTitle.module.css";

export default function RequestTitle({ userInput, selectedRequest, setSelectedRequest, idItem, getClonedItemToPerformAction}) {

    const [requestTitle, setRequestTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const startEditing = () => {
        setIsEditing(true);

    }

    const finishEditing = () => {
        setIsEditing(false);
        const clonedRequest = JSON.parse(JSON.stringify(selectedRequest));

        if (clonedRequest.request) {
            clonedRequest.name= requestTitle;
            setSelectedRequest(clonedRequest);
        }

        const parentId = idItem.substring(0, idItem.lastIndexOf('-'));
        const childId = idItem.substring(idItem.lastIndexOf('-') + 1);
        const parent = getClonedItemToPerformAction('update', parentId);
        parent.item[childId].name = requestTitle;
    }

    const handleInputChange = (e) => {
        setRequestTitle(e.target.value);
    };

    useEffect(() => {
        if (selectedRequest && selectedRequest.request) {

            setRequestTitle(`${selectedRequest.name}`);
        } else {

            setRequestTitle(userInput || selectedRequest?.item?.name || "Untitled Collection");
        }
    }, [selectedRequest, userInput]);

  return (
    <div className={styles['title']}>
      <label className={styles['label']}>

          <div className={styles['http-icon']}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="m12.654.046-.707.707L13.593 2.4H0v1h16.007L12.654.046ZM-.007 12.599l3.353 3.353.707-.707L2.407 13.6H16v-1H-.007ZM.011 11.2h.977V8.478h2.327V11.2h.98V4.927h-.98V7.64H.988V4.927H.01V11.2ZM4.784 5.768H5.9V11.2h.973V5.768h.92v-.84h-3.01v.84ZM9.283 5.768h-.916v-.84h3.01v.84h-1.12V11.2h-.974V5.768Z"
                      fill="#3FD6E6"></path>
                  <path
                      d="M11.87 11.2h.976V8.924h.927c1.501 0 2.244-.807 2.244-2.001 0-1.192-.736-1.996-2.24-1.996h-1.908V11.2Zm.976-3.104V5.765h.826c.967 0 1.362.424 1.362 1.158 0 .733-.395 1.173-1.35 1.173h-.838Z"
                      fill="#3FD6E6">

                  </path>
              </svg>
          </div>

        <div className={styles['titulo']}>
            {isEditing ? (
                <input
                    type="text"
                    value={requestTitle}
                    onChange={handleInputChange}
                    onBlur={finishEditing}
                    autoFocus
                />
            ) : (
                <div onDoubleClick={startEditing}>{requestTitle}</div>
            )}
        </div>
      </label>
    </div>
  );
}