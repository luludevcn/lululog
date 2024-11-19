import hljs from "highlight.js";
import { useEffect, useRef, useState } from "react";
import 'highlight.js/styles/monokai.min.css'

export const JsonFormatter = () => {
    const [jsonData, setJsonData] = useState('');
    const [formattedJson, setFormattedJson] = useState(null);
    const [error, setError] = useState('');

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result);
                setFormattedJson(json);
                setError('')
            } catch (error) {
                setError("invalid json")
            }
        }
        reader.readAsText(file);
    };

    const handleJsonInput = (e: any) => {
        setJsonData(e.target.value);
        try {
            const json = JSON.parse(e.target.value);
            setFormattedJson(json);
            setError('')
        } catch (error) {
            setError("invalid json")
        }
    }

    const JsonNode = ({ keyName = '', value, level = 0 }) => {
        const [isExpanded, setIsExpanded] = useState(true);
        const jsonNodeRef = useRef(null);

        const toggleExpand = () => {
            setIsExpanded(!isExpanded);
        };

        useEffect(() => {
            if (jsonNodeRef.current) {
                hljs.highlightElement(jsonNodeRef.current);
            }
        }, [isExpanded])

        if (typeof value === 'object' && value !== null) {
            const entries = Array.isArray(value) ? value : Object.entries(value);

            return (
                <div style={{ position: "relative" }}>
                    <button onClick={toggleExpand} style={{ display: "inline-block", textAlign:"center",width:"20px",height:"20px",lineHeight:"10px",position: "absolute", top: "10px", left: "-15px" }}>
                        {isExpanded ? '-' : '+'}
                    </button>

                    <pre style={{margin:'5px', marginLeft: `${level * 10}px`, display: "inline-block" }}>
                        <code ref={jsonNodeRef} className="json" style={{padding:'0.25em'}}>
                            {keyName && `"${keyName}": `}
                        </code>
                    </pre>

                    {isExpanded && (
                        <div style={{ paddingLeft: '20px' }}>
                            {entries.map((entry, index) =>
                                Array.isArray(value) ? (
                                    <JsonNode key={index} value={entry} keyName={entry[0]} level={level + 1} />
                                ) : (
                                    <JsonNode value={entry[1]} level={level + 1} keyName={entry[0]} key={entry[0]} />
                                )
                            )}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <pre style={{ margin:'5px',marginLeft: `${level * 10}px` }}>
                <code ref={jsonNodeRef} className="json"  style={{padding:'0.25em'}}>
                    {keyName && `"${keyName}": `}
                    {typeof value === 'string' ? `"${value}"` : String(value)}
                </code>
            </pre>
        );
    };



    return (
        <div style={{ padding: '20px' }}>
            <h1>JSON Formatter</h1>

            <div>
                请选择你要格式化的json文件： <input type="file" onChange={handleFileUpload} />
                <p>或者将json文本粘贴到下方的文本框中</p>
                <textarea
                    placeholder="Paste JSON here..."
                    value={jsonData}
                    onChange={handleJsonInput}
                    style={{ width: '100%', height: '150px'}}
                ></textarea>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {formattedJson && (
                <><p>格式化json输出如下：</p>
                <div
                    style={{
                        backgroundColor: '#272822',
                        padding: '25px',
                        borderRadius: '5px',
                        marginTop: '20px',
                        overflowX: 'auto',
                    }}
                >
                    <JsonNode value={formattedJson} />
                </div>
                </>
            )}
        </div>
    );
};