// Basic collaborative whiteboard + chat sample UI (React)

import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Make sure you run a backend server

export default function CresomaWhiteboard() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#333';

    const handleDraw = (data) => {
      const { x, y, px, py } = data;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    socket.on('draw', handleDraw);
    socket.on('chat', msg => setChat(prev => [...prev, msg]));

//     return () => {
//       socket.off('draw', handleDraw);
//     };
//   }, []);

//   const startDraw = (e) => {
//     setDrawing(true);
//     const rect = canvasRef.current.getBoundingClientRect();
//     canvasRef.current.lastX = e.clientX - rect.left;
//     canvasRef.current.lastY = e.clientY - rect.top;
//   };

//   const draw = (e) => {
//     if (!drawing) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const px = canvasRef.current.lastX;
//     const py = canvasRef.current.lastY;
//     socket.emit('draw', { x, y, px, py });
//     canvasRef.current.lastX = x;
//     canvasRef.current.lastY = y;
//   };

//   const endDraw = () => setDrawing(false);

//   const sendMessage = () => {
//     if (message.trim() !== '') {
//       socket.emit('chat', message);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       <canvas
//         ref={canvasRef}
//         width={800}
//         height={600}
//         className="border m-4"
//         onMouseDown={startDraw}
//         onMouseMove={draw}
//         onMouseUp={endDraw}
//         onMouseLeave={endDraw}
//       ></canvas>

//       <div className="w-full md:w-1/3 p-4 bg-gray-100 flex flex-col">
//         <h2 className="text-xl font-bold mb-2">💬 Cresoma Chat</h2>
//         <div className="flex-1 overflow-y-auto border p-2 mb-2">
//           {chat.map((msg, i) => (
//             <div key={i} className="mb-1 text-sm">{msg}</div>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <input
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//             className="flex-1 p-1 border"
//             placeholder="Type a message..."
//           />
//           <button onClick={sendMessage} className="bg-blue-500 text-white px-2">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }
