import { useEffect, useRef } from 'react';
import { useMutation } from "@apollo/client";
import { ADDART } from "../utils/mutations";

const UploadWidget = () => {
    const [addArt] = useMutation(ADDART);

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect (() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current);
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:'dn3ua86cz',
            uploadPreset: 'ivowciaw'
        }, async function(error, result) {
            console.log(result);
            if(result.event==="success"){          
                const  data  = await addArt({
                    variables: { secureUrl: result.info.secure_url },
                }); 
                console.log("aa response",data)
            }
           
        });
        
    }, [addArt])
    return (
        <button onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    );
}
export default UploadWidget;