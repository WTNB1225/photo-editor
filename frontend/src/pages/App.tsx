import { useEffect, useState, ChangeEvent} from 'react'
import './App.css'

function App() {
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [sizeOfText1, setSizeOfText1] = useState(20);
    const [sizeOfText2, setSizeOfText2] = useState(35);
    const [color1, setColor1] = useState("red");
    const [color2, setColor2] = useState("red");
    const [text1Position, setText1Position] = useState([0, 0]);
    const [text2Position, setText2Position] = useState([0, 20]);
    const [imageUrl, setImageUrl] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [ctx, setCtx] = useState<null | CanvasRenderingContext2D>(null);
    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        setCtx(canvas.getContext("2d"));
    }, []);

    useEffect(() => {
        if(ctx !== null) {
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
                setCanvasWidth(image.width);
                setCanvasHeight(image.height);
                ctx.drawImage(image, 0, 0);
                ctx.font = `${sizeOfText1}px serif`;
                ctx.fillStyle = "white"
                ctx.filter = `drop-shadow(2px 2px 2px ${color1})`;
                ctx.fillText(text1, text1Position[0], text1Position[1]);
                ctx.font = `${sizeOfText2}px serif`;
                ctx.filter = `drop-shadow(2px 2px 2px ${color2})`;
                ctx.fillText(text2, text2Position[0], text2Position[1]);
                setLoaded(true);
            }
        }
    }, [ctx, imageUrl, canvasWidth, canvasHeight, text1, sizeOfText1, text2, sizeOfText2, color1, color2, text1Position, text2Position]);

    const handleFileChange = () => (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const file = e.target.files[0]
            const imageUrl = URL.createObjectURL(file)
            setImageUrl(imageUrl)
        }
    }

    const saveImage = () => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "canvas_image.png";
        link.click();
    };

    return (
        <div className="container">
            <div className="editor">
                <div><input type="text" value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Text 1"/>
                    文章1
                </div>
                <div><input type="number" value={sizeOfText1} onChange={(e) => setSizeOfText1(Number(e.target.value))}
                            placeholder="Size of Text 1"/>
                    文章1の文字の大きさ
                </div>
                <div><input type="text" value={color1} onChange={(e) => setColor1(e.target.value)}
                            placeholder="Color of Text 1"/>
                    文章1の背景色
                </div>
                <div>
                    <input type="number" value={text1Position[0]}
                           onChange={(e) => setText1Position([Number(e.target.value), text1Position[1]])}
                           placeholder="Text 1 X"/>文章1のX座標
                    <input type="number" value={text1Position[1]}
                           onChange={(e) => setText1Position([text1Position[0], Number(e.target.value)])}
                           placeholder="Text 1 Y"/>文章1のY座標
                </div>
                <div><input type="text" value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Text 2"/>
                    文章2
                </div>
                <div><input type="number" value={sizeOfText2} onChange={(e) => setSizeOfText2(Number(e.target.value))}
                            placeholder="Size of Text 2"/>
                    文章2の文字の大きさ
                </div>
                <div><input type="text" value={color2} onChange={(e) => setColor2(e.target.value)}
                            placeholder="Color of Text 2"/>
                    文章2の背景色
                </div>
                <div>
                    <input type="number" value={text2Position[0]}
                           onChange={(e) => setText2Position([Number(e.target.value), text2Position[1]])}
                           placeholder="Text 2 X"/>
                    文章2のX座標
                    <input type="number" value={text2Position[1]}
                           onChange={(e) => setText2Position([text2Position[0], Number(e.target.value)])}
                           placeholder="Text 2 Y"/>
                    文章2のY座標
                </div>
            </div>
            <div className="canvas-container">
                <canvas id="canvas" width={canvasWidth} height={canvasHeight}></canvas>
                { loaded && <button onClick={saveImage}>Save Image</button>}
                <label className="fileUploader">
                    画像をアップロード
                    <input type="file" style={{display: "none"}} onChange={handleFileChange()}/>
                </label>
            </div>
        </div>

    )
}

export default App;