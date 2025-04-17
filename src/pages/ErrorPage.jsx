import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {

    let navigate = useNavigate();

    return (
        <>
            <div className="main"> 
                <h2>ERROR! PAGE NOT FOUND</h2>
                <button onClick={ () => {navigate("/")}}>
                    Return to Home Page
                </button>
            </div>
        </>
    )
};

export default ErrorPage;
