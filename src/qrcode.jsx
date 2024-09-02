import { useState } from "react";


function Qrcode(){
    {/* used to manage image*/}
    const [img,setImg]=useState("");
    {/*used for managing loading */}
    const [loading,setLoading]=useState(false);
    {/* used for managing qr-data */}
    const [qrData,setQrData]=useState("https://lingeshwaransenthilkumar.github.io/Portfolio/")
    const [qrSize,setQrSize]=useState("150");
    async function generateQr(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }
    function downloadQr(){
        {/*using promise chaining*/}
        fetch(img)
        .then((Response)=>Response.blob())
        .then((blob)=>{
            {/* creates a link and attaching the data to it 
                and appending in body to indicate downloaded and onclicking it ,
                it will be removed from body */}
            const link = document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{
            console.error("Error in generating qr code",error);
        });
    }



    return(
        <div className="app-container">
            <div>
                <h3>Qr code generator</h3>
                {loading && <p className="loading">Please wait....</p>}
                <div className="img-box">
                {/* we are providing conditional rendering to image tag if image absent use this else use that */}
                {img && <img src={img} alt="qr-code-img"/>}
                </div>
                
                <label htmlFor="dataInput" className="input-label">
                    Data for QR code
                </label>
                <input type="text" placeholder="Enter the data for Qr code" value={qrData} onChange={(e)=>
                     setQrData(e.target.value)}/>
                <label htmlFor="sizeInput">
                    Image Size(e.g.150):
                </label>
                <input type="text" placeholder="Enter image size" value={qrSize} onChange=
                {(e)=>setQrSize(e.target.value)}/>
                <button className="generate-btn" disabled={loading} onClick={generateQr}>Generate Qrcode</button>
                <button className="download-btn" onClick={downloadQr}>Download Qrcode</button>
            </div>
        </div>
    )
}

export default Qrcode;