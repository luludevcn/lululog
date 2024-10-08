import { useState } from "react";
import ReactJson from "react-json-view";

export const JsonFormatter = () => {
    const [jsonData, setJsonData] = useState(null);
    const [theme, setTheme] = useState('bright' as any);
    const themeKeys = [
        , 'bright'
        , 'harmonic'
        , 'shapeshifter:inverted'
        , 'summerfruit'
        , 'twilight']
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result);
                setJsonData(json);
            } catch (error) {
                alert(error);
            }
        }

        reader.readAsText(file);
    }

    return (
        <div>
            <input type="file" accept=".json" onChange={handleFileUpload}></input>
            <div className="flex justify-between overflow-x-clip gap-2 uppercase mt-2">
                <span>Theme:</span>{themeKeys.map((themKey) => {
                    return <><span key={themKey} className="hover:text-orange-400 cursor-pointer" onClick={()=>{setTheme(themKey)}}>{themKey}</span></>
                })}
            </div>
            <hr />
            {jsonData && (
                <ReactJson src={jsonData} iconStyle={"circle"} theme={theme} collapsed={false} enableClipboard={true} displayDataTypes={false} />
            )}
        </div>
    )
}