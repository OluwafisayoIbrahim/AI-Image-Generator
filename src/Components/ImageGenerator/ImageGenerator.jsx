import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_img from '../Assets/default_image.svg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);
        const response = await fetch (
            "https://api.tryleap.ai/api/v1/images/models/1285ded4-b11b-4993-a491-d87cdfe6310c/inferences",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: "Bearer 065fb5eb-f184-46ac-85f8-8d4d9ac6b197",
                    "User-Agent": "Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size: "512x512",
                }),
            }
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }    

    
    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={image_url === "/" ? default_img : image_url} alt="" /></div>
            </div>
            <div className="loading">
                <div className={loading? "loading-bar-full":"loading-bar"}>
                    <div className={loading? "loading-text":"display-none"}>Loading...</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className="search-input" placeholder='Describe What You Want To See...' />
                <div className="generate-btn" onClick={() => { imageGenerator() }}>Generate</div>
            </div>
        </div>
    );
}

export default ImageGenerator;
