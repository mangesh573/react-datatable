import React from "react";


function Loading() {
    return (
        <>
            <div id="spinner" className="d-flex justify-content-center align-items-center position-absolute  " style={{ width: "100%",height:"100%",top:"0",left:"0",background:"#000000",opacity:"0.6" }}>
                <div className="spinner-border text-light"  role="status">
                </div>
                <span className=" text-light ms-3 ">Loading...</span>
            </div>
        </>
    )
}
export default Loading;