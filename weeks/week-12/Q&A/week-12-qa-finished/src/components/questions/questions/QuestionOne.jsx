import React, { useState, useRef } from "react";
import QRCode from "qrcode";
export const QuestionOne = ({ title, number }) => {
  const content = {
    context:
      "In essence yes. In React, refs provide a way to access DOM nodes or React elements created in the render method. Unlike traditional DOM manipulation with vanilla JavaScript, refs allow us to work with the DOM nodes directly without disrupting React's state and lifecycle.",
    bulletpoints: [
      {
        id: 1,
        title: "What is a Ref in React?",
        point:
          "A ref is like a 'reference' to an element or component instance within the DOM or the render method, allowing us to interact with that element directly.",
      },
      {
        id: 2,
        title: "How to Create a Ref?",
        point:
          "Import the destructured hook/method into your file and the use the .current property object to have access to DOM nodes",
      },
      {
        id: 3,
        title: "Using Refs for Direct DOM Manipulation",
        point:
          "After a component mounts, the ref will be populated with the corresponding DOM node, which you can use as you would with vanilla JS, but with React's lifecycle in mind.",
      },
      {
        id: 4,
        title: "Replacing Vanilla JS with Refs",
        point:
          "Instead of using document selectors, you can use refs to directly interact with an element, for instance, to focus on an input field or manage media playback.",
      },
    ],
  };

  const [qr, setQr] = useState("");
  const qrRef = useRef(null); // Creating a ref

  const generateQRCode = async () => {
    // Assume QRCode.toDataURL is an async function
    try {
      const url = await QRCode.toDataURL("Your URL here");
      setQr(url);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQRCode = () => {
    const fileName = prompt("Please enter a name for the download:", "QRCode");
    if (qr && fileName) {
      const link = qrRef.current; // Accessing the ref
      link.href = qr;
      link.download = `${fileName}.png`;
      link.click(); // Triggering the download
    }
  };

  // EXAMPLE OF POST REQUEST
  return (
    <div className="question-outer-container">
      <details>
        <summary>
          {number} - {title}
        </summary>
        <>
          <p>{content.context}</p>
          <>
            {content.bulletpoints.map((bulletPoint, index, array) => {
              console.log(array); // This will log the entire array for each iteration
              return (
                <ul key={bulletPoint.id}>
                  <h4>{bulletPoint.title}</h4>
                  <li>{bulletPoint.point}</li>
                </ul>
              );
            })}
            <div>
              <button onClick={generateQRCode}>Generate QR</button>
              {/* Attaching the ref to an anchor element that will be used to download the QR code */}
              <a ref={qrRef} style={{ display: "none" }}>
                Download
              </a>
              {qr && <button onClick={downloadQRCode}>Download QR</button>}
            </div>
          </>
        </>
      </details>
    </div>
  );
};
