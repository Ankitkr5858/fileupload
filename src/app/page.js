"use client";
import * as React from "react";
import { FileUploader } from "baseui/file-uploader";
import { StatefulTooltip } from "baseui/tooltip";

export default () => {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("No file uploaded");
  const [fileLength, setFileLength] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState();
  const [failedFileName, setFailFileName] = React.useState([]);
  const [success, setSuccess] = React.useState();

  const handleFiles = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length === 0 && rejectedFiles.length === 0) return;
    setLoading(true);

    const totalFiles = acceptedFiles.length + rejectedFiles.length;

    let fileStatuses = Array(totalFiles).fill("Running");

    setFileLength(totalFiles);
    setStatus(`${0} / ${totalFiles} files uploaded`);

    acceptedFiles.forEach((file, index) => {
      setTimeout(() => {
        fileStatuses[index] = "Uploaded";
        setStatus(
          `Done ${
            fileStatuses.filter((status) => status === "Uploaded").length
          } / ${totalFiles} success`
        );

        if (fileStatuses.every((status) => status !== "Running")) {
          setLoading(false);
          if (rejectedFiles.length > 0) {
            setErrorMessage("Some files failed to upload.");
            setStatus("No file uploaded");

            const failedFile = rejectedFiles.map((value) => value.name);
            setFailFileName(failedFile);
          } else {
            setStatus(
              `Done ${
                fileStatuses.filter((status) => status === "Uploaded").length
              } / ${totalFiles} success`
            );
            setSuccess(true);
          }
        } else {
          setStatus(
            `Running ${
              fileStatuses.filter((status) => status === "Uploaded").length
            } / ${totalFiles} complete`
          );
        }
      }, 1000 * (index + 1));
    });

    rejectedFiles.forEach((file, index) => {
      const failedIndex = acceptedFiles.length + index;
      fileStatuses[failedIndex] = "Failed";
    });
  };

  const handleRetry = () => {
    setStatus("No file uploaded");
    setErrorMessage("");
    setFailFileName("");
    setSuccess(false)
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "4rem auto",
        padding: "0 20px 20px 20px",
        backgroundColor: "white",
        border: "1px solid #f3e8e8",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex", alignContent: "center" }}>
        <img src="/upload.svg" style={{ width: "30px" }} />
        <h2 style={{ lineHeight: "0.9", marginLeft: "0.5rem" }}>
          razorpay_payin
        </h2>
      </div>
      <div
        style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
      >
        <span>{status}</span>

        {failedFileName.length > 0 && (
          <StatefulTooltip
            content={() => (
              <div padding={"20px"}>
                {failedFileName && (
                  <div>
                    <div style={{ marginBottom: "6px" }}>Failed for</div>
                    {failedFileName.map((value, index) => {
                      return (
                        <div
                          style={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            margin: "0.2rem 0",
                          }}
                          key={index}
                        >
                          <img
                            src="/failfile.svg"
                            style={{ marginRight: "0.4rem" }}
                          />
                          <span style={{ textWrap: "wrap" }}>{value}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            returnFocus
            autoFocus
          >
            <img
              src="/info.svg"
              style={{ marginLeft: "10px", width: "20px" }}
            />
          </StatefulTooltip>
        )}
      </div>
      <div style={{ position: "relative" }}>
        {success && (
          <div
            style={{
              position: "absolute",
              top: "1%",
              left: "1%",
              zIndex: "10000",
              backgroundColor: "white",
              width: "98%",
              height: "98%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              flexDirection:'column'
            }}
          >
            <img
              src="/tick.svg"
              style={{ width: "30px", marginRight: "0.4rem" }}
            />
            Upload Success
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'row',width:'64%',flexWrap:'wrap',marginTop:'1.3rem'}}>
            <button style={{border:'none',padding:'0.7rem 1rem',borderRadius:'30px',fontWeight:"600",cursor:'pointer'}}>
              View Details
            </button>
            <button style={{border:'none',padding:'0.7rem 1rem',borderRadius:'30px',fontWeight:"600",cursor:'pointer'}} onClick={handleRetry}>
              New Upload
            </button>
            </div>
          </div>
        )}
        <FileUploader
          errorMessage={errorMessage}
          onCancel={stopLoading}
          accept=".pdf, .doc, .docx, .ppt, .pptx, .txt, .rtf, .csv"
          onRetry={handleRetry}
          onDrop={(acceptedFiles, rejectedFiles) => {
            handleFiles(acceptedFiles, rejectedFiles);
          }}
          progressMessage={loading ? `Uploading` : ""}
          overrides={{
            ContentMessage: { style: { fontSize: "16px" } },
            FileDragAndDrop: {
              style: {
                display: "flex",
                height: "200px",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
      </div>
    </div>
  );
};
